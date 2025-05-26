import React, { useState, useEffect } from "react";
import RestaurantList from "../../components/RestaurantList/RestaurantList";
import RestaurantFilter from "../../components/RestaurantFilter/RestaurantFilter";
import MenuDisplay from "../../components/MenuDisplay/MenuDisplay";
import styles from "./Home.module.css";
import { heroImages } from "./Images.js";
import axios from "axios";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function Home() {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter state
  const [filterOptions, setFilterOptions] = useState({
    priceRange: { min: 0, max: 2000 },
    deliveryTime: 30,
    rating: 4,
    cuisine: "",
    sortBy: "",
    vegetarianOnly: false,
    userLocation: null,
    distance: 8,
  });

  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [availableCuisines, setAvailableCuisines] = useState([]);
  const [availableLocations, setAvailableLocations] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // Auth state, as before
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("userRole");
    return token && role ? { token, role } : null;
  });

  useEffect(() => {
    const syncUser = () => {
      const token = localStorage.getItem("authToken");
      const role = localStorage.getItem("userRole");
      setUser(token && role ? { token, role } : null);
    };
    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  // Fetch restaurants depending on user location filter
  useEffect(() => {
    if (!user || user.role !== "customer") {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        let restaurantsData;

        // If userLocation set, fetch from /nearby
        if (filterOptions.userLocation) {
          const { lat, lng } = filterOptions.userLocation;
          const distanceMeters = (filterOptions.distance || 8) * 1000;
          const res = await axios.get(`${baseUrl}/api/restaurants/nearby`, {
            params: { lat, lng, distance: distanceMeters },
          });
          restaurantsData = res.data;
        } else {
          // Otherwise fetch all
          const res = await axios.get(`${baseUrl}/api/restaurants`);
          restaurantsData = res.data;
        }

        setAllRestaurants(restaurantsData);
        setFilteredRestaurants(restaurantsData); // show all/nearby initially

        // Fetch cuisines and locations
        const cuisinesResponse = await axios.get(
          `${baseUrl}/api/restaurants/cuisines`
        );
        setAvailableCuisines(cuisinesResponse.data);

        const locationsResponse = await axios.get(
          `${baseUrl}/api/restaurants/locations`
        );
        setAvailableLocations(locationsResponse.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user, filterOptions.userLocation, filterOptions.distance]);

  // Debounced search
  useEffect(() => {
    const handler = setTimeout(() => setSearchTerm(search), 300);
    return () => clearTimeout(handler);
  }, [search]);

  // Filtering logic
  useEffect(() => {
    if (!user || user.role !== "customer") return;

    let results = [...allRestaurants];

    // SEARCH
    if (searchTerm && searchTerm.trim().length > 0) {
      const s = searchTerm.trim().toLowerCase();
      results = results.filter(
        (r) =>
          r.name.toLowerCase().includes(s) ||
          (r.cuisine && r.cuisine.toLowerCase().includes(s)) ||
          (r.address && r.address.toLowerCase().includes(s)) ||
          (r.city && r.city.toLowerCase().includes(s)) ||
          (r.locality && r.locality.toLowerCase().includes(s))
      );
    }

    // FILTERS
    // Price range
    results = results.filter(
      (r) =>
        typeof r.priceRange === "number" &&
        r.priceRange >= filterOptions.priceRange.min &&
        r.priceRange <= filterOptions.priceRange.max
    );
    // Delivery time
    results = results.filter(
      (r) =>
        typeof r.deliveryTime === "number" &&
        r.deliveryTime <= filterOptions.deliveryTime
    );
    // Rating
    results = results.filter(
      (r) => typeof r.rating === "number" && r.rating >= filterOptions.rating
    );
    // Cuisine
    if (filterOptions.cuisine) {
      results = results.filter(
        (r) =>
          r.cuisine &&
          r.cuisine.toLowerCase() === filterOptions.cuisine.toLowerCase()
      );
    }
    // Vegetarian only
    if (filterOptions.vegetarianOnly) {
      results = results.filter((r) => r.isVeg === true);
    }

    // Sorting
    if (filterOptions.sortBy) {
      switch (filterOptions.sortBy) {
        case "rating":
          results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        case "delivery_time":
          results.sort((a, b) => (a.deliveryTime || 0) - (b.deliveryTime || 0));
          break;
        case "price_low":
          results.sort((a, b) => (a.priceRange || 0) - (b.priceRange || 0));
          break;
        case "price_high":
          results.sort((a, b) => (b.priceRange || 0) - (a.priceRange || 0));
          break;
        default:
          break;
      }
    }

    setFilteredRestaurants(results);
  }, [searchTerm, filterOptions, allRestaurants, user]);

  const applyFilters = (opts) => setFilterOptions(opts);
  const handleViewMenu = (restaurant) => setSelectedRestaurant(restaurant);

  const handleBackToRestaurants = () => {
    console.log("Back button clicked, setting selectedRestaurant to null");
    setSelectedRestaurant(null);
  };
  const handleAddToCart = (item, quantity) => {
    console.log("Added to cart:", item.name, "Quantity:", quantity);
  };

  // Carousel rotation
  useEffect(() => {
    if (!heroImages.length) return;
    const carouselInterval = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(carouselInterval);
  }, [heroImages.length]);

  return (
    <div className={styles.container}>
      {/* Hero Section with Carousel */}
      <section className={styles.hero}>
        <div className={styles.carousel}>
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`${styles.heroCarouselItem} ${
                activeSlide === index ? styles.active : ""
              }`}
            >
              <img
                src={image.url}
                className={`${styles.heroImage}`}
                alt={image.alt}
              />
            </div>
          ))}
        </div>

        {/* Content Overlay */}
        <div className={styles.searchBox}>
          <h1 className={styles.heroTitle}>Delicious Food, Delivered Fast</h1>
          <div className={styles.searchWrapper}>
            <input
              type="search"
              className={styles.searchInput}
              placeholder="Search for restaurants, cuisines, or locations!"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              disabled={!user || user.role !== "customer"}
            />
            <i className={`fa fa-search ${styles.searchIcon}`}></i>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className={styles.carouselIndicators}>
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`${styles.carouselIndicator} ${
                activeSlide === index ? styles.active : ""
              }`}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Main Content Section */}
      <div className={styles.mainContent}>
        <div className={styles.backgroundOverlay}></div>
        {user && user.role === "customer" ? (
          selectedRestaurant ? (
            <MenuDisplay
              restaurant={selectedRestaurant}
              onBack={handleBackToRestaurants}
              onAddToCart={handleAddToCart}
            />
          ) : (
            <div className={styles.restaurantSection}>
              <h2 className={styles.sectionTitle}>Featured Restaurants</h2>
              <div className={styles.restaurantLayout}>
                {/* Filter Panel */}
                <div className={styles.filterPanel}>
                  <RestaurantFilter
                    availableCuisines={availableCuisines}
                    applyFilters={applyFilters}
                  />
                </div>
                {/* Restaurant List */}
                <div className={styles.restaurantListContainer}>
                  <RestaurantList
                    restaurants={filteredRestaurants}
                    onViewMenu={handleViewMenu}
                  />
                </div>
              </div>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
}
