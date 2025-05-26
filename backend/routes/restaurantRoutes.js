import express from "express";
import {
  getAllRestaurants,
  getMyRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  addPromotion,
  updatePromotion,
  removePromotion,
  getFeaturedRestaurants,
  getRestaurantsByCuisine,
  getCuisines,
  getLocations,
  getRestaurantsNearLocation,
} from "../controllers/restaurantController.js";
import auth from "../middleware/auth.js";
import { verifyOwner } from "../middleware/verifyOwner.js";

const router = express.Router();

// Public routes
router.get("/featured", getFeaturedRestaurants);
router.get("/cuisines", getCuisines);
router.get("/locations", getLocations);
router.get("/cuisine/:cuisine", getRestaurantsByCuisine);
router.get("/", getAllRestaurants);
router.get("/nearby", getRestaurantsNearLocation);

// Protected routes (require authentication)
router.use(auth);

// IMPORTANT: Specific routes must come BEFORE parameterized routes
router.get("/my-restaurants", getMyRestaurants);
router.post("/", createRestaurant);

// Parameterized routes - these must come last among GET routes
router.get("/:id", getRestaurantById);

// Routes that require ownership verification
router
  .route("/:id")
  .all(verifyOwner)
  .put(updateRestaurant)
  .delete(deleteRestaurant);

// Promotion routes with ownership verification
router.post("/:id/promotions", verifyOwner, addPromotion);
router
  .route("/:id/promotions/:promotionId")
  .all(verifyOwner)
  .put(updatePromotion)
  .delete(removePromotion);

export default router;
