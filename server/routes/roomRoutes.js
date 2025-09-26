import express from "express";
import { 
  createRoom, 
  getRoomsByHotel, 
  getRoomById, 
  updateRoom, 
  deleteRoom 
} from "../controllers/roomController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router({ mergeParams: true });

// Create room for a hotel
router.post("/:hotelId", protect, admin, createRoom);

// Get rooms for a hotel
router.get("/:hotelId", getRoomsByHotel);

// Single room operations
router.route("/room/:id")
  .get(getRoomById)
  .put(protect, admin, updateRoom)
  .delete(protect, admin, deleteRoom);

export default router;
