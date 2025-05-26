import React, { useState, useRef, useEffect } from "react";
import styles from "./FoodCard.module.css";
import { useDispatchCart, useCart } from "../ContextReducer";

export default function FoodCard(props) {
  let data = useCart();
  let dispatch = useDispatchCart();
  let options = props.options;
  let priceOptions = Object.keys(options);
  const priceRef = useRef();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Random rating between 3.5 and 5 if not provided
  const rating =
    props.foodItem.rating || (Math.random() * 1.5 + 3.5).toFixed(1);

  // Default tags
  const tagOptions = [
    ["Spicy", "Popular", "Chef Special"],
    ["Vegetarian", "Healthy", "Trending"],
    ["Non-Veg", "Protein Rich", "Best Seller"],
    ["Sweet", "Comfort Food", "New"],
    ["Savory", "Quick Meal", "Limited Time"],
  ];
  const tags =
    props.foodItem.tags ||
    tagOptions[Math.floor(Math.random() * tagOptions.length)];

  const handleAddToCart = async () => {
    setIsLoading(true);
    let food = null;
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }

    if (food) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
        });
      } else {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
        });
      }
    } else {
      await dispatch({
        type: "ADD",
        id: props.foodItem._id,
        name: props.foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
      });
    }
    setIsLoading(false);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  let finalPrice = qty * parseInt(options[size] || 0);

  useEffect(() => {
    if (priceRef.current) {
      setSize(priceRef.current.value);
    }
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    const numericRating = parseFloat(rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= numericRating) {
        stars.push(
          <span key={i} className={`${styles.star} ${styles.starFilled}`}>
            ★
          </span>
        );
      } else if (i - 0.5 <= numericRating) {
        stars.push(
          <span key={i} className={`${styles.star} ${styles.starHalfFilled}`}>
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className={styles.star}>
            ☆
          </span>
        );
      }
    }
    return stars;
  };

  // Generate random review count between 50 and 500
  const reviewCount = Math.floor(Math.random() * 450) + 50;

  return (
    <div className={styles.card}>
      <div className={styles.badge}>New</div>

      <div className={styles.imageContainer}>
        <img
          src={props.foodItem.img}
          alt={props.foodItem.name}
          className={styles.image}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://recipes.timesofindia.com/thumb/53351352.cms?imgsize=151967&width=800&height=800";
          }}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.tags}>
          {tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>

        <h3 className={styles.title}>{props.foodItem.name}</h3>

        <div className={styles.rating}>
          {renderStars(rating)}
          <span className={styles.ratingValue}>{rating}</span>
          <span className={styles.ratingCount}>({reviewCount})</span>
        </div>

        <p className={styles.description}>
          {props.foodItem.description ||
            "Delicious dish prepared with quality ingredients."}
        </p>

        <div className={styles.options}>
          <div className={styles.optionGroup}>
            <label className={styles.optionLabel}>Quantity:</label>
            <select
              className={styles.optionSelect}
              onChange={(e) => setQty(e.target.value)}
              value={qty}
            >
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.optionGroup}>
            <label className={styles.optionLabel}>Size:</label>
            <select
              className={styles.optionSelect}
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
              value={size}
            >
              {priceOptions.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.priceContainer}>
            <span className={styles.priceLabel}>Total:</span>
            <span className={styles.priceValue}>₹{finalPrice || 0}</span>
          </div>

          <button
            className={`${styles.addButton} ${isLoading ? styles.loading : ""}`}
            onClick={handleAddToCart}
            disabled={!size || isLoading}
          >
            {isLoading ? (
              ""
            ) : (
              <>
                <span
                  role="img"
                  aria-label="Shopping cart"
                  className={styles.cartIcon}
                >
                  🛒
                </span>{" "}
                Add to Cart
              </>
            )}
          </button>
        </div>

        {showNotification && (
          <div className={`${styles.notification} ${styles.notificationShow}`}>
            <span className={styles.checkIcon}>✓</span>
            <span>Item added to cart successfully!</span>
            <span
              className={styles.closeBtn}
              onClick={() => setShowNotification(false)}
            >
              ×
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
