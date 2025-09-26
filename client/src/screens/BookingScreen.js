import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookingScreen = () => {
  const { id } = useParams(); // room id
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [message, setMessage] = useState("");

  const handleBooking = async () => {
    try {
      const { data } = await axios.post("/api/bookings", {
        room: id,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        user: "mock-user-id" // replace later with auth
      });
      setMessage("Booking successful ✅");
    } catch (error) {
      setMessage("Error booking ❌");
    }
  };

  return (
    <div>
      <h1>Book Room</h1>
      <label>Check In</label>
      <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
      <label>Check Out</label>
      <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
      <button onClick={handleBooking}>Confirm Booking</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BookingScreen;
