import express from "express";
const router = express.Router();
import {
  createOrder,
  getRestaurantOrders,
  updateOrderStatus,
  getUserOrders,
} from "../controllers/orderController.js";

// Create new order
router.post("/orderData", createOrder);

// Get orders for a restaurant
router.get("/restaurant-orders/:restaurantId", getRestaurantOrders);

// Update order status
router.put("/update-status/:orderId", updateOrderStatus);

// Get user's orders
router.get("/user-orders/:email", getUserOrders);

export default router;
