import React from "react";
import { Clock, Flame, Star } from "lucide-react";
import styles from "./AddRestaurant.module.css";

const BusinessStep = ({ restaurant, handleRestaurantChange }) => (
  <div className={styles.stepContainer}>
    <div className={styles.formGroup}>
      <label className={styles.labelWithIcon}>
        <Clock size={16} className={styles.labelIcon} />
        Delivery Time (minutes) *
      </label>
      <input
        type="number"
        name="deliveryTime"
        value={restaurant.deliveryTime}
        onChange={handleRestaurantChange}
        className={styles.input}
        min="0"
        placeholder="30"
        required
      />
    </div>

    <div className={styles.formGroup}>
      <label className={styles.labelWithIcon}>
        <Flame size={16} className={styles.labelIcon} />
        Price range(₹) *
      </label>
      <input
        type="number"
        name="priceRange"
        value={restaurant.priceRange}
        onChange={handleRestaurantChange}
        className={styles.input}
        placeholder="Enter average cost in ₹"
        min={0}
        required
      />
      <p className={styles.hint}>
        This is the average per person cost at your restaurant.
      </p>
    </div>

    <div className={styles.formGroup}>
      <label className={styles.labelWithIcon}>
        <Star size={16} className={styles.labelIcon} />
        Initial Rating (1 to 5) *
      </label>
      <input
        type="number"
        name="rating"
        value={restaurant.rating}
        onChange={handleRestaurantChange}
        className={styles.input}
        min="1"
        max="5"
        required
      />
    </div>
  </div>
);

export default BusinessStep;
