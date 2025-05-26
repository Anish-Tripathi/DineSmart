import React from "react";
import { Store, Tag, Salad, Image, Trophy } from "lucide-react";
import styles from "./AddRestaurant.module.css";

const BasicInformationStep = ({ restaurant, handleRestaurantChange }) => (
  <div className={styles.stepContainer}>
    <div className={styles.formGroup}>
      <label className={styles.labelWithIcon}>
        <Store size={16} className={styles.labelIcon} />
        Restaurant Name *
      </label>
      <input
        type="text"
        name="name"
        value={restaurant.name}
        onChange={handleRestaurantChange}
        className={styles.input}
        placeholder="Enter restaurant name"
        required
      />
    </div>

    <div className={styles.formGroup}>
      <label className={styles.labelWithIcon}>
        <Tag size={16} className={styles.labelIcon} />
        Description *
      </label>
      <small className={styles.hint}>
        Provide a concise and engaging summary (maximum two lines).
      </small>
      <textarea
        name="description"
        value={restaurant.description}
        onChange={handleRestaurantChange}
        className={`${styles.input} ${styles.textarea}`}
        placeholder="Describe your restaurant"
        required
      />
    </div>

    <div className={styles.formGroup}>
      <label className={styles.labelWithIcon}>
        <Salad size={16} className={styles.labelIcon} />
        Cuisine Type *
      </label>
      <input
        type="text"
        name="cuisine"
        value={restaurant.cuisine}
        onChange={handleRestaurantChange}
        className={styles.input}
        placeholder="e.g., Italian, Chinese, Indian"
        required
      />
    </div>

    <div className={styles.formGroup}>
      <label className={styles.labelWithIcon}>
        <Image size={16} className={styles.labelIcon} />
        Image URL *
      </label>
      <input
        type="url"
        name="image"
        value={restaurant.image}
        onChange={handleRestaurantChange}
        className={styles.input}
        placeholder="https://example.com/image.jpg"
        required
      />
    </div>

    <div className={styles.checkboxGroup}>
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          name="isVeg"
          checked={restaurant.isVeg}
          onChange={handleRestaurantChange}
          className={styles.checkbox}
        />
        <Salad size={16} className={styles.checkboxIcon} />
        Vegetarian Restaurant
      </label>

      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          name="featured"
          checked={restaurant.featured}
          onChange={handleRestaurantChange}
          className={styles.checkbox}
        />
        <Trophy size={16} className={styles.checkboxIcon} />
        Featured Restaurant
      </label>
    </div>
  </div>
);

export default BasicInformationStep;
