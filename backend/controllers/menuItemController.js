import MenuItem from "../models/MenuItem.js";
import mongoose from "mongoose";

// Get all menu items
export const getAllMenuItems = async (req, res) => {
  try {
    const { restaurant, category, isVeg, popular, search } = req.query;

    // Build filter object based on query parameters
    const filter = {};
    if (restaurant) filter.restaurant = restaurant;
    if (category) filter.category = category;
    if (isVeg === "true") filter.isVeg = true;
    if (popular === "true") filter.popular = true;

    // If search query is provided, search in name and description
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { ingredients: { $in: [new RegExp(search, "i")] } },
      ];
    }

    const menuItems = await MenuItem.find(filter).populate(
      "restaurant",
      "name"
    );
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single menu item by ID
export const getMenuItemById = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id).populate(
      "restaurant",
      "name"
    );

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new menu item
export const createMenuItem = async (req, res) => {
  try {
    const menuItem = new MenuItem(req.body);
    const savedMenuItem = await menuItem.save();
    res.status(201).json(savedMenuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update menu item by ID
export const updateMenuItem = async (req, res) => {
  try {
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedMenuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.status(200).json(updatedMenuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete menu item by ID
export const deleteMenuItem = async (req, res) => {
  try {
    const deletedMenuItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!deletedMenuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.status(200).json({ message: "Menu item deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMenuItemsByRestaurant = async (req, res) => {
  try {
    const { category } = req.query;
    const restaurantId = req.params.restaurantId;

    // Validate restaurantId
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return res.status(400).json({ message: "Invalid restaurant ID" });
    }

    // Build filter
    const filter = {
      restaurant: new mongoose.Types.ObjectId(restaurantId),
    };

    if (category) {
      filter.category = category;
    }

    const menuItems = await MenuItem.find(filter)
      .populate("restaurant", "name")
      .lean(); // Add lean() for better performance

    res.status(200).json(menuItems);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({
      message: "Failed to fetch menu items",
      error: error.message,
    });
  }
};

// Get popular menu items
export const getPopularMenuItems = async (req, res) => {
  try {
    const popularItems = await MenuItem.find({ popular: true })
      .populate("restaurant", "name")
      .limit(8);
    res.status(200).json(popularItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get available categories
export const getCategories = async (req, res) => {
  try {
    const categories = await MenuItem.distinct("category");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
