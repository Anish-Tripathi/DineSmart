// middleware/verifyOwner.js
import Restaurant from "../models/Restaurant.js";

export const verifyOwner = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Check if the current user is the owner
    if (restaurant.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized - Not the owner" });
    }

    req.restaurant = restaurant;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
