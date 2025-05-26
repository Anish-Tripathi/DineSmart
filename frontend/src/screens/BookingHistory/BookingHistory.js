import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styles from "./BookingHistory.module.css";
import Receipt from "../BookTable/Receipt.js";
import { CalendarDays } from "lucide-react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const receiptRef = useRef(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("Please login to view bookings");
          setLoading(false);
          return;
        }

        const { data } = await axios.get(
          `${baseUrl}/api/bookings/my-bookings`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookings(data);
      } catch (error) {
        setError("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleShowReceipt = (booking) => {
    setReceiptData({
      bookingId: booking._id,
      restaurant: booking.restaurant || { name: "Restaurant", address: "" },
      guests: booking.guests,
      date: booking.date,
      time: booking.time,
      name: booking.name || booking.user?.name || "Guest",
      email: booking.email || booking.user?.email || "",
      phone: booking.phone || booking.user?.phone || "",
      specialRequests: booking.specialRequests || "",
      offer: booking.offer || "None",
      createdAt: booking.createdAt || new Date().toISOString(),
    });
    setShowReceipt(true);
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
    setReceiptData(null);
  };

  const handleDownloadReceipt = () => {
    // Print only receipt
    if (receiptRef.current) {
      const printContents = receiptRef.current.innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  };

  const formatDate = (dateString) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleCancelClick = (bookingId) => {
    setBookingToCancel(bookingId);
    setShowAlert(true);
  };

  const handleCancelConfirm = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Please login to cancel bookings");
        return;
      }

      await axios.put(
        `${baseUrl}/api/bookings/${bookingToCancel}`,
        { status: "cancelled" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings(
        bookings.map((b) =>
          b._id === bookingToCancel ? { ...b, status: "cancelled" } : b
        )
      );
      setSuccess("Your booking has been cancelled successfully.");
      setError(null);
      setShowAlert(false);
      setBookingToCancel(null);
    } catch (error) {
      setError("Failed to cancel booking");
      setSuccess(null);
      setShowAlert(false);
    }
  };

  const handleCancelDismiss = () => {
    setShowAlert(false);
    setBookingToCancel(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.backgroundOverlay}></div>
      <div className={styles.header}>
        <h1>My Bookings</h1>
        <div className={styles.dashboardIcon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="24"
            height="24"
          >
            <path d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2h-1V1m-1 11h-5v5h5v-5z" />
          </svg>
        </div>
      </div>

      {error && (
        <div className={styles.alertError}>
          <div className={styles.alertIcon}>⚠️</div>
          <div className={styles.alertContent}>{error}</div>
          <button className={styles.alertClose} onClick={() => setError(null)}>
            ×
          </button>
        </div>
      )}

      {success && (
        <div className={styles.alertSuccess}>
          <div className={styles.alertIcon}>✓</div>
          <div className={styles.alertContent}>{success}</div>
          <button
            className={styles.alertClose}
            onClick={() => setSuccess(null)}
          >
            ×
          </button>
        </div>
      )}

      {showAlert && (
        <div className={styles.alertOverlay}>
          <div className={styles.alertBox}>
            <div className={styles.alertHeader}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <h3>Cancel Booking</h3>
            </div>
            <div className={styles.alertBody}>
              Are you sure you want to cancel this booking? This action cannot
              be undone.
            </div>
            <div className={styles.alertActions}>
              <button
                className={styles.alertCancel}
                onClick={handleCancelDismiss}
              >
                Keep Booking
              </button>
              <button
                className={styles.alertConfirm}
                onClick={handleCancelConfirm}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading your bookings...</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className={styles.emptyState}>
          <CalendarDays size={48} className={styles.emptyIcon} />
          <h2>No Bookings Yet</h2>
          <p>When you make restaurant bookings, they will appear here.</p>
        </div>
      ) : (
        <div className={styles.bookingList}>
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className={`${styles.bookingCard} ${styles[booking.status]}`}
            >
              <div className={styles.bookingHeader}>
                <div className={styles.restaurantDetails}>
                  <h3>{booking.restaurant?.name || "Restaurant"}</h3>
                  <div className={styles.bookingMeta}>
                    <span className={styles.bookingDate}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        ></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      {formatDate(booking.date)}
                    </span>
                    <span className={styles.bookingTime}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      {booking.time}
                    </span>
                    <span className={styles.bookingGuests}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                      {booking.guests}{" "}
                      {booking.guests === 1 ? "Guest" : "Guests"}
                    </span>
                  </div>
                </div>
                <span className={`${styles.status} ${styles[booking.status]}`}>
                  {booking.status}
                </span>
              </div>

              <div className={styles.bookingDetails}>
                {booking.restaurant?.address && (
                  <div className={styles.addressInfo}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {booking.restaurant.address}
                  </div>
                )}

                {booking.specialRequests && (
                  <div className={styles.specialRequests}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="8" y1="6" x2="21" y2="6"></line>
                      <line x1="8" y1="12" x2="21" y2="12"></line>
                      <line x1="8" y1="18" x2="21" y2="18"></line>
                      <line x1="3" y1="6" x2="3.01" y2="6"></line>
                      <line x1="3" y1="12" x2="3.01" y2="12"></line>
                      <line x1="3" y1="18" x2="3.01" y2="18"></line>
                    </svg>
                    <span>Special Requests:</span> {booking.specialRequests}
                  </div>
                )}
              </div>

              <div className={styles.bookingFooter}>
                {booking.status === "confirmed" && (
                  <button
                    onClick={() => handleCancelClick(booking._id)}
                    className={styles.cancelButton}
                  >
                    Cancel Reservation
                  </button>
                )}
                <button
                  onClick={() => handleShowReceipt(booking)}
                  className={styles.downloadButton}
                >
                  View Receipt
                </button>
              </div>
            </div>
          ))}

          {showReceipt && receiptData && (
            <div ref={receiptRef}>
              <Receipt
                data={receiptData}
                onDownload={handleDownloadReceipt}
                onClose={handleCloseReceipt}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
