// models/Hotel.js
import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  location: { type: String, required: true },
  rating: { type: Number, default: 0 },
  amenities: [{ type: String }], // e.g., WiFi, Pool, Parking
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
  images: [{ type: String }], // store URLs
}, { timestamps: true });

export default mongoose.model("Hotel", hotelSchema);
