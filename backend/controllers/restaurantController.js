import Restaurant from "../models/Restaurant.js";
import MenuItem from "../models/MenuItem.js";

// Get all restaurants
export const getAllRestaurants = async (req, res) => {
  try {
    const { cuisine, location, featured, isVeg, search } = req.query;

    const filter = {};
    if (cuisine) filter.cuisine = cuisine;
    if (location) filter.location = location;
    if (featured === "true") filter.featured = true;
    if (isVeg === "true") filter.isVeg = true;

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { cuisine: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    const restaurants = await Restaurant.find(filter);
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get restaurants owned by the current user
export const getMyRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ owner: req.user._id });
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single restaurant by ID (public)
export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new restaurant (owner only)
export const createRestaurant = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(400).json({ message: "Owner information is required" });
    }

    // Check if this owner already has a restaurant
    const existing = await Restaurant.findOne({ owner: req.user._id });
    if (existing) {
      return res.status(400).json({
        message:
          "You have already posted a restaurant. You can only edit your existing restaurant.",
      });
    }

    const restaurantData = {
      ...req.body,
      owner: req.user._id,
      promotions: req.body.promotions || [],
    };

    const restaurant = new Restaurant(restaurantData);
    const savedRestaurant = await restaurant.save();

    res.status(201).json({
      ...savedRestaurant.toObject(),
      message: "Restaurant created successfully.",
      ownerId: req.user._id,
    });
  } catch (error) {
    // Handle duplicate key error (unique index violation)
    if (error.code === 11000 && error.keyPattern && error.keyPattern.owner) {
      return res
        .status(400)
        .json({ message: "Each owner can only post one restaurant." });
    }
    res.status(400).json({ message: error.message });
  }
};

// Update restaurant by ID (owner only)
export const updateRestaurant = async (req, res) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete restaurant by ID (owner only)
export const deleteRestaurant = async (req, res) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);

    if (!deletedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    await MenuItem.deleteMany({ restaurant: req.params.id });

    res
      .status(200)
      .json({ message: "Restaurant and associated menu items deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add promotion to restaurant (owner only)
export const addPromotion = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    restaurant.promotions.push(req.body);
    const updatedRestaurant = await restaurant.save();

    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update promotion (owner only)
export const updatePromotion = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const promotionIndex = restaurant.promotions.findIndex(
      (p) => p._id.toString() === req.params.promotionId
    );

    if (promotionIndex === -1) {
      return res.status(404).json({ message: "Promotion not found" });
    }

    restaurant.promotions[promotionIndex] = {
      ...restaurant.promotions[promotionIndex].toObject(),
      ...req.body,
    };

    const updatedRestaurant = await restaurant.save();
    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Remove promotion (owner only)
export const removePromotion = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    restaurant.promotions = restaurant.promotions.filter(
      (p) => p._id.toString() !== req.params.promotionId
    );

    const updatedRestaurant = await restaurant.save();
    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get featured restaurants
export const getFeaturedRestaurants = async (req, res) => {
  try {
    const featuredRestaurants = await Restaurant.find({ featured: true }).limit(
      6
    );
    res.status(200).json(featuredRestaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get restaurants by cuisine
export const getRestaurantsByCuisine = async (req, res) => {
  try {
    const { cuisine } = req.params;
    const restaurants = await Restaurant.find({ cuisine });
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get available cuisines
export const getCuisines = async (req, res) => {
  try {
    const cuisines = await Restaurant.distinct("cuisine");
    res.status(200).json(cuisines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get available locations
export const getLocations = async (req, res) => {
  try {
    const locations = await Restaurant.distinct("location");
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// controllers/restaurantController.js
export const getRestaurantsNearLocation = async (req, res) => {
  try {
    const { lat, lng, distance = 8000 } = req.query; // distance in meters

    if (!lat || !lng) {
      return res.status(400).json({
        error: "Latitude and longitude are required",
      });
    }

    const restaurants = await Restaurant.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: parseInt(distance),
        },
      },
    });

    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
