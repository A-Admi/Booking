import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

// Create a new room and assign it to a hotel
export const createRoom = async (req, res) => {
  const { hotelId } = req.params;
  try {
    const room = await Room.create({ ...req.body, hotel: hotelId });

    // Add room to hotel.rooms array
    await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: room._id } });

    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all rooms for a hotel
export const getRoomsByHotel = async (req, res) => {
  const { hotelId } = req.params;
  try {
    const rooms = await Room.find({ hotel: hotelId });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single room
export const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate("hotel");
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update room
export const updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete room
export const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });

    // Remove room from hotel's rooms array
    await Hotel.findByIdAndUpdate(room.hotel, { $pull: { rooms: room._id } });

    res.json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
