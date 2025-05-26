import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import styles from "./MyOrder.module.css";
import OrderModals from "./OrderModals";
const baseUrl = process.env.REACT_APP_API_BASE_URL;
console.log(process.env);

const statusIcons = {
  pending: <span className={styles.pending}>●</span>,
  confirmed: <span className={styles.confirmed}>●</span>,
  preparing: <span className={styles.preparing}>●</span>,
  out_for_delivery: <span className={styles.outForDelivery}>●</span>,
  delivered: <span className={styles.delivered}>●</span>,
  cancelled: <span className={styles.cancelled}>●</span>,
};

const statusLabels = {
  pending: "Pending",
  confirmed: "Confirmed",
  preparing: "Preparing",
  out_for_delivery: "On the way",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export default function MyOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalType, setModalType] = useState(""); // "details" or "receipt"
  const receiptRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail");
        if (!userEmail) {
          navigate("/login");
          return;
        }

        console.log(baseUrl);
        const response = await fetch(`${baseUrl}/api/user-orders/${userEmail}`);
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [navigate]);

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

  const calculateItemsCount = (items) =>
    items.reduce((total, item) => total + item.qty, 0);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setModalType("details");
  };

  const handleViewReceipt = (order) => {
    setSelectedOrder(order);
    setModalType("receipt");
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setModalType("");
  };

  const handleDownloadReceipt = () => {
    if (receiptRef.current) {
      const printWindow = window.open("", "_blank");
      const printContents = receiptRef.current.innerHTML;
      const stylesheets = Array.from(
        document.querySelectorAll('style, link[rel="stylesheet"]')
      )
        .map((el) => el.outerHTML)
        .join("");
      printWindow.document.write(`
      <html>
        <head>
          <title>Receipt #${selectedOrder._id.substring(0, 8)}</title>
          ${stylesheets}
          <style>
            @media print {
              body { background: white !important; color: black !important; }
              .no-print { display: none !important; }
            }
          </style>
        </head>
        <body>
          ${printContents}
          <script>
            setTimeout(function() {
              window.print();
              setTimeout(function() { window.close(); }, 100);
            }, 100);
          </script>
        </body>
      </html>
    `);
      printWindow.document.close();
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorText}>Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className={styles.retryButton}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.backgroundOverlay}></div>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <ShoppingBag size={28} className={styles.headerIcon} />
          <h1>My Orders</h1>
        </div>
        <p className={styles.subtitle}>Your recent food adventures</p>
      </div>

      {orders.length === 0 ? (
        <div className={styles.emptyState}>
          <h2>No orders yet</h2>
          <p>Your delicious meals will appear here once you order</p>
          <button onClick={() => navigate("/")} className={styles.orderButton}>
            Browse Restaurants
          </button>
        </div>
      ) : (
        <div className={styles.ordersList}>
          {orders.map((order) => (
            <div key={order._id} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <div className={styles.restaurantInfo}>
                  <img
                    src={order.restaurant.image}
                    alt={order.restaurant.name}
                    className={styles.restaurantImage}
                  />
                  <div>
                    <h3 className={styles.restaurantName}>
                      {order.restaurant.name}
                    </h3>
                    <div className={styles.orderStatus}>
                      {statusIcons[order.status]}
                      <span>{statusLabels[order.status]}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.orderDetails}>
                <div className={styles.detailRow}>
                  <span>{formatDate(order.orderDate)}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>{calculateItemsCount(order.items)} items</span>
                </div>
                <div className={styles.detailRow}>
                  <span>{order.deliveryAddress}</span>
                </div>
              </div>
              <div className={styles.orderFooter}>
                <div className={styles.priceContainer}>
                  <span className={styles.totalLabel}>Total:</span>
                  <span className={styles.totalAmount}>
                    ₹{order.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className={styles.orderActions}>
                <button
                  className={styles.actionButton}
                  onClick={() => handleViewDetails(order)}
                  title="View full details"
                >
                  Details
                </button>
                <button
                  className={styles.actionButton}
                  onClick={() => handleViewReceipt(order)}
                  title="View receipt"
                >
                  Receipt
                </button>
                <button
                  className={`${styles.actionButton} ${styles.primaryButton}`}
                  onClick={() => navigate("/track-order", { state: { order } })}
                  title="Track your order"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <OrderModals
        modalType={modalType}
        selectedOrder={selectedOrder}
        closeModal={closeModal}
        handleViewReceipt={handleViewReceipt}
        receiptRef={receiptRef}
        handleDownloadReceipt={handleDownloadReceipt}
        formatDate={formatDate}
      />
    </div>
  );
}
