import Hotel from "../models/Hotel.js";

// Create hotel
export const createHotel = async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);
    res.status(201).json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all hotels
export const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().populate("rooms");
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single hotel
export const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id).populate("rooms");
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
