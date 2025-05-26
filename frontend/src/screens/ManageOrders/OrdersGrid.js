import {
  Clock,
  Check,
  CookingPot,
  Bike,
  PackageCheck,
  X,
  Circle,
  Eye,
  ChevronRight,
  Loader2,
  Mail,
  MapPin,
  CreditCard,
  IndianRupee,
  Package,
} from "lucide-react";
import styles from "./ManageOrders.module.css";

const OrdersGrid = ({
  orders,
  timeRemaining,
  isUpdating,
  onOpenOrderModal,
  onUpdateOrderStatus,
  getNextStatus,
  showModal,
  selectedOrder,
  closeModal,
}) => {
  const formatDate = (dateString) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock size={16} />;
      case "confirmed":
        return <Check size={16} />;
      case "preparing":
        return <CookingPot size={16} />;
      case "out_for_delivery":
        return <Bike size={16} />;
      case "delivered":
        return <PackageCheck size={16} />;
      case "cancelled":
        return <X size={16} />;
      default:
        return <Circle size={16} />;
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return styles.statusPending;
      case "confirmed":
        return styles.statusConfirmed;
      case "preparing":
        return styles.statusPreparing;
      case "out_for_delivery":
        return styles.statusDelivery;
      case "delivered":
        return styles.statusDelivered;
      case "cancelled":
        return styles.statusCancelled;
      default:
        return styles.statusDefault;
    }
  };

  return (
    <>
      <div className={styles.ordersGrid}>
        {orders.map((order) => (
          <div key={order._id} className={styles.orderCard}>
            <div className={styles.cardHeader}>
              <div className={styles.orderInfo}>
                <span className={styles.orderId}>#{order._id.slice(-6)}</span>
                <span className={styles.orderTime}>
                  {formatDate(order.createdAt)}
                </span>
              </div>
              <div
                className={`${styles.statusBadge} ${getStatusBadgeClass(
                  order.status
                )}`}
              >
                {getStatusIcon(order.status)}
                <span>{order.status.replace(/_/g, " ")}</span>
              </div>
            </div>

            <div className={styles.cardContent}>
              <div className={styles.customerInfo}>
                <div className={styles.infoRow}>
                  <Mail size={14} />
                  <span>{order.userEmail}</span>
                </div>
                <div className={styles.infoRow}>
                  <MapPin size={14} />
                  <span>{order.deliveryAddress.substring(0, 40)}...</span>
                </div>
              </div>

              <div className={styles.orderMeta}>
                <div className={styles.amount}>
                  <IndianRupee size={16} />
                  <span>{order.totalAmount.toFixed(2)}</span>
                </div>
                <div className={styles.itemCount}>
                  {order.orderItems.length} items
                </div>
              </div>

              {order.estimatedTime && (
                <div className={styles.timeEstimate}>
                  <span>
                    {timeRemaining[order._id] === "Delayed" ? (
                      <span className={styles.delayed}>
                        Delayed: {order.estimatedTime}
                      </span>
                    ) : (
                      <span className={styles.estimateTime}>
                        Delivery in{" "}
                        {timeRemaining[order._id] || "calculating..."}
                      </span>
                    )}
                  </span>
                </div>
              )}
            </div>

            <div className={styles.cardActions}>
              <button
                onClick={() => onOpenOrderModal(order)}
                className={styles.viewButton}
              >
                <Eye size={16} />
                View Details
              </button>

              {order.status !== "delivered" && order.status !== "cancelled" && (
                <button
                  onClick={() =>
                    onUpdateOrderStatus(order._id, getNextStatus(order.status))
                  }
                  className={styles.nextStatusButton}
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <Loader2 className={styles.spinner} size={16} />
                  ) : (
                    <>
                      <ChevronRight size={16} />
                      {getNextStatus(order.status).replace(/_/g, " ")}
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && selectedOrder && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h2>Order #{selectedOrder._id.slice(-6)}</h2>
                <p className={styles.modalDate}>
                  {formatDate(selectedOrder.createdAt)}
                </p>
              </div>
              <div className={styles.modalActions}>
                {selectedOrder.status !== "delivered" &&
                  selectedOrder.status !== "cancelled" && (
                    <button
                      onClick={() =>
                        onUpdateOrderStatus(
                          selectedOrder._id,
                          getNextStatus(selectedOrder.status)
                        )
                      }
                      className={styles.modalUpdateButton}
                      disabled={isUpdating}
                    >
                      {isUpdating ? (
                        <Loader2 className={styles.spinner} size={16} />
                      ) : (
                        <>
                          Mark as{" "}
                          {getNextStatus(selectedOrder.status).replace(
                            /_/g,
                            " "
                          )}
                          <ChevronRight size={16} />
                        </>
                      )}
                    </button>
                  )}

                {selectedOrder.status !== "cancelled" && (
                  <button
                    onClick={() =>
                      onUpdateOrderStatus(selectedOrder._id, "cancelled")
                    }
                    className={styles.modalCancelButton}
                    disabled={isUpdating}
                  >
                    <X size={16} />
                    Cancel
                  </button>
                )}

                <button onClick={closeModal} className={styles.closeButton}>
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className={styles.modalContent}>
              <div className={styles.modalSection}>
                <h3>Customer Information</h3>
                <div className={styles.customerDetails}>
                  <div className={styles.detailRow}>
                    <Mail size={18} />
                    <div>
                      <label>Email</label>
                      <p>{selectedOrder.userEmail}</p>
                    </div>
                  </div>
                  <div className={styles.detailRow}>
                    <MapPin size={18} />
                    <div>
                      <label>Delivery Address</label>
                      <p>{selectedOrder.deliveryAddress}</p>
                    </div>
                  </div>
                  <div className={styles.detailRow}>
                    <CreditCard size={18} />
                    <div>
                      <label>Payment Method</label>
                      <p>
                        {selectedOrder.paymentMethod === "cod"
                          ? "Cash on Delivery"
                          : selectedOrder.paymentMethod.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.modalSection}>
                <h3>Order Items ({selectedOrder.orderItems.length})</h3>
                <div className={styles.itemsList}>
                  {selectedOrder.orderItems.map((item, index) => (
                    <div key={index} className={styles.orderItem}>
                      <div className={styles.itemImage}>
                        {item.img ? (
                          <img src={item.img} alt={item.name} />
                        ) : (
                          <div className={styles.imagePlaceholder}>
                            <Package size={20} />
                          </div>
                        )}
                      </div>
                      <div className={styles.itemInfo}>
                        <h4>{item.name}</h4>
                        <div className={styles.itemMeta}>
                          <span>Qty: {item.qty}</span>
                          {item.size && <span>Size: {item.size}</span>}
                        </div>
                      </div>
                      <div className={styles.itemPrice}>
                        <IndianRupee size={14} />
                        {(item.price * item.qty).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.modalSection}>
                <h3>Order Summary</h3>
                <div className={styles.summaryDetails}>
                  <div className={styles.summaryRow}>
                    <span>Items Total</span>
                    <span>
                      <IndianRupee size={14} />
                      {selectedOrder.itemsPrice.toFixed(2)}
                    </span>
                  </div>
                  {selectedOrder.discountAmount > 0 && (
                    <div className={styles.summaryRow}>
                      <span>Discount</span>
                      <span className={styles.discount}>
                        -<IndianRupee size={14} />
                        {selectedOrder.discountAmount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className={styles.summaryRow}>
                    <span>GST ({selectedOrder.gstRate}%)</span>
                    <span>
                      <IndianRupee size={14} />
                      {selectedOrder.taxPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span>Delivery Charges</span>
                    <span>
                      <IndianRupee size={14} />
                      {selectedOrder.deliveryCharges.toFixed(2)}
                    </span>
                  </div>
                  <div className={styles.summaryTotal}>
                    <span>Total Amount</span>
                    <span>
                      <IndianRupee size={16} />
                      {selectedOrder.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {selectedOrder.deliveryMessage && (
                <div className={styles.modalSection}>
                  <h3>Special Instructions</h3>
                  <p className={styles.deliveryMessage}>
                    {selectedOrder.deliveryMessage}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrdersGrid;
