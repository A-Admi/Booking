import Booking from "../models/Booking.js";

// Create booking
export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      ...req.body,
      user: req.user._id
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user bookings
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("hotel room");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
