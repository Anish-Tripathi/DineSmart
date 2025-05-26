import React from 'react';
import styles from './Cart.module.css';

export default function Cart({
  onProceedToCheckout,
  restaurantDetails,
  cartData,
  total,
  deliveryCharges,
  dispatch
}) {
  if (!cartData || cartData.length === 0) {
    return (
      <div className={styles.emptyCartFullscreen}>
        <div className={styles.cartIcon}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#25a244" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        </div>
        <h2 className={styles.emptyTitle}>Your Cart is Empty</h2>
        <p className={styles.emptyMessage}>Add some delicious items to get started</p>
      </div>
    );
  }

  const handleRemoveItem = (index) => {
    dispatch({ type: "REMOVE", index: index });
  };

  return (
    <div className={styles.cartContainerFullscreen}>
      {/* Restaurant Details Header */}
      {restaurantDetails && (
        <div className={styles.restaurantInfoHeader}>
          <h2 className={styles.restaurantName}>{restaurantDetails.name}</h2>
          <div className={styles.restaurantMeta}>
            <span className={styles.restaurantAddress}>{restaurantDetails.address}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className={styles.cartHeader}>
        <h1 className={styles.cartTitle}>
          <svg className={styles.cartHeaderIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          Your Order Summary
        </h1>
        <span className={styles.itemCount}>
          {cartData.length} {cartData.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Main content */}
      <div className={styles.cartContent}>
        {/* Items list */}
        <div className={styles.cartItems}>
          <table className={styles.cartTable}>
            <thead className={styles.cartTableHeader}>
              <tr>
                <th className={`${styles.tableHeaderCell} ${styles.leftAlign}`}>#</th>
                <th className={`${styles.tableHeaderCell} ${styles.leftAlign}`}>Item</th>
                <th className={`${styles.tableHeaderCell} ${styles.centerAlign}`}>Qty</th>
                <th className={`${styles.tableHeaderCell} ${styles.centerAlign}`}>Size</th>
                <th className={`${styles.tableHeaderCell} ${styles.rightAlign}`}>Price</th>
                <th className={`${styles.tableHeaderCell} ${styles.centerAlign}`}>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartData.map((food, index) => (
                <tr key={index} className={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                  <td className={`${styles.tableCell} ${styles.leftAlign}`}>{index + 1}</td>
                  <td className={styles.tableCell}>
                    <div className={styles.foodItem}>
                      <span className={styles.foodName}>{food.name}</span>
                    </div>
                  </td>
                  <td className={`${styles.tableCell} ${styles.centerAlign}`}>{food.qty}</td>
                  <td className={`${styles.tableCell} ${styles.centerAlign}`}>{food.size}</td>
                  <td className={`${styles.tableCell} ${styles.rightAlign} ${styles.price}`}>₹{food.price.toFixed(2)}</td>
                  <td className={`${styles.tableCell} ${styles.centerAlign}`}>
                    <button 
                      onClick={() => handleRemoveItem(index)}
                      className={styles.removeButton}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order summary */}
        <div className={styles.orderSummary}>
          <div className={styles.summaryContent}>
            <div className={styles.summaryDetails}>
              <div className={styles.summaryLine}>Subtotal: <span className={styles.summaryValue}>₹{(total - deliveryCharges).toFixed(2)}</span></div>
              <div className={styles.summaryLine}>Delivery: <span className={styles.summaryValue}>₹{deliveryCharges.toFixed(2)}</span></div>
              <div className={styles.summaryTotal}>
                Total: <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
            <div className={styles.actionButtons}>
              <button className={styles.checkoutButton} onClick={onProceedToCheckout}>
                <svg className={styles.buttonIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 12v8H4v-8"></path>
                  <path d="M18 6l-6-6-6 6"></path>
                  <path d="M12 2v16"></path>
                </svg>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>

        {/* Security info */}
        <div className={styles.securityInfo}>
          <p>
            <svg className={styles.infoIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16v-4"></path>
              <path d="M12 8h.01"></path>
            </svg>
           Review your order and proceed to payment to complete your order.
          </p>
        </div>
      </div>
    </div>
  );
}