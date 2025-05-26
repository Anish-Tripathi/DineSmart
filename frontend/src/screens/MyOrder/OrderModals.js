import React from "react";
import { Receipt, X } from "lucide-react";
import styles from "./MyOrder.module.css";

export default function OrderModals({
  modalType,
  selectedOrder,
  closeModal,
  handleViewReceipt,
  receiptRef,
  handleDownloadReceipt,
  formatDate,
}) {
  if (!modalType || !selectedOrder) return null;

  if (modalType === "details") {
    return (
      <div className={styles.modalOverlay} onClick={closeModal}>
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.modalHeader}>
            <h2>Order Details</h2>
            <button className={styles.closeButton} onClick={closeModal}>
              ×
            </button>
          </div>
          <div className={styles.modalBody}>
            <div className={styles.orderInfo}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Order ID:</span>
                <span className={styles.infoValue}>{selectedOrder._id}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Date:</span>
                <span className={styles.infoValue}>
                  {formatDate(selectedOrder.orderDate)}
                </span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Address:</span>
                <span className={styles.infoValue}>
                  {selectedOrder.deliveryAddress}
                </span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Payment:</span>
                <span className={styles.infoValue}>
                  {selectedOrder.paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : selectedOrder.paymentMethod}
                </span>
              </div>
              {selectedOrder.transactionId && (
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Transaction ID:</span>
                  <span className={styles.infoValue}>
                    {selectedOrder.transactionId}
                  </span>
                </div>
              )}
            </div>
            <div className={styles.itemsList}>
              <h3>Ordered Items</h3>
              {selectedOrder.items.map((item, index) => (
                <div key={index} className={styles.orderItem}>
                  <div className={styles.itemImageContainer}>
                    {item.img && (
                      <img
                        src={item.img}
                        alt={item.name}
                        className={styles.itemImage}
                      />
                    )}
                  </div>
                  <div className={styles.itemDetails}>
                    <h4>{item.name}</h4>
                    {item.size && (
                      <span className={styles.itemSize}>Size: {item.size}</span>
                    )}
                    <div className={styles.itemPricing}>
                      <span>× {item.qty}</span>
                      <span className={styles.itemTotal}>
                        ₹{item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.orderSummary}>
              <h3>Order Summary</h3>
              <div className={styles.summaryRow}>
                <span>Items Total</span>
                <span>₹{selectedOrder.itemsPrice?.toFixed(2) || "0.00"}</span>
              </div>
              {selectedOrder.appliedCoupon &&
                selectedOrder.discountAmount > 0 && (
                  <div className={styles.summaryRow}>
                    <span>Discount ({selectedOrder.appliedCoupon.code})</span>
                    <span className={styles.discountAmount}>
                      -₹{selectedOrder.discountAmount.toFixed(2)}
                    </span>
                  </div>
                )}
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>
                  ₹
                  {(
                    (selectedOrder.itemsPrice || 0) -
                    (selectedOrder.discountAmount || 0)
                  ).toFixed(2)}
                </span>
              </div>
              {selectedOrder.taxPrice && (
                <div className={styles.summaryRow}>
                  <span>GST ({selectedOrder.gstRate || 5}%)</span>
                  <span>₹{selectedOrder.taxPrice.toFixed(2)}</span>
                </div>
              )}
              <div className={styles.summaryRow}>
                <span>Delivery Charges</span>
                <span>
                  {selectedOrder.isFreeDelivery ||
                  selectedOrder.deliveryCharges === 0
                    ? "FREE"
                    : `₹${selectedOrder.deliveryCharges?.toFixed(2) || "0.00"}`}
                </span>
              </div>
              {selectedOrder.isFreeDelivery && (
                <div className={styles.freeDeliveryMessage}>
                  Free delivery applied on orders above ₹500
                </div>
              )}
              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>Total Amount</span>
                <span>₹{selectedOrder.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className={styles.modalFooter}>
            <button className={styles.modalButton} onClick={closeModal}>
              Close
            </button>
            <button
              className={`${styles.modalButton} ${styles.receiptButton}`}
              onClick={() => {
                closeModal();
                handleViewReceipt(selectedOrder);
              }}
            >
              <Receipt size={16} />
              View Receipt
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Receipt Modal
  if (modalType === "receipt")
    return (
      <div className={styles.modalOverlay} onClick={closeModal}>
        <div
          className={`${styles.modalContent} ${styles.receiptModal}`}
          onClick={(e) => e.stopPropagation()}
          ref={receiptRef}
        >
          <div className={`${styles.modalHeader} no-print`}>
            <h2>Order Receipt</h2>
            <button className={styles.closeButton} onClick={closeModal}>
              <X size={20} />
            </button>
          </div>
          <div className={styles.receiptContent}>
            <div className={styles.receiptHeader}>
              <h3>{selectedOrder.restaurant.name}</h3>
              <p>Receipt #{selectedOrder._id.substring(0, 8)}</p>
              <p className={styles.receiptDate}>
                {formatDate(selectedOrder.orderDate)}
              </p>
            </div>
            <div className={styles.receiptDivider}></div>
            <div className={styles.receiptItems}>
              <div className={styles.receiptItemHeader}>
                <span>Item</span>
                <span>Qty</span>
                <span>Price</span>
              </div>
              {selectedOrder.items.map((item, index) => (
                <div key={index} className={styles.receiptItem}>
                  <div>
                    <p>{item.name}</p>
                    {item.size && (
                      <span className={styles.itemSize}>{item.size}</span>
                    )}
                  </div>
                  <span>{item.qty}</span>
                  <span>₹{item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className={styles.receiptDivider}></div>
            <div className={styles.receiptSummary}>
              <div className={styles.receiptSummaryRow}>
                <span>Items Total</span>
                <span>₹{selectedOrder.itemsPrice?.toFixed(2) || "0.00"}</span>
              </div>
              {selectedOrder.appliedCoupon &&
                selectedOrder.discountAmount > 0 && (
                  <div className={styles.receiptSummaryRow}>
                    <span>Discount ({selectedOrder.appliedCoupon.code})</span>
                    <span>-₹{selectedOrder.discountAmount.toFixed(2)}</span>
                  </div>
                )}
              <div className={styles.receiptSummaryRow}>
                <span>Subtotal</span>
                <span>
                  ₹
                  {(
                    (selectedOrder.itemsPrice || 0) -
                    (selectedOrder.discountAmount || 0)
                  ).toFixed(2)}
                </span>
              </div>
              {selectedOrder.taxPrice && (
                <div className={styles.receiptSummaryRow}>
                  <span>GST ({selectedOrder.gstRate || 5}%)</span>
                  <span>₹{selectedOrder.taxPrice.toFixed(2)}</span>
                </div>
              )}
              <div className={styles.receiptSummaryRow}>
                <span>Delivery Charges</span>
                <span>
                  {selectedOrder.isFreeDelivery ||
                  selectedOrder.deliveryCharges === 0
                    ? "FREE"
                    : `₹${selectedOrder.deliveryCharges?.toFixed(2) || "0.00"}`}
                </span>
              </div>
              <div
                className={`${styles.receiptSummaryRow} ${styles.receiptTotal}`}
              >
                <span>Total</span>
                <span>₹{selectedOrder.totalAmount.toFixed(2)}</span>
              </div>
              <div className={styles.paymentInfo}>
                <span>Payment Method:</span>
                <span className={styles.infoValue}>
                  {selectedOrder.paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : selectedOrder.paymentMethod}
                </span>
              </div>
              {selectedOrder.transactionId && (
                <div className={styles.paymentInfo}>
                  <span>Transaction ID:</span>
                  <span>{selectedOrder.transactionId}</span>
                </div>
              )}
            </div>
            <div className={styles.receiptFooter}>
              <p>Thank you for your order!</p>
              <p>For any issues, please contact customer support</p>
            </div>
          </div>
          <div className={`${styles.modalFooter} no-print`}>
            <button className={styles.modalButton} onClick={closeModal}>
              Close
            </button>
            <button
              className={`${styles.modalButton} ${styles.primaryButton}`}
              onClick={handleDownloadReceipt}
            >
              Print Receipt
            </button>
          </div>
        </div>
      </div>
    );
}
