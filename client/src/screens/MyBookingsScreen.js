import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const MyBookingsScreen = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/bookings", {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchBookings();
  }, [user]);

  if (loading) return <p>Loading bookings...</p>;
  if (!bookings.length) return <p>No bookings yet.</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>My Bookings</h1>
      <ul>
        {bookings.map(b => (
          <li key={b._id}>
            <strong>{b.hotel?.name ?? b.hotel}</strong> — Room {b.room} — {new Date(b.checkInDate).toLocaleDateString()} → {new Date(b.checkOutDate).toLocaleDateString()} — ${b.totalPrice} — {b.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyBookingsScreen;
