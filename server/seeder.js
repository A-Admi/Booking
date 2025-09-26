import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import hotels from "./data/hotels.js";
import User from "./models/User.js";
import Hotel from "./models/Hotel.js";
import Room from "./models/Room.js";
import Booking from "./models/Booking.js"; // ✅
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Clear old data
    await Booking.deleteMany();
    await Room.deleteMany();
    await Hotel.deleteMany();
    await User.deleteMany();

    // Insert users
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const customerUser = createdUsers[1]._id;

    // Insert hotels
    const createdHotels = await Hotel.insertMany(hotels);

    // Insert some rooms for each hotel
    const rooms = [];
    for (const hotel of createdHotels) {
      const sampleRooms = [
        {
          hotel: hotel._id,
          title: "Deluxe Suite",
          description: "Spacious room with king bed",
          pricePerNight: 120,
          maxGuests: 2,
          availability: true,
        },
        {
          hotel: hotel._id,
          title: "Standard Room",
          description: "Cozy room with queen bed",
          pricePerNight: 80,
          maxGuests: 2,
          availability: true,
        }
      ];
      const createdRooms = await Room.insertMany(sampleRooms);

      // push room IDs into hotel
      hotel.rooms = createdRooms.map(r => r._id);
      await hotel.save();
      rooms.push(...createdRooms);
    }

    // ✅ Insert some sample bookings
    const sampleBookings = [
      {
        user: customerUser,
        hotel: createdHotels[0]._id,
        room: rooms[0]._id,
        checkInDate: new Date("2025-10-10"),
        checkOutDate: new Date("2025-10-15"),
        totalPrice: 600,
        status: "confirmed",
      },
      {
        user: customerUser,
        hotel: createdHotels[1]._id,
        room: rooms[2]._id,
        checkInDate: new Date("2025-11-01"),
        checkOutDate: new Date("2025-11-05"),
        totalPrice: 480,
        status: "confirmed",
      }
    ];

    await Booking.insertMany(sampleBookings);

    console.log("Data Imported ✅");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Booking.deleteMany();
    await Room.deleteMany();
    await Hotel.deleteMany();
    await User.deleteMany();
    console.log("Data Destroyed ❌");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
