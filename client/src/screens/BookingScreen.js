import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const BookingScreen = () => {
  const { id } = useParams(); // room id
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [room, setRoom] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [available, setAvailable] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(`/api/rooms/room/${id}`);
        const data = await res.json();
        setRoom(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRoom();
  }, [id]);

  // redirect if not logged in
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const calcNights = (inD, outD) => {
    if (!inD || !outD) return 0;
    const a = new Date(inD);
    const b = new Date(outD);
    const diff = (b - a) / (1000 * 60 * 60 * 24);
    return Math.max(0, Math.round(diff));
  };

  const checkAvailability = async () => {
    if (!checkIn || !checkOut) {
      setMessage("Select check-in and check-out dates");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/bookings/check-availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId: id, checkInDate: checkIn, checkOutDate: checkOut }),
      });
      const data = await res.json();
      setAvailable(data.available);
      setLoading(false);
    } catch (err) {
      setMessage("Error checking availability");
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!user) return navigate("/login");
    if (!checkIn || !checkOut) return setMessage("Choose dates first");
    const nights = calcNights(checkIn, checkOut);
    if (nights <= 0) return setMessage("Check-out must be after check-in");

    // compute price (adjust field name if back-end uses different name)
    const pricePerNight = room?.pricePerNight ?? room?.price ?? 0;
    const totalPrice = pricePerNight * nights;

    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          hotel: room.hotel?._id ?? room.hotel, // hotel id
          room: id,
          checkInDate: checkIn,
          checkOutDate: checkOut,
          totalPrice,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Booking confirmed ✅");
        // redirect to My Bookings or booking details page
        navigate("/bookings");
      } else {
        setMessage(data.message || "Booking failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Booking error");
    } finally {
      setLoading(false);
    }
  };

  if (!room) return <p>Loading room...</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Book: {room.title ?? room.name}</h1>
      <p>Hotel: {room.hotel?.name ?? "—"}</p>
      <p>Price per night: ${room.pricePerNight ?? room.price}</p>

      <div style={{ marginTop: "1rem" }}>
        <label>Check In</label><br />
        <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} /><br />
        <label>Check Out</label><br />
        <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} /><br />

        <button onClick={checkAvailability} disabled={loading} style={{ marginTop: 8 }}>
          Check availability
        </button>

        {available === true && <p style={{ color: "green" }}>Room is available ✅</p>}
        {available === false && <p style={{ color: "red" }}>Room is NOT available ❌</p>}

        <div style={{ marginTop: 12 }}>
          <p>Nights: {calcNights(checkIn, checkOut)}</p>
          <p>Total estimate: ${(calcNights(checkIn, checkOut) * (room.pricePerNight ?? room.price)).toFixed(2)}</p>
          <button onClick={handleBooking} disabled={loading || available === false}>Confirm Booking</button>
        </div>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default BookingScreen;
