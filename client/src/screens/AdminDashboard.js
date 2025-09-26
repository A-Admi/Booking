import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div style={{ padding: "1rem" }}>
      <h1>Admin Dashboard</h1>
      <ul>
        <li>
          <Link to="/admin/create-hotel">Create Hotel</Link>
        </li>
        <li>
          <Link to="/admin/manage-hotels">Manage Hotels (coming soon)</Link>
        </li>
        <li>
          <Link to="/admin/manage-rooms">Manage Rooms (coming soon)</Link>
        </li>
        <li>
          <Link to="/admin/manage-bookings">Manage Bookings (coming soon)</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
