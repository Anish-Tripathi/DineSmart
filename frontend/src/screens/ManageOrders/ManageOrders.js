import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  PackageCheck,
  Filter,
  Search,
  Loader2,
  AlertCircle,
  FileWarning,
} from "lucide-react";
import styles from "./ManageOrders.module.css";
import OrdersGrid from "./OrdersGrid";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const restaurantId = localStorage.getItem("currentRestaurantId");

        if (!restaurantId) {
          throw new Error(
            "No restaurant ID found. Please select a restaurant first."
          );
        }

        const response = await fetch(
          `${baseUrl}/api/restaurant-orders/${restaurantId}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch orders: ${response.statusText}`);
        }

        const data = await response.json();
        setOrders(data);
        setError(null);

        // Initialize time remaining for each order
        const times = {};
        const now = new Date();

        data.forEach((order) => {
          if (order.estimatedTime) {
            // Parse the estimated minutes (as number)
            const minsToAdd = parseInt(order.estimatedTime, 10);

            if (isNaN(minsToAdd)) {
              times[order._id] = "Unknown";
              return;
            }

            const estimatedTime = new Date(now);
            estimatedTime.setMinutes(estimatedTime.getMinutes() + minsToAdd);

            if (now > estimatedTime) {
              times[order._id] = "Delayed";
            } else {
              const diff = estimatedTime - now;
              const mins = Math.floor(diff / (1000 * 60));
              times[order._id] = `${mins} minutes`;
            }
          }
        });

        setTimeRemaining(times);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
    const interval = setInterval(() => {
      fetchOrders();
    }, 120000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Update time remaining every minute
    const interval = setInterval(() => {
      const now = new Date();
      const updatedTimes = {};

      orders.forEach((order) => {
        if (order.estimatedTime) {
          const [hours, minutes] = order.estimatedTime.split(":").map(Number);
          const estimatedTime = new Date();
          estimatedTime.setHours(hours, minutes, 0, 0);

          if (now > estimatedTime) {
            updatedTimes[order._id] = "Delayed";
          } else {
            const diff = estimatedTime - now;
            const mins = Math.floor((diff / (1000 * 60)) % 60);
            const hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
            updatedTimes[order._id] = `${hrs}h ${mins}m`;
          }
        }
      });

      setTimeRemaining(updatedTimes);
    }, 60000);

    return () => clearInterval(interval);
  }, [orders]);

  const confirmAndUpdateOrderStatus = (orderId, newStatus) => {
    toast(`Are you sure you want to mark this order as "${newStatus}"?`, {
      className: styles.whiteToast,
      action: {
        label: "Confirm",
        onClick: () => updateOrderStatus(orderId, newStatus),
        className: styles.actionButton,
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.dismiss(),
        className: styles.cancelButton,
      },
      duration: 10000,
      bodyClassName: styles.toastContainer,
    });
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setIsUpdating(true);

      const response = await fetch(`${baseUrl}/api/update-status/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update status: ${response.statusText}`);
      }

      const updatedOrder = await response.json();

      setOrders(
        orders.map((order) => (order._id === orderId ? updatedOrder : order))
      );

      if (selectedOrder?._id === orderId) {
        setSelectedOrder(updatedOrder);
      }

      toast.success("Order status updated successfully!");
    } catch (error) {
      setError(error.message);
      toast.error("Failed to update order status");
    } finally {
      setIsUpdating(false);
    }
  };

  const openOrderModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const filteredOrders = orders.filter((order) => {
    const statusMatch = filterStatus === "all" || order.status === filterStatus;
    const searchMatch =
      order.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.deliveryAddress.toLowerCase().includes(searchQuery.toLowerCase());

    return statusMatch && searchMatch;
  });

  if (loading && orders.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.backgroundOverlay}></div>
        <div className={styles.loading}>
          <Loader2 className={styles.spinner} size={32} />
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.backgroundOverlay}></div>
        <div className={styles.error}>
          <AlertCircle size={24} />
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.backgroundOverlay}></div>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <PackageCheck className={styles.titleIcon} />
          Order Management
        </h1>
        <div className={styles.headerStats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{orders.length}</span>
            <span className={styles.statLabel}>Total Orders</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>
              {orders.filter((o) => o.status === "pending").length}
            </span>
            <span className={styles.statLabel}>Pending</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>
              {orders.filter((o) => o.status === "preparing").length}
            </span>
            <span className={styles.statLabel}>Preparing</span>
          </div>
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchContainer}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by order ID, email, or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterContainer}>
          <Filter size={18} className={styles.filterIcon} />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="preparing">Preparing</option>
            <option value="out_for_delivery">Out for Delivery</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <OrdersGrid
        orders={filteredOrders}
        timeRemaining={timeRemaining}
        isUpdating={isUpdating}
        onOpenOrderModal={openOrderModal}
        onUpdateOrderStatus={confirmAndUpdateOrderStatus}
        getNextStatus={getNextStatus}
        showModal={showModal}
        selectedOrder={selectedOrder}
        closeModal={closeModal}
        setIsUpdating={setIsUpdating}
      />

      {filteredOrders.length === 0 && (
        <div className={styles.emptyState}>
          <FileWarning className={styles.emptyIcon} />
          <h3>No orders found</h3>
          <p>No orders match your current search criteria</p>
        </div>
      )}
    </div>
  );
};

const getNextStatus = (currentStatus) => {
  switch (currentStatus) {
    case "pending":
      return "confirmed";
    case "confirmed":
      return "preparing";
    case "preparing":
      return "out_for_delivery";
    case "out_for_delivery":
      return "delivered";
    default:
      return currentStatus;
  }
};

export default ManageOrders;
