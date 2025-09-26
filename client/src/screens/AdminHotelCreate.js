import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminHotelCreate = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/hotels", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` },
        body: JSON.stringify({ name, location, description })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Hotel created");
        setName(""); setLocation(""); setDescription("");
      } else {
        setMessage(data.message || "Error");
      }
    } catch (err) {
      setMessage("Error creating hotel");
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Create Hotel</h2>
      {message && <p>{message}</p>}
      <form onSubmit={submit}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required /><br />
        <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} required /><br />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} /><br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AdminHotelCreate;
