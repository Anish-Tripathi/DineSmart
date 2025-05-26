import React, { useState, useEffect } from "react";
import styles from "./RestaurantFilter.module.css";
import {
  FaDollarSign,
  FaClock,
  FaStar,
  FaFilter,
  FaUtensils,
  FaSortAmountDown,
  FaLeaf,
  FaMapMarkerAlt,
  FaUndo,
} from "react-icons/fa";

const RestaurantFilter = ({ applyFilters, availableCuisines = [] }) => {
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 2000 },
    deliveryTime: 60,
    rating: 4,
    cuisine: "",
    sortBy: "",
    vegetarianOnly: false,
    userLocation: null,
    distance: 8,
  });

  const [locationError, setLocationError] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [shouldApplyFilters, setShouldApplyFilters] = useState(false);

  useEffect(() => {
    if (shouldApplyFilters) {
      applyFilters(filters);
      setShouldApplyFilters(false);
    }
  }, [filters, applyFilters, shouldApplyFilters]);

  useEffect(() => {
    applyFilters(filters);
  }, []);

  const handleInputChange = (name, value) => {
    const updated = { ...filters, [name]: value };
    setFilters(updated);
    applyFilters(updated); // call parent immediately
  };

  const resetFilters = () => {
    const defaultFilters = {
      priceRange: { min: 0, max: 2000 },
      deliveryTime: 60,
      rating: 4,
      cuisine: "",
      sortBy: "",
      vegetarianOnly: false,
      userLocation: null,
      distance: 8,
    };
    setFilters(defaultFilters);
    applyFilters(defaultFilters);
  };

  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    setIsLoadingLocation(true);
    setLocationError(null);

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      console.log("latitude:", position.coords.latitude);
      console.log("latitude:", position.coords.longitude);

      const updated = { ...filters, userLocation };
      setFilters(updated);
      setShouldApplyFilters(true);
    } catch (error) {
      setLocationError("Unable to retrieve your location");
    } finally {
      setIsLoadingLocation(false);
    }
  };

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.headerRow}>
        <h2 className={styles.filtersHeading}>
          <FaFilter className={styles.headingIcon} /> Filters
        </h2>
        <button className={styles.resetButton} onClick={resetFilters}>
          <FaUndo className={styles.resetIcon} /> Reset
        </button>
      </div>

      {/* Location Button */}
      <div className={styles.filterGroup}>
        <button
          className={styles.locationButton}
          onClick={getCurrentLocation}
          disabled={isLoadingLocation}
        >
          <FaMapMarkerAlt className={styles.locationIcon} />
          {isLoadingLocation
            ? "Getting Location..."
            : "Use My Current Location"}
        </button>
        {filters.userLocation && (
          <div className={styles.locationSuccess}>
            Using your current location
          </div>
        )}
        {locationError && (
          <div className={styles.locationError}>{locationError}</div>
        )}

        {filters.userLocation && (
          <div className={styles.distanceFilter}>
            <label className={styles.filterLabel}>Within distance (km):</label>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={filters.distance}
              onChange={(e) =>
                handleInputChange("distance", parseInt(e.target.value))
              }
              className={styles.rangeSlider}
            />
            <div className={styles.rangeValue}>{filters.distance} km</div>
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>
          <FaDollarSign className={styles.filterIcon} /> Price Range
        </label>
        <div className={styles.priceRangeDisplay}>
          ₹{filters.priceRange.min} to ₹{filters.priceRange.max}
        </div>
        <div className={styles.rangeSliderContainer}>
          <input
            type="range"
            min="0"
            max="2000"
            value={filters.priceRange.min}
            onChange={(e) => {
              const newMin = parseInt(e.target.value);
              if (newMin <= filters.priceRange.max) {
                handleInputChange("priceRange", {
                  ...filters.priceRange,
                  min: newMin,
                });
              }
            }}
            className={styles.rangeSlider}
          />
          <input
            type="range"
            min="0"
            max="2000"
            value={filters.priceRange.max}
            onChange={(e) => {
              const newMax = parseInt(e.target.value);
              if (newMax >= filters.priceRange.min) {
                handleInputChange("priceRange", {
                  ...filters.priceRange,
                  max: newMax,
                });
              }
            }}
            className={styles.rangeSlider}
          />
        </div>
      </div>

      {/* Delivery Time Filter */}
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>
          <FaClock className={styles.filterIcon} /> Max Delivery Time (minutes)
        </label>
        <input
          type="number"
          min="10"
          max="120"
          value={filters.deliveryTime}
          onChange={(e) =>
            handleInputChange("deliveryTime", parseInt(e.target.value))
          }
          className={styles.numberInput}
        />
      </div>

      {/* Minimum Rating Filter */}
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>
          <FaStar className={styles.filterIcon} /> Minimum Rating
        </label>
        <select
          className={styles.selectInput}
          value={filters.rating}
          onChange={(e) =>
            handleInputChange("rating", parseFloat(e.target.value))
          }
        >
          <option value="3">3+ Stars</option>
          <option value="4">4+ Stars</option>
          <option value="4.5">4.5+ Stars</option>
        </select>
      </div>

      {/* Cuisine Type Filter */}
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>
          <FaUtensils className={styles.filterIcon} /> Cuisine Type
        </label>
        <select
          className={styles.selectInput}
          value={filters.cuisine}
          onChange={(e) => handleInputChange("cuisine", e.target.value)}
        >
          <option value="">All Cuisines</option>
          {availableCuisines.length > 0
            ? availableCuisines.map((cuisine, index) => (
                <option key={index} value={cuisine}>
                  {cuisine}
                </option>
              ))
            : [
                "Italian",
                "Chinese",
                "Indian",
                "Mexican",
                "Japanese",
                "Thai",
              ].map((cuisine, index) => (
                <option key={index} value={cuisine}>
                  {cuisine}
                </option>
              ))}
        </select>
      </div>

      {/* Sort By Filter */}
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>
          <FaSortAmountDown className={styles.filterIcon} /> Sort By
        </label>
        <select
          className={styles.selectInput}
          value={filters.sortBy}
          onChange={(e) => handleInputChange("sortBy", e.target.value)}
        >
          <option value="">Default</option>
          <option value="rating">Rating: High to Low</option>
          <option value="delivery_time">Delivery Time</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
        </select>
      </div>

      {/* Vegetarian Only Toggle */}
      <div className={styles.filterGroup}>
        <label className={styles.toggleContainer}>
          <span className={styles.toggleLabel}>
            <FaLeaf className={styles.filterIcon} /> Vegetarian Only
          </span>
          <div className={styles.toggleSwitch}>
            <input
              type="checkbox"
              className={styles.toggleInput}
              checked={filters.vegetarianOnly}
              onChange={(e) =>
                handleInputChange("vegetarianOnly", e.target.checked)
              }
            />
            <span className={styles.toggleSlider}></span>
          </div>
        </label>
      </div>
    </div>
  );
};

export default RestaurantFilter;
