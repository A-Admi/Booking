import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      const { data } = await axios.get("/api/hotels");
      setHotels(data);
    };
    fetchHotels();
  }, []);

  return (
    <div>
      <h1>Hotels</h1>
      {hotels.map(hotel => (
        <div key={hotel._id}>
          <h2>{hotel.name}</h2>
          <p>{hotel.location}</p>
          <Link to={`/hotel/${hotel._id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default HomeScreen;
