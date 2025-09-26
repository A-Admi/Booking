import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}><Link to="/" style={{color: 'inherit', textDecoration: 'none'}}>HotelBooking</Link></h2>
      <ul style={styles.menu}>
        <li><Link to="/" style={styles.link}>Home</Link></li>
        {user ? (
          <>
            <li style={styles.link}>Hi, {user.name}</li>
            <li><Link to="/bookings" style={styles.link}>My Bookings</Link></li>
            {user.isAdmin && <li><Link to="/admin" style={styles.link}>Admin</Link></li>}
            <li><button onClick={logout} style={styles.btn}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login" style={styles.link}>Login</Link></li>
            <li><Link to="/register" style={styles.link}>Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

const styles = {
  nav: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem", background: "#333", color: "#fff" },
  logo: { margin: 0 },
  menu: { listStyle: "none", display: "flex", gap: "1rem", margin: 0, padding: 0, alignItems: "center" },
  link: { color: "#fff", textDecoration: "none" },
  btn: { background: "transparent", border: "1px solid #fff", color: "#fff", cursor: "pointer" },
};

export default Navbar;
