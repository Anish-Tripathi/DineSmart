import React, { useEffect, useRef, useState } from "react";
import styles from "./PaymentGatewayModal.module.css";
import { X, Check, Clock, Printer } from "lucide-react";
import DeliveryDetailsStep from "./DeliveryDetailsStep";
import PaymentMethodStep from "./PaymentMethodStep";
import OrderConfirmationStep from "./OrderConfirmationStep";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function PaymentGatewayModal({
  show,
  onClose,
  cartData,
  restaurantDetails,
  deliveryCharges,
  dispatch,
}) {
  const [step, setStep] = useState("details");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isPaying, setIsPaying] = useState(false);
  const [, setTransactionId] = useState("");
  const [, setOrderId] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [editAddress, setEditAddress] = useState(false);
  const [, setUserInfo] = useState({});
  const [estimatedTime, setEstimatedTime] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [upiId, setUpiId] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [receiptData, setReceiptData] = useState(null);

  // Restaurant promotion state
  const [restaurantPromotion, setRestaurantPromotion] = useState(null);
  const [promotionError, setPromotionError] = useState("");

  const addressRef = useRef();
  const receiptRef = useRef(null);

  // Available generic coupons
  const availableCoupons = [
    {
      code: "WELCOME20",
      discount: 20,
      type: "percent",
      maxDiscount: 100,
      minOrder: 299,
    },
    { code: "FLAT50", discount: 50, type: "flat", minOrder: 500 },
    {
      code: "SPECIAL25",
      discount: 25,
      type: "percent",
      maxDiscount: 200,
      minOrder: 400,
    },
  ];

  // Restaurant-specific promotions (validated for isActive and date)
  const validPromotions = (restaurantDetails?.promotions || []).filter(
    (promo) => {
      const now = Date.now();
      return (
        promo.isActive &&
        new Date(promo.validFrom).getTime() <= now &&
        new Date(promo.validUntil).getTime() >= now
      );
    }
  );

  // GST rate
  const gstRate = 5; // 5% GST

  // Calculate GST, discounts, and final total
  const calculateTotal = () => {
    // Subtotal before GST, coupon, promotion, delivery
    const subtotal = cartData.reduce((sum, item) => sum + item.price, 0);

    // --------- Coupon Discount ---------
    let discountAmount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.type === "percent") {
        discountAmount = (subtotal * appliedCoupon.discount) / 100;
        if (
          appliedCoupon.maxDiscount &&
          discountAmount > appliedCoupon.maxDiscount
        ) {
          discountAmount = appliedCoupon.maxDiscount;
        }
      } else {
        discountAmount = appliedCoupon.discount;
      }
    }
    // Subtotal after coupon
    let discountedSubtotal = subtotal - discountAmount;

    // --------- Promotion Discount ---------
    let promoDiscount = 0;
    if (restaurantPromotion) {
      if (discountedSubtotal >= restaurantPromotion.minOrderAmount) {
        if (restaurantPromotion.discountType === "percentage") {
          promoDiscount =
            (discountedSubtotal * restaurantPromotion.discountValue) / 100;
        } else {
          promoDiscount = restaurantPromotion.discountValue;
        }
      }
    }
    discountedSubtotal -= promoDiscount;

    // --------- GST ---------
    const gstAmount = (discountedSubtotal * gstRate) / 100;

    // --------- Delivery ---------
    const amountBeforeDelivery = discountedSubtotal + gstAmount;
    let finalDeliveryCharges =
      amountBeforeDelivery >= 500 ? 0 : deliveryCharges;
    let deliveryMessage =
      amountBeforeDelivery >= 500
        ? "You are eligible for free delivery!"
        : `Add ₹${(500 - amountBeforeDelivery).toFixed(
            2
          )} more to get free delivery`;

    // --------- Final Total ---------
    const finalTotal = amountBeforeDelivery + finalDeliveryCharges;

    return {
      subtotal,
      discountAmount,
      promoDiscount,
      discountedSubtotal,
      gstAmount,
      deliveryCharges: finalDeliveryCharges,
      deliveryMessage,
      finalTotal,
    };
  };

  const totals = calculateTotal();

  useEffect(() => {
    if (show) {
      setStep("details");
      setIsPaying(false);
      setPaymentMethod("card");
      setTransactionId("");
      setOrderId("");
      setEstimatedTime("");
      setEditAddress(false);
      setCouponCode("");
      setAppliedCoupon(null);
      setCouponError("");
      setRestaurantPromotion(null);
      setPromotionError("");
      fetchUserInfo();
    }
  }, [show]);

  // Fetch user info with auth token
  const fetchUserInfo = async () => {
    const userId = localStorage.getItem("userId");
    const authToken = localStorage.getItem("authToken");
    if (!userId) return;
    try {
      const res = await fetch(`${baseUrl}/api/auth/users/${userId}`, {
        headers: {
          "auth-token": authToken,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setUserInfo(data);
        setDeliveryAddress(data.address || "");
      }
    } catch (err) {
      setUserInfo({});
      setDeliveryAddress("");
    }
  };

  // Coupon logic
  const handleApplyCoupon = () => {
    setCouponError("");
    const coupon = availableCoupons.find(
      (c) => c.code === couponCode.trim().toUpperCase()
    );
    if (!coupon) {
      setCouponError("Invalid coupon code");
      return;
    }
    if (coupon.minOrder && totals.subtotal < coupon.minOrder) {
      setCouponError(`Minimum order of ₹${coupon.minOrder} required`);
      return;
    }
    setAppliedCoupon(coupon);
    setCouponError("");
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  // Promotion logic
  const handleApplyPromotion = (promoCode) => {
    setPromotionError("");
    const promo = validPromotions.find((p) => p.code === promoCode);
    if (!promo) {
      setPromotionError("Invalid or expired promotion code");
      return;
    }
    // Check min order after generic coupon
    const subtotalAfterCoupon = totals.subtotal - totals.discountAmount;
    if (promo.minOrderAmount && subtotalAfterCoupon < promo.minOrderAmount) {
      setPromotionError(
        `Minimum order of ₹${promo.minOrderAmount} required for this promotion`
      );
      return;
    }
    setRestaurantPromotion(promo);
    setPromotionError("");
  };

  const handleRemovePromotion = () => {
    setRestaurantPromotion(null);
    setPromotionError("");
  };

  // Steps
  const handleNextStep = () => {
    if (step === "details") {
      if (!deliveryAddress.trim()) {
        alert("Please provide a delivery address");
        return;
      }
      setStep("payment");
    } else if (step === "payment") {
      if (paymentMethod === "card") {
        if (!validateCardDetails()) {
          return;
        }
      } else if (paymentMethod === "upi" && !upiId.trim()) {
        alert("Please enter a valid UPI ID");
        return;
      }
      setStep("confirmation");
    } else if (step === "confirmation") {
      handlePay();
    }
  };

  const handlePrevStep = () => {
    if (step === "payment") {
      setStep("details");
    } else if (step === "confirmation") {
      setStep("payment");
    }
  };

  // Card validation
  const validateCardDetails = () => {
    if (cardDetails.cardNumber.replace(/\s/g, "").length !== 16) {
      alert("Please enter a valid 16-digit card number");
      return false;
    }
    if (!cardDetails.name.trim()) {
      alert("Please enter the cardholder name");
      return false;
    }
    if (!cardDetails.expiry.match(/^\d{2}\/\d{2}$/)) {
      alert("Please enter expiry date in MM/YY format");
      return false;
    }
    if (cardDetails.cvv.length !== 3) {
      alert("Please enter a valid 3-digit CVV");
      return false;
    }
    return true;
  };

  // Payment flow
  const handlePay = async () => {
    setIsPaying(true);
    try {
      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) {
        alert("Please login to place an order");
        setIsPaying(false);
        return;
      }
      if (!userEmail.includes("@")) {
        throw new Error("Valid email is required");
      }
      const orderData = cartData.map((item) => ({
        name: item.name,
        qty: item.qty,
        size: item.size,
        price: item.price,
        img: item.img,
      }));
      if (!cartData[0]?.restaurantId) {
        alert("Invalid restaurant information");
        setIsPaying(false);
        return;
      }

      const payload = {
        order_data: orderData,
        email: userEmail,
        restaurantId: cartData[0].restaurantId,
        deliveryAddress: deliveryAddress,
        paymentMethod: paymentMethod,
        appliedCoupon: appliedCoupon
          ? {
              code: appliedCoupon.code,
              discount: appliedCoupon.discount,
              type: appliedCoupon.type,
              maxDiscount: appliedCoupon.maxDiscount,
              minOrder: appliedCoupon.minOrder,
            }
          : null,
        restaurantPromotion: restaurantPromotion
          ? {
              code: restaurantPromotion.code,
              discountType: restaurantPromotion.discountType,
              discountValue: restaurantPromotion.discountValue,
              minOrderAmount: restaurantPromotion.minOrderAmount,
              description: restaurantPromotion.description,
            }
          : null,
        gstRate: gstRate || 0,
        totalAmount: totals.finalTotal,
      };

      const response = await fetch(`${baseUrl}/api/orderData`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Checkout failed");
      }

      setTransactionId(responseData.transactionId);
      setOrderId(responseData.orderId);
      setEstimatedTime(responseData.estimatedTime);

      setReceiptData({
        restaurantDetails: {
          name: cartData[0]?.restaurantDetails?.name || restaurantDetails?.name,
          address:
            cartData[0]?.restaurantDetails?.address ||
            restaurantDetails?.address,
          phone:
            cartData[0]?.restaurantDetails?.contactInfo?.phone ||
            restaurantDetails?.contactInfo?.phone,
        },
        cartData: [...cartData],
        deliveryAddress,
        totals: calculateTotal(),
        appliedCoupon,
        restaurantPromotion,
        gstRate,
        deliveryCharges,
        paymentMethod,
        orderId: responseData.orderId,
        transactionId: responseData.transactionId,
        estimatedTime: responseData.estimatedTime,
      });
      setStep("receipt");
      setTimeout(() => {
        receiptRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);

      dispatch({ type: "DROP" });
    } catch (error) {
      console.error("Checkout error:", error);
      alert(`Checkout failed: ${error.message}`);
    } finally {
      setIsPaying(false);
    }
  };

  // Address edit/save
  const handleEditAddress = () => setEditAddress(true);

  const handleSaveAddress = () => {
    if (!addressRef.current.value.trim()) {
      alert("Please enter a valid address");
      return;
    }
    setDeliveryAddress(addressRef.current.value);
    setEditAddress(false);
  };

  // Print receipt
  const handleDownloadReceipt = () => {
    if (receiptRef.current) {
      const printWindow = window.open("", "_blank");
      const printContents = receiptRef.current.innerHTML;
      const styles = Array.from(
        document.querySelectorAll('style, link[rel="stylesheet"]')
      )
        .map((el) => el.outerHTML)
        .join("");
      printWindow.document.write(`
      <html>
        <head>
          <title>Receipt</title>
          ${styles}
          <style>
            @media print {
              body { 
                padding: 20px;
                font-family: Arial, sans-serif;
              }
              .no-print { display: none !important; }
              .receiptContainer { 
                max-width: 100%; 
                box-shadow: none; 
                border: none;
              }
            }
          </style>
        </head>
        <body>
          ${printContents}
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                setTimeout(function() {
                  window.close();
                }, 100);
              }, 100);
            };
          </script>
        </body>
      </html>
    `);

      printWindow.document.close();
    }
  };

  if (!show) return null;

  // Props shared across steps
  const commonProps = {
    totals,
    gstRate,
    deliveryCharges,
    appliedCoupon,
    restaurantPromotion,
    handleNextStep,
    handlePrevStep,
    isPaying,
  };

  return (
    <div className={styles.paymentModalOverlay}>
      <div className={styles.paymentModal}>
        <button
          className={styles.modalClose}
          onClick={onClose}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Progress Steps */}
        {step !== "receipt" && (
          <div className={styles.progressSteps}>
            <div
              className={`${styles.progressStep} ${
                step === "details"
                  ? styles.active
                  : step === "payment" || step === "confirmation"
                  ? styles.completed
                  : ""
              }`}
            >
              <div className={styles.stepCircle}>1</div>
              <div className={styles.stepLabel}>Details</div>
            </div>
            <div className={styles.progressLine}></div>
            <div
              className={`${styles.progressStep} ${
                step === "payment"
                  ? styles.active
                  : step === "confirmation"
                  ? styles.completed
                  : ""
              }`}
            >
              <div className={styles.stepCircle}>2</div>
              <div className={styles.stepLabel}>Payment</div>
            </div>
            <div className={styles.progressLine}></div>
            <div
              className={`${styles.progressStep} ${
                step === "confirmation" ? styles.active : ""
              }`}
            >
              <div className={styles.stepCircle}>3</div>
              <div className={styles.stepLabel}>Confirm</div>
            </div>
          </div>
        )}

        {/* Restaurant Title - shown in all steps */}
        <h2 className={styles.gatewayTitle}>
          {restaurantDetails?.name && (
            <span className={styles.gatewayRestaurant}>
              {restaurantDetails.name}
            </span>
          )}
          {step === "receipt" ? "Order Receipt" : "Complete Your Order"}
        </h2>

        {restaurantDetails && step !== "receipt" && (
          <div className={styles.gatewayRestaurantInfo}>
            <span>{restaurantDetails.address}</span>
            <span>{restaurantDetails.phone}</span>
          </div>
        )}

        {/* Step Components */}
        {step === "details" && (
          <DeliveryDetailsStep
            {...commonProps}
            deliveryAddress={deliveryAddress}
            editAddress={editAddress}
            addressRef={addressRef}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            couponError={couponError}
            availableCoupons={availableCoupons}
            handleApplyCoupon={handleApplyCoupon}
            handleRemoveCoupon={handleRemoveCoupon}
            handleEditAddress={handleEditAddress}
            handleSaveAddress={handleSaveAddress}
            setEditAddress={setEditAddress}
            restaurantPromotions={validPromotions}
            restaurantPromotion={restaurantPromotion}
            promotionError={promotionError}
            handleApplyPromotion={handleApplyPromotion}
            handleRemovePromotion={handleRemovePromotion}
          />
        )}

        {step === "payment" && (
          <PaymentMethodStep
            {...commonProps}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            cardDetails={cardDetails}
            setCardDetails={setCardDetails}
            upiId={upiId}
            setUpiId={setUpiId}
          />
        )}

        {step === "confirmation" && (
          <OrderConfirmationStep
            {...commonProps}
            deliveryAddress={deliveryAddress}
            paymentMethod={paymentMethod}
            cardDetails={cardDetails}
            upiId={upiId}
            cartData={cartData}
          />
        )}

        {/* Receipt Step */}
        {step === "receipt" && receiptData && (
          <div className={styles.receiptContainer} ref={receiptRef}>
            <div className={styles.receiptSuccess}>
              <div className={styles.successIcon}>
                <Check size={32} />
              </div>
              <h3>Payment Successful!</h3>
              <p>Your order has been placed successfully</p>
            </div>

            <div className={styles.receiptSection}>
              <div className={styles.receiptInfo}>
                <strong>Order ID:</strong> <span>{receiptData.orderId}</span>
              </div>
              <div className={styles.receiptInfo}>
                <strong>Transaction ID:</strong>{" "}
                <span>{receiptData.transactionId}</span>
              </div>
              <div className={styles.receiptInfo}>
                <strong>Date:</strong>{" "}
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className={styles.receiptInfo}>
                <strong>Time:</strong>{" "}
                <span>{new Date().toLocaleTimeString()}</span>
              </div>
            </div>

            <div className={styles.receiptSection}>
              <strong>Restaurant:</strong> {receiptData.restaurantDetails?.name}{" "}
              <br />
              <strong>Address:</strong> {receiptData.restaurantDetails?.address}{" "}
              <br />
              <strong>Contact:</strong> {receiptData.restaurantDetails?.phone}
            </div>

            <div className={styles.receiptSection}>
              <strong>Delivery Address:</strong> {deliveryAddress}
            </div>

            <div className={styles.receiptSection}>
              <strong>Estimated Delivery:</strong>{" "}
              <span className={styles.estimatedTime}>
                <Clock size={16} /> {estimatedTime} minutes
              </span>
            </div>

            <div className={styles.receiptSection}>
              <strong>Order Summary:</strong>
              <table className={styles.receiptTable}>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Size</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {receiptData.cartData.map((food, idx) => (
                    <tr key={idx}>
                      <td>{food.name}</td>
                      <td>{food.qty}</td>
                      <td>{food.size}</td>
                      <td>₹{food.price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.receiptSection}>
              <div className={styles.summaryLine}>
                Item Total:{" "}
                <span>₹{receiptData.totals.subtotal.toFixed(2)}</span>
              </div>
              {receiptData.appliedCoupon && (
                <div className={styles.summaryDiscount}>
                  Discount:{" "}
                  <span>-₹{receiptData.totals.discountAmount.toFixed(2)}</span>
                </div>
              )}
              {receiptData.restaurantPromotion && (
                <div className={styles.summaryDiscount}>
                  Restaurant Promo:{" "}
                  <span>-₹{receiptData.totals.promoDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className={styles.summaryLine}>
                GST ({receiptData.gstRate}%):{" "}
                <span>₹{receiptData.totals.gstAmount.toFixed(2)}</span>
              </div>
              <div className={styles.summaryLine}>
                Delivery Fee:{" "}
                <span>₹{receiptData.totals.deliveryCharges.toFixed(2)}</span>
              </div>
              {receiptData.totals.deliveryMessage && (
                <div className={styles.deliveryMessage}>
                  {receiptData.totals.deliveryMessage}
                </div>
              )}
              <div className={styles.summaryTotal}>
                Total: <span>₹{receiptData.totals.finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className={styles.paymentMethod}>
              <strong>Payment Method:</strong>{" "}
              {paymentMethod === "card"
                ? "Credit/Debit Card"
                : paymentMethod === "upi"
                ? "UPI"
                : "Cash on Delivery"}
            </div>

            <div className={styles.receiptActions}>
              <button
                className={styles.printButton}
                onClick={handleDownloadReceipt}
              >
                <Printer size={16} /> Download Receipt
              </button>
              <button className={styles.doneButton} onClick={onClose}>
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
