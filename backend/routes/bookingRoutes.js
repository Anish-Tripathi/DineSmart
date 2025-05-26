import express from "express";
const router = express.Router();
import {
  createBooking,
  getBookingsForRestaurant,
  getUserBookings,
  updateBookingStatus,
  getRestaurantById,
} from "../controllers/bookingController.js";
import auth from "../middleware/auth.js";

router.post("/", auth, createBooking);
router.get("/my-bookings", auth, getUserBookings);
router.put("/:id", auth, updateBookingStatus);
router.get("/:id", getRestaurantById);
router.get("/restaurant/:id", getBookingsForRestaurant);

export default router;
