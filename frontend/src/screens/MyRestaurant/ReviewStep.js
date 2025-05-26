import React from "react";
import { Tag } from "lucide-react";
import styles from "./AddRestaurant.module.css";

const ReviewStep = ({ restaurant, setRestaurant }) => (
  <div className={styles.stepContainer}>
    <div className={styles.formGroup}>
      <label className={styles.labelWithIcon}>
        <Tag size={16} className={styles.labelIcon} />
        Tags
      </label>
      <input
        type="text"
        value={restaurant.tags.join(",")}
        onChange={(e) => {
          setRestaurant((prev) => ({
            ...prev,
            tags: e.target.value
              .split(",")
              .map((tag) => tag.trim())
              .filter((tag) => tag),
          }));
        }}
        className={styles.input}
        placeholder="Comma separated tags (e.g., Italian, Pizza, Fine Dining)"
      />
      <p className={styles.helpText}>Separate tags with commas</p>
    </div>
    {/* Review Summary */}
    <div className={styles.reviewSummary}>
      <h3 className={styles.cardTitle}>Restaurant Summary</h3>
      <div className={styles.summaryGrid}>
        <div>
          <strong>Name:</strong> {restaurant.name || "Not specified"}
        </div>
        <div>
          <strong>Cuisine:</strong> {restaurant.cuisine || "Not specified"}
        </div>
        <div>
          <strong>Address:</strong> {restaurant.address || "Not specified"}
        </div>
        <div>
          <strong>Phone:</strong>{" "}
          {restaurant.contactInfo.phone || "Not specified"}
        </div>
        <div>
          <strong>Email:</strong>{" "}
          {restaurant.contactInfo.email || "Not specified"}
        </div>
        <div>
          <strong>Delivery Time:</strong> {restaurant.deliveryTime} minutes
        </div>
        <div>
          <strong>Price Range:</strong> ₹{restaurant.priceRange}
        </div>
        <div>
          <strong>Rating:</strong> {restaurant.rating}
        </div>
        <div>
          <strong>Promotions:</strong> {restaurant.promotions.length} active
        </div>
        <div>
          <strong>Tags:</strong>{" "}
          {restaurant.tags.length > 0 ? restaurant.tags.join(", ") : "None"}
        </div>
      </div>
    </div>
  </div>
);

export default ReviewStep;
