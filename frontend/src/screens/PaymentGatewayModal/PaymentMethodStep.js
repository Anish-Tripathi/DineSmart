import styles from "./PaymentGatewayModal.module.css";
import { CreditCard, Smartphone, IndianRupee, ChevronLeft } from "lucide-react";

export default function PaymentMethodStep({
  paymentMethod,
  setPaymentMethod,
  cardDetails,
  setCardDetails,
  upiId,
  setUpiId,
  totals,
  gstRate,
  appliedCoupon,
  restaurantPromotion,
  handleNextStep,
  handlePrevStep,
}) {
  const formatCardNumber = (input) => {
    const cleaned = input.replace(/\D/g, "");
    const groups = [];
    for (let i = 0; i < cleaned.length && i < 16; i += 4) {
      groups.push(cleaned.substring(i, i + 4));
    }
    return groups.join(" ");
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardDetails({ ...cardDetails, cardNumber: formatted });
  };

  const handleCardExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }
    setCardDetails({ ...cardDetails, expiry: value });
  };

  return (
    <>
      <div className={styles.stepContainer}>
        <div className={styles.stepHeading}>
          <div className={styles.stepIcon}>
            <CreditCard size={20} />
          </div>
          <h3>Payment Method</h3>
        </div>

        <div className={styles.paymentMethods}>
          <div className={styles.paymentMethodTabs}>
            <button
              className={`${styles.paymentMethodTab} ${
                paymentMethod === "card" ? styles.active : ""
              }`}
              onClick={() => setPaymentMethod("card")}
            >
              <span className={styles.methodIcon}>
                <CreditCard size={16} />
              </span>
              Card
            </button>
            <button
              className={`${styles.paymentMethodTab} ${
                paymentMethod === "upi" ? styles.active : ""
              }`}
              onClick={() => setPaymentMethod("upi")}
            >
              <span className={styles.methodIcon}>
                <Smartphone size={16} />
              </span>
              UPI
            </button>
            <button
              className={`${styles.paymentMethodTab} ${
                paymentMethod === "cod" ? styles.active : ""
              }`}
              onClick={() => setPaymentMethod("cod")}
            >
              <span className={styles.methodIcon}>
                <IndianRupee size={16} />
              </span>
              Cash
            </button>
          </div>
        </div>

        {/* Card Payment Form */}
        {paymentMethod === "card" && (
          <div className={styles.paymentForm}>
            <div className={styles.cardContainer}>
              <div className={styles.cardPreview}>
                <div className={styles.cardChip}></div>
                <div className={styles.cardNumber}>
                  {cardDetails.cardNumber || "•••• •••• •••• ••••"}
                </div>
                <div className={styles.cardInfo}>
                  <div className={styles.cardName}>
                    {cardDetails.name || "CARD HOLDER"}
                  </div>
                  <div className={styles.cardExpiry}>
                    {cardDetails.expiry || "MM/YY"}
                  </div>
                </div>
              </div>

              <div className={styles.cardForm}>
                <div className={styles.formGroup}>
                  <label>Card Number</label>
                  <input
                    type="text"
                    maxLength="19"
                    placeholder="1234 5678 9012 3456"
                    value={cardDetails.cardNumber}
                    onChange={handleCardNumberChange}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Cardholder Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={cardDetails.name}
                    onChange={(e) =>
                      setCardDetails({
                        ...cardDetails,
                        name: e.target.value,
                      })
                    }
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      maxLength="5"
                      value={cardDetails.expiry}
                      onChange={handleCardExpiryChange}
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      maxLength="3"
                      value={cardDetails.cvv}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          cvv: e.target.value.replace(/\D/g, ""),
                        })
                      }
                      className={styles.formInput}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* UPI Payment Form */}
        {paymentMethod === "upi" && (
          <div className={styles.paymentForm}>
            <div className={styles.upiContainer}>
              <div className={styles.upiIcons}>
                <Smartphone size={24} />
              </div>
              <div className={styles.formGroup}>
                <label>UPI ID</label>
                <input
                  type="text"
                  placeholder="username@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className={styles.formInput}
                />
              </div>
              <div className={styles.upiInfo}>
                Enter your UPI ID to make a secure payment directly from your
                bank account.
              </div>
            </div>
          </div>
        )}

        {/* Cash on Delivery */}
        {paymentMethod === "cod" && (
          <div className={styles.paymentForm}>
            <div className={styles.codContainer}>
              <IndianRupee size={32} />
              <h4>Cash on Delivery</h4>
              <p>Pay with cash when your order arrives at your doorstep.</p>
              <div className={styles.codNote}>
                <strong>Note:</strong> Please keep exact change ready for a
                smooth delivery experience.
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.billSummary}>
        <h4>Order Summary</h4>
        <div className={styles.summaryLine}>
          Item Total: <span>₹{totals.subtotal.toFixed(2)}</span>
        </div>
        {appliedCoupon && (
          <div className={styles.summaryDiscount}>
            Discount: <span>-₹{totals.discountAmount.toFixed(2)}</span>
          </div>
        )}
        {restaurantPromotion && (
          <div className={styles.summaryDiscount}>
            Restaurant Promo: <span>-₹{totals.promoDiscount.toFixed(2)}</span>
          </div>
        )}
        <div className={styles.summaryLine}>
          GST ({gstRate}%): <span>₹{totals.gstAmount.toFixed(2)}</span>
        </div>
        <div className={styles.summaryLine}>
          Delivery Fee: <span>₹{totals.deliveryCharges.toFixed(2)}</span>
        </div>
        <div className={styles.summaryTotal}>
          Total: <span>₹{totals.finalTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className={styles.stepActions}>
        <button className={styles.backButton} onClick={handlePrevStep}>
          <ChevronLeft size={16} /> Back
        </button>
        <button className={styles.primaryButton} onClick={handleNextStep}>
          Continue
        </button>
      </div>
    </>
  );
}
