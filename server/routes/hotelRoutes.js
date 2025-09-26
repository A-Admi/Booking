import express from "express";
import { createHotel, getHotels, getHotelById } from "../controllers/hotelController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(getHotels)
  .post(protect, admin, createHotel);

router.route("/:id")
  .get(getHotelById);

export default router;
