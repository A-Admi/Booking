import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const HotelScreen = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      const { data } = await axios.get(`/api/hotels/${id}`);
      setHotel(data);
    };
    fetchHotel();
  }, [id]);

  if (!hotel) return <p>Loading...</p>;

  return (
    <div>
      <h1>{hotel.name}</h1>
      <p>{hotel.location}</p>
      <h3>Rooms</h3>
      {hotel.rooms.map(room => (
        <div key={room._id}>
          <h4>{room.title}</h4>
          <p>{room.description}</p>
          <p>${room.pricePerNight}/night</p>
          <Link to={`/booking/${room._id}`}>Book Now</Link>
        </div>
      ))}
    </div>
  );
};

export default HotelScreen;
