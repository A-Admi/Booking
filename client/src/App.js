import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminRoute from "./components/AdminRoute";
import HomeScreen from "./screens/HomeScreen";
import HotelScreen from "./screens/HotelScreen";
import BookingScreen from "./screens/BookingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MyBookingsScreen from "./screens/MyBookingsScreen";
import AdminDashboard from "./screens/AdminDashboard";
import AdminHotelCreate from "./screens/AdminHotelCreate";

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/hotel/:id" element={<HotelScreen />} />
          <Route path="/booking/:id" element={<BookingScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/bookings" element={<MyBookingsScreen />} />

          {/* ✅ Admin-only routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/create-hotel"
            element={
              <AdminRoute>
                <AdminHotelCreate />
              </AdminRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
