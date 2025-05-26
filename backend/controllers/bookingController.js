import Booking from "../models/Booking.js";
import Restaurant from "../models/Restaurant.js";

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const {
      restaurantId,
      guests,
      date,
      time,
      name,
      email,
      phone,
      specialRequests,
    } = req.body;

    // Validate restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const booking = new Booking({
      restaurant: restaurantId,
      user: req.user.id,
      guests,
      date: new Date(date),
      time,
      name,
      email,
      phone,
      specialRequests: specialRequests || "",
    });

    await booking.save();

    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get bookings for a restaurant
export const getBookingsForRestaurant = async (req, res) => {
  try {
    const bookings = await Booking.find({ restaurant: req.params.id });
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("restaurant", "name image address")
      .sort({ date: -1, time: -1 });

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

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
