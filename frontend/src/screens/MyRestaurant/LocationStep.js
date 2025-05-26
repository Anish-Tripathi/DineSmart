import React from "react";
import { MapPin } from "lucide-react";
import styles from "./AddRestaurant.module.css";

const LocationStep = ({ restaurant, handleRestaurantChange }) => (
  <div className={styles.stepContainer}>
    <div className={styles.formGroup}>
      <label className={styles.labelWithIcon}>
        <MapPin size={16} className={styles.labelIcon} />
        Address *
      </label>
      <input
        type="text"
        name="address"
        value={restaurant.address}
        onChange={handleRestaurantChange}
        className={styles.input}
        placeholder="Enter complete address"
        required
      />
    </div>

    <div className={styles.formGroup}>
      <label className={styles.labelWithIcon}>
        <MapPin size={16} className={styles.labelIcon} />
        Coordinates (Longitude, Latitude) *
      </label>
      <input
        type="text"
        name="location.coordinates"
        value={restaurant.location.coordinates.join(",")}
        onChange={handleRestaurantChange}
        className={styles.input}
        placeholder="e.g., -74.0060,40.7128"
        required
      />
      <p className={styles.hint}>
        You can get coordinates from Google Maps by right-clicking on your
        location.
      </p>
    </div>
  </div>
);

export default LocationStep;
