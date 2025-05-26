import React, { useState, useEffect } from "react";
import styles from "./TrackOrder.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MapPin,
  Clock,
  ChefHat,
  Package,
  Bike,
  CheckCircle,
  CookingPot,
  Phone,
  Mail,
  User,
  AlertCircle,
} from "lucide-react";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

const statusToStep = {
  pending: 0,
  confirmed: 1,
  preparing: 1,
  out_for_delivery: 2,
  delivered: 3,
  cancelled: -1,
};

const TrackOrder = () => {
  const location = useLocation();
  const { order } = location.state || {};
  const navigate = useNavigate();

  const [deliveryTime, setDeliveryTime] = useState(order?.estimatedTime || 30);
  const currentStep = statusToStep[order?.status] || 0;
  const [restaurant, setRestaurant] = useState(null);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    if (!order) {
      navigate("/my-orders");
      return;
    }

    if (deliveryTime > 0 && currentStep < 3) {
      const timer = setTimeout(() => {
        setDeliveryTime((prevTime) => prevTime - 1);
      }, 60000);

      return () => clearTimeout(timer);
    }
  }, [deliveryTime, currentStep, order, navigate]);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const getStatusIcon = () => {
    switch (order?.status) {
      case "preparing":
        return <CookingPot size={25} />;
      case "out_for_delivery":
        return <Bike size={25} />;
      case "delivered":
        return <CheckCircle size={25} />;
      default:
        return <Package size={25} />;
    }
  };

  useEffect(() => {
    console.log(order);
    const fetchRestaurant = async () => {
      if (!order?.restaurant?._id) {
        console.log("id not found");
        return;
      }

      try {
        const res = await fetch(
          `${baseUrl}/api/bookings/${order?.restaurant?._id}`
        );
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setRestaurant(data);
        } else {
          console.error("Failed to fetch restaurant:", data.message);
        }
      } catch (err) {
        console.error("Error fetching restaurant:", err.message);
      }
    };

    fetchRestaurant();
  }, [order?.restaurant?._id]);

  if (!order) {
    return null; // Will be redirected anyway
  }

  return (
    <div className={styles.trackOrderContainer}>
      <div className={styles.backgroundOverlay}></div>
      <div className={styles.orderHeader}>
        <h1 className={styles.title}>
          <span className={styles.titleIcon}>{getStatusIcon()}</span>
          Track Your Order
        </h1>
        <div className={styles.orderNumber}>
          <span>ORDER #{order._id.substring(0, 8).toUpperCase()}</span>
          <span className={styles.currentTime}>{getCurrentTime()}</span>
        </div>
      </div>

      <div className={styles.progressContainer}>
        {["Order Placed", "Preparing", "Out for Delivery", "Delivered"].map(
          (step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const stepClass = isCompleted
              ? `${styles.step} ${styles.completedStep}`
              : isActive
              ? `${styles.step} ${styles.activeStep}`
              : styles.step;

            return (
              <div key={index} className={stepClass}>
                <div className={styles.stepContent}>
                  <div className={styles.circle}>
                    {isCompleted ? (
                      <span className={styles.checkmark}>✓</span>
                    ) : (
                      index + 1
                    )}
                  </div>
                  <p className={styles.label}>{step}</p>
                </div>
                {index !== 3 && <div className={styles.bar}></div>}
              </div>
            );
          }
        )}
      </div>

      <div className={styles.orderPanels}>
        <div className={styles.orderSummary}>
          <h2>Order Summary</h2>
          <div className={styles.summaryItem}>
            <span className={styles.itemLabel}>Ordered on:</span>
            <span className={styles.itemValue}>
              {formatDate(order.orderDate)}
            </span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.itemLabel}>Payment Method:</span>
            <span className={styles.itemValue}>
              {order.paymentMethod === "card"
                ? "Credit Card"
                : order.paymentMethod === "upi"
                ? "UPI"
                : "Cash on Delivery"}
            </span>
          </div>
          <div className={styles.summaryDivider}></div>
          <div className={styles.orderItems}>
            {order.items.map((item, index) => (
              <div key={index} className={styles.item}>
                <span className={styles.itemQuantity}>{item.qty}×</span>
                <span className={styles.itemName}>{item.name}</span>
                <span className={styles.itemPrice}>
                  ₹{item.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className={styles.summaryDivider}></div>
          <div className={styles.totalContainer}>
            <div className={styles.totalItem}>
              <span>Subtotal:</span>
              <span>₹{order.itemsPrice?.toFixed(2) || "0.00"}</span>
            </div>
            {order.discountAmount > 0 && (
              <div className={styles.totalItem}>
                <span>Discount:</span>
                <span>-₹{order.discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className={styles.totalItem}>
              <span>Delivery Fee:</span>
              <span>
                {order.deliveryCharges === 0
                  ? "FREE"
                  : `₹${order.deliveryCharges?.toFixed(2) || "0.00"}`}
              </span>
            </div>
            <div className={`${styles.totalItem} ${styles.total}`}>
              <span>Total:</span>
              <span>₹{order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className={styles.deliveryInfo}>
          <h2>Delivery Details</h2>
          <div className={styles.infoContainer}>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <MapPin size={20} />
              </div>
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>Delivery Address: </span>
                <span className={styles.infoValue}>
                  {order.deliveryAddress}
                </span>
              </div>
            </div>
            <div className={styles.infoDivider}></div>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <Clock size={20} />
              </div>
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>Estimated Delivery: </span>
                <span className={styles.infoValue}>
                  {order.status === "delivered"
                    ? "Delivered"
                    : order.estimatedTime
                    ? `${order.estimatedTime} minutes`
                    : "Calculating..."}
                </span>
              </div>
            </div>
            <div className={styles.infoDivider}></div>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <ChefHat size={20} />
              </div>
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>Restaurant: </span>
                <span className={styles.infoValue}>
                  {order.restaurant?.name || "Unknown"}
                </span>
              </div>
            </div>
          </div>
          <button
            className={styles.contactButton}
            onClick={() => setShowContact((prev) => !prev)}
          >
            {showContact ? "Hide Contact Info" : "Contact Restaurant"}
          </button>

          {showContact && restaurant && (
            <div className={styles.contactBox}>
              <h3 className={styles.contactHeader}>Contact Restaurant</h3>

              <div className={styles.contactRow}>
                <Phone size={18} color="#16a34a" />
                <span>{restaurant.contactInfo?.phone || "N/A"}</span>
              </div>

              <div className={styles.contactRow}>
                <Mail size={18} color="#16a34a" />
                <span>{restaurant.contactInfo?.email || "N/A"}</span>
              </div>

              <div className={styles.contactRow}>
                <User size={18} color="#16a34a" />
                <span>{restaurant.contactInfo?.manager || "N/A"}</span>
              </div>

              <div className={styles.contactRow}>
                <AlertCircle size={18} color="#16a34a" />
                <span>{restaurant.contactInfo?.emergencyContact || "N/A"}</span>
              </div>

              {restaurant.contactInfo?.hours && (
                <div className={styles.contactRow}>
                  <Clock size={18} color="#16a34a" />
                  <div>
                    <strong>Hours:</strong>
                    <ul className={styles.hoursList}>
                      {restaurant.contactInfo.hours.map((hour, index) => (
                        <li key={index}>{hour}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
