import React, { useState } from "react";
import styles from "./MenuDisplay.module.css";
import {
  FaLeaf,
  FaFire,
  FaDumbbell,
  FaBreadSlice,
  FaOilCan,
  FaAllergies,
  FaExclamationTriangle,
} from "react-icons/fa";
import { FiActivity } from "react-icons/fi";

// Helper functions for stable random rating/count
const getStableRandomRating = (seed) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const normalized = (hash % 1000) / 1000;
  return (normalized * 1.5 + 3.5).toFixed(1);
};
const getStableRandomCount = (seed) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 7) - hash);
  }
  const count = (Math.abs(hash) % 450) + 50;
  return count >= 1000 ? (count / 1000).toFixed(1) + "k" : count;
};

const MenuItemsList = ({
  items,
  selectedItems,
  onQuantityChange,
  onAddToCart,
}) => {
  const [showNutritionModal, setShowNutritionModal] = useState(false);
  const [selectedItemForNutrition, setSelectedItemForNutrition] =
    useState(null);

  const openNutritionModal = (item) => {
    setSelectedItemForNutrition(item);
    setShowNutritionModal(true);
  };
  const closeNutritionModal = () => setShowNutritionModal(false);

  if (!items || items.length === 0) {
    return (
      <div className={styles.noItems}>
        <p>No items found in this category.</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.menuItems}>
        {items.map((item) => (
          <div key={item._id} className={styles.menuItem}>
            <div className={styles.menuItemImage}>
              <img
                src={item.image}
                alt={item.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/default-food.jpg";
                }}
              />
            </div>
            <div className={styles.menuItemInfo}>
              <div className={styles.menuItemHeader}>
                <h3 className={styles.menuItemName}>
                  <div className={styles.nameLine}>{item.name}</div>
                  <div className={styles.badgeContainer}>
                    {item.isVeg && <span className={styles.vegBadge}>Veg</span>}
                    {item.isSpicy && (
                      <span className={styles.spicyBadge}>Spicy</span>
                    )}
                    {item.isGlutenFree && (
                      <span className={styles.glutenFreeBadge}>
                        Gluten Free
                      </span>
                    )}
                  </div>
                </h3>
                <div className={styles.reviewsContainer}>
                  <span className={styles.ratingLine}>
                    <span className={styles.starIcon}>★</span>
                    {getStableRandomRating(item._id)}
                  </span>
                  <span className={styles.reviewLine}>
                    {getStableRandomCount(item._id)} reviews
                  </span>
                </div>
              </div>
              <p className={styles.menuItemDescription}>{item.description}</p>
              {item.ingredients && item.ingredients.length > 0 && (
                <div className={styles.ingredients}>
                  <strong>Ingredients:</strong> {item.ingredients.join(", ")}
                </div>
              )}
              <div className={styles.menuItemTags}>
                {item.popular && (
                  <span className={styles.menuItemTag}>Popular</span>
                )}
              </div>
              <div className={styles.menuItemBottom}>
                <div className={styles.priceAndButtons}>
                  <div className={styles.menuItemPrice}>
                    ₹{item.price.toFixed(2)}
                  </div>
                  <div className={styles.menuItemActions}>
                    {item.nutritionInfo && (
                      <button
                        className={styles.nutritionButton}
                        onClick={() => openNutritionModal(item)}
                      >
                        Nutrition Info
                      </button>
                    )}
                    <div className={styles.quantityControl}>
                      <button
                        className={styles.quantityButton}
                        onClick={() =>
                          onQuantityChange(
                            item._id,
                            (selectedItems[item._id] || 1) - 1
                          )
                        }
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className={styles.quantityInput}
                        value={selectedItems[item._id] || 1}
                        onChange={(e) =>
                          onQuantityChange(
                            item._id,
                            parseInt(e.target.value) || 1
                          )
                        }
                        min="1"
                      />
                      <button
                        className={styles.quantityButton}
                        onClick={() =>
                          onQuantityChange(
                            item._id,
                            (selectedItems[item._id] || 1) + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <button
                      className={styles.addToCartButton}
                      onClick={() => onAddToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Nutrition Modal */}
      {showNutritionModal && selectedItemForNutrition && (
        <div className={styles.modalOverlay} onClick={closeNutritionModal}>
          <div
            className={styles.nutritionModal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>
                <FiActivity className={styles.modalIcon} />
                <h3>Nutrition Information</h3>
              </div>
              <button
                className={styles.closeModalButton}
                onClick={closeNutritionModal}
              >
                ×
              </button>
            </div>
            <div className={styles.modalContent}>
              <div className={styles.nutritionHeader}>
                <h4>{selectedItemForNutrition.name}</h4>
                {selectedItemForNutrition.isVeg && (
                  <span className={styles.vegBadge}>
                    <FaLeaf /> Vegetarian
                  </span>
                )}
              </div>
              <div className={styles.nutritionGrid}>
                {selectedItemForNutrition.nutritionInfo.calories && (
                  <div className={styles.nutritionCard}>
                    <div className={styles.nutritionCardHeader}>
                      <FaFire className={styles.nutritionIcon} />
                      <span className={styles.nutritionLabel}>Calories</span>
                    </div>
                    <span className={styles.nutritionValue}>
                      {selectedItemForNutrition.nutritionInfo.calories} kcal
                    </span>
                  </div>
                )}
                {selectedItemForNutrition.nutritionInfo.protein && (
                  <div className={styles.nutritionCard}>
                    <div className={styles.nutritionCardHeader}>
                      <FaDumbbell className={styles.nutritionIcon} />
                      <span className={styles.nutritionLabel}>Protein</span>
                    </div>
                    <span className={styles.nutritionValue}>
                      {selectedItemForNutrition.nutritionInfo.protein}g
                    </span>
                  </div>
                )}
                {selectedItemForNutrition.nutritionInfo.carbs && (
                  <div className={styles.nutritionCard}>
                    <div className={styles.nutritionCardHeader}>
                      <FaBreadSlice className={styles.nutritionIcon} />
                      <span className={styles.nutritionLabel}>Carbs</span>
                    </div>
                    <span className={styles.nutritionValue}>
                      {selectedItemForNutrition.nutritionInfo.carbs}g
                    </span>
                  </div>
                )}
                {selectedItemForNutrition.nutritionInfo.fat && (
                  <div className={styles.nutritionCard}>
                    <div className={styles.nutritionCardHeader}>
                      <FaOilCan className={styles.nutritionIcon} />
                      <span className={styles.nutritionLabel}>Fat</span>
                    </div>
                    <span className={styles.nutritionValue}>
                      {selectedItemForNutrition.nutritionInfo.fat}g
                    </span>
                  </div>
                )}
              </div>
              {selectedItemForNutrition.allergenInfo &&
                selectedItemForNutrition.allergenInfo.length > 0 && (
                  <div className={styles.allergenSection}>
                    <div className={styles.sectionHeader}>
                      <FaAllergies className={styles.sectionIcon} />
                      <h5>Allergen Information</h5>
                    </div>
                    <div className={styles.allergenTags}>
                      {selectedItemForNutrition.allergenInfo.map(
                        (allergen, index) => (
                          <span key={index} className={styles.allergenTag}>
                            <FaExclamationTriangle
                              className={styles.allergenIcon}
                            />
                            {allergen}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuItemsList;
