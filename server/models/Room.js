// models/Room.js
import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
  title: { type: String, required: true }, // e.g., Deluxe Suite
  description: { type: String },
  pricePerNight: { type: Number, required: true },
  maxGuests: { type: Number, required: true },
  availability: { type: Boolean, default: true },
  images: [{ type: String }],
}, { timestamps: true });

export default mongoose.model("Room", roomSchema);
