import React, { useState, useEffect } from "react";
import styles from "./MenuDisplay.module.css";
import { useNavigate } from "react-router-dom";
import PromotionModal from "./PromotionModal.js";
import axios from "axios";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaInfoCircle,
  FaGift,
} from "react-icons/fa";
import { useCart, useDispatchCart } from "../ContextReducer";
import NotificationModal from "../NotificationModal/NotificationModal";
import ConfirmationModal from "./ConfirmationModal.js";
import MenuItemsList from "./MenuItemsList";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

const MenuDisplay = ({ onBack, restaurant: propRestaurant }) => {
  const [restaurant, setRestaurant] = useState(propRestaurant || null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItems, setSelectedItems] = useState({});
  const [categories, setCategories] = useState(["All"]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [nutrientFilter, setNutrientFilter] = useState({
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToAdd, setItemToAdd] = useState(null);
  const [showPromotionModal, setShowPromotionModal] = useState(false);
  const [restaurantId, setRestaurantId] = useState(
    propRestaurant?._id || localStorage.getItem("currentRestaurantId")
  );
  const [showContactModal, setShowContactModal] = useState(false);

  const navigate = useNavigate();
  const data = useCart();
  const dispatch = useDispatchCart();

  useEffect(() => {
    if (propRestaurant) {
      setRestaurant(propRestaurant);
      setRestaurantId(propRestaurant._id);
      fetchMenuItems(propRestaurant._id);
      return;
    }
    if (!restaurantId || restaurantId === "undefined") {
      setError("Invalid restaurant ID");
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("authToken");
        const axiosConfig = token
          ? { headers: { Authorization: `Bearer ${token}` } }
          : {};
        const restaurantRes = await axios.get(
          `${baseUrl}/api/restaurants/${restaurantId}`,
          axiosConfig
        );
        setRestaurant(restaurantRes.data);
        await fetchMenuItems(restaurantId, axiosConfig);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load menu. Please try again later."
        );
        setMenuItems([]);
        setCategories(["All"]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, [restaurantId, propRestaurant]);

  const fetchMenuItems = async (id, axiosConfig = {}) => {
    try {
      if (!axiosConfig.headers) {
        const token = localStorage.getItem("authToken");
        axiosConfig = token
          ? { headers: { Authorization: `Bearer ${token}` } }
          : {};
      }
      const menuRes = await axios.get(
        `${baseUrl}/api/menu-items/restaurant/${id}`,
        axiosConfig
      );
      setMenuItems(menuRes.data);
      const uniqueCategories = ["All"];
      if (menuRes.data?.length > 0) {
        const categories = [
          ...new Set(menuRes.data.map((item) => item.category)),
        ];
        uniqueCategories.push(...categories.filter(Boolean));
      }
      setCategories(uniqueCategories);
      setLoading(false);
    } catch (err) {
      setError("Failed to load menu items");
      setMenuItems([]);
      setCategories(["All"]);
      setLoading(false);
    }
  };

  // Filtering logic
  const filteredItems = menuItems.filter((item) => {
    if (activeCategory !== "All" && item.category !== activeCategory)
      return false;
    if (
      searchQuery &&
      !item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    const n = item.nutritionInfo || {};
    if (
      nutrientFilter.calories !== "" &&
      (n.calories === undefined || n.calories > Number(nutrientFilter.calories))
    )
      return false;
    if (
      nutrientFilter.protein !== "" &&
      (n.protein === undefined || n.protein < Number(nutrientFilter.protein))
    )
      return false;
    if (
      nutrientFilter.carbs !== "" &&
      (n.carbs === undefined || n.carbs > Number(nutrientFilter.carbs))
    )
      return false;
    if (
      nutrientFilter.fat !== "" &&
      (n.fat === undefined || n.fat > Number(nutrientFilter.fat))
    )
      return false;
    return true;
  });

  const handleQuantityChange = (itemId, quantity) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: Math.max(1, quantity),
    }));
  };

  // Cart logic
  const checkDifferentRestaurant = (item) => {
    if (data.length > 0 && data[0].restaurantId !== restaurantId) {
      setItemToAdd(item);
      setShowConfirmModal(true);
      return true;
    }
    return false;
  };

  const addItemToCart = (item, quantity) => {
    dispatch({
      type: "ADD",
      id: item._id,
      name: item.name,
      qty: quantity,
      size: "regular",
      price: item.price * quantity,
      img: item.image,
      restaurantId: restaurantId,
      restaurantName: restaurant?.name || "Restaurant",
    });
    setSuccessMessage(`${quantity} ${item.name} added to cart!`);
    setShowSuccessModal(true);
    setSelectedItems((prev) => ({
      ...prev,
      [item._id]: 1,
    }));
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 3000);
  };

  const handleAddToCart = (item) => {
    const quantity = selectedItems[item._id] || 1;
    if (checkDifferentRestaurant(item)) return;
    addItemToCart(item, quantity);
  };

  const handleConfirmRestaurantChange = () => {
    if (itemToAdd) {
      const quantity = selectedItems[itemToAdd._id] || 1;
      dispatch({
        type: "CHANGE_RESTAURANT",
        id: itemToAdd._id,
        name: itemToAdd.name,
        qty: quantity,
        size: "regular",
        price: itemToAdd.price * quantity,
        img: itemToAdd.image,
        restaurantId: restaurantId,
        restaurantName: restaurant?.name || "Restaurant",
      });
      setSuccessMessage(`${quantity} ${itemToAdd.name} added to cart!`);
      setShowSuccessModal(true);
      setSelectedItems((prev) => ({
        ...prev,
        [itemToAdd._id]: 1,
      }));
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
    }
    setShowConfirmModal(false);
    setItemToAdd(null);
  };
  const handleCancelRestaurantChange = () => {
    setShowConfirmModal(false);
    setItemToAdd(null);
  };

  const handleBackClick = () => {
    if (typeof onBack === "function") {
      onBack();
    } else {
      if (navigate) {
        navigate(-1);
      } else {
        window.history.back();
      }
    }
  };

  const openContactModal = () => setShowContactModal(true);
  const closeContactModal = () => setShowContactModal(false);

  if (loading) {
    return <div className={styles.loading}>Loading menu...</div>;
  }
  if (error) {
    return (
      <div className={styles.error}>
        <p>Error: {error}</p>
        <button className={styles.backButton} onClick={handleBackClick}>
          ← Back to Restaurants
        </button>
      </div>
    );
  }
  if (!restaurant) {
    return (
      <div className={styles.error}>
        <p>Restaurant not found</p>
        <button className={styles.backButton} onClick={handleBackClick}>
          ← Back to Restaurants
        </button>
      </div>
    );
  }

  return (
    <div className={styles.menuContainer}>
      <div className={styles.menuHeader}>
        <button className={styles.backButton} onClick={handleBackClick}>
          ← Back to Restaurants
        </button>
        <h2 className={styles.restaurantTitle}>{restaurant.name} Menu</h2>
        <div className={styles.headerButtons}>
          <button
            className={styles.promotionButton}
            onClick={() => setShowPromotionModal(true)}
          >
            <FaGift
              className={styles.promotionButtonIcon}
              style={{ fontSize: 14, marginRight: 5 }}
            />
            {restaurant.promotions && restaurant.promotions.length > 0
              ? `${restaurant.promotions.length} Offer${
                  restaurant.promotions.length > 1 ? "s" : ""
                }`
              : "Offers"}
          </button>
          <button className={styles.contactButton} onClick={openContactModal}>
            Contact Info
          </button>
          <button
            className={styles.bookTableButton}
            onClick={() => {
              navigate(`/book-table/${restaurantId}`);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Book a Table
          </button>
        </div>
      </div>

      {/* Category Nav */}
      <div className={styles.categoryNav}>
        <div className={styles.categoryTabs}>
          {categories &&
            categories.length > 0 &&
            categories.map((category) => (
              <button
                key={category}
                className={`${styles.categoryTab} ${
                  activeCategory === category ? styles.activeTab : ""
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
        </div>
      </div>

      <div className={styles.searchFilterRow}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search dishes by name…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className={styles.searchButton}
          onClick={() => setSearchQuery(searchQuery.trim())}
        >
          Search
        </button>
        <div className={styles.nutrientFilters}>
          <input
            type="number"
            min="0"
            placeholder="Max Calories"
            className={styles.nutrientInput}
            value={nutrientFilter.calories}
            onChange={(e) =>
              setNutrientFilter((f) => ({ ...f, calories: e.target.value }))
            }
          />
          <input
            type="number"
            min="0"
            placeholder="Min Protein (g)"
            className={styles.nutrientInput}
            value={nutrientFilter.protein}
            onChange={(e) =>
              setNutrientFilter((f) => ({ ...f, protein: e.target.value }))
            }
          />
          <input
            type="number"
            min="0"
            placeholder="Max Carbs (g)"
            className={styles.nutrientInput}
            value={nutrientFilter.carbs}
            onChange={(e) =>
              setNutrientFilter((f) => ({ ...f, carbs: e.target.value }))
            }
          />
          <input
            type="number"
            min="0"
            placeholder="Max Fat (g)"
            className={styles.nutrientInput}
            value={nutrientFilter.fat}
            onChange={(e) =>
              setNutrientFilter((f) => ({ ...f, fat: e.target.value }))
            }
          />
        </div>
      </div>

      {/* Menu Items List */}
      <MenuItemsList
        items={filteredItems}
        selectedItems={selectedItems}
        onQuantityChange={handleQuantityChange}
        onAddToCart={handleAddToCart}
        restaurant={restaurant}
      />

      {/* Success Notification Modal */}
      {showSuccessModal && (
        <NotificationModal
          message={successMessage}
          onClose={() => setShowSuccessModal(false)}
        />
      )}

      {/* Confirmation Modal for Restaurant Change */}
      {showConfirmModal && (
        <ConfirmationModal
          title="Change Restaurant?"
          message={
            <>
              <p>
                Your cart contains items from another restaurant. Adding items
                from {restaurant.name} will clear your current cart.
              </p>
              <p>Would you like to continue?</p>
            </>
          }
          confirmText="Confirm"
          cancelText="Cancel"
          onConfirm={handleConfirmRestaurantChange}
          onCancel={handleCancelRestaurantChange}
        />
      )}
      {showPromotionModal && (
        <PromotionModal
          promotions={restaurant.promotions}
          onClose={() => setShowPromotionModal(false)}
        />
      )}

      {/* Contact Info Modal */}
      {showContactModal && restaurant && (
        <div className={styles.modalOverlay} onClick={closeContactModal}>
          <div
            className={styles.contactModal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>
                <FaInfoCircle className={styles.modalIcon} />
                <h3>Contact Information</h3>
              </div>
              <button
                className={styles.closeModalButton}
                onClick={closeContactModal}
              >
                ×
              </button>
            </div>
            <div className={styles.modalContent}>
              <div className={styles.contactCard}>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <FaPhone />
                  </div>
                  <div className={styles.contactText}>
                    <span className={styles.contactLabel}>Phone</span>
                    <span className={styles.contactValue}>
                      {restaurant.contactInfo?.phone || "Not available"}
                    </span>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <FaEnvelope />
                  </div>
                  <div className={styles.contactText}>
                    <span className={styles.contactLabel}>Email</span>
                    <span className={styles.contactValue}>
                      {restaurant.contactInfo?.email || "Not available"}
                    </span>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <FaMapMarkerAlt />
                  </div>
                  <div className={styles.contactText}>
                    <span className={styles.contactLabel}>Address</span>
                    <span className={styles.contactValue}>
                      {restaurant.address || "Not available"}
                    </span>
                  </div>
                </div>
                <div className={styles.contactHours}>
                  <div className={styles.sectionHeader}>
                    <FaClock className={styles.sectionIcon} />
                    <h4>Operating Hours</h4>
                  </div>
                  {restaurant.contactInfo?.hours ? (
                    <ul className={styles.hoursList}>
                      {restaurant.contactInfo.hours.map((hour, index) => (
                        <li key={index} className={styles.hourItem}>
                          <span>{hour}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className={styles.noHours}>Not available</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuDisplay;
