import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import styles from "./BookTable.module.css";
import Receipt from "./Receipt";
import {
  Utensils,
  Users,
  Calendar,
  Clock,
  MapPin,
  Mail,
  Phone,
  MessageSquare,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import axios from "axios";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

const BookTable = () => {
  const { id } = useParams();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const receiptRef = useRef(null);

  // Restaurant state
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Booking state
  const [selectedGuests, setSelectedGuests] = useState(2);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    specialRequests: "",
  });
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingReceiptData, setBookingReceiptData] = useState(null);

  // Scroll to top when booking is successful
  useEffect(() => {
    if (bookingSuccess) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [bookingSuccess]);

  // Fetch restaurant data
  useEffect(() => {
    if (location.state?.restaurant) {
      setRestaurant(location.state.restaurant);
      setLoading(false);
    } else {
      const fetchRestaurant = async () => {
        try {
          const response = await axios.get(`${baseUrl}/api/bookings/${id}`);
          setRestaurant(response.data);
          setLoading(false);
        } catch (err) {
          console.error("Error fetching restaurant:", err);
          setError(err.response?.data?.message || "Failed to fetch restaurant");
          setLoading(false);
        }
      };
      fetchRestaurant();
    }
  }, [id, location.state]);

  // Calculate next 10 days including today
  const getTenDays = () => {
    const days = [];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    for (let i = 0; i < 10; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push({
        dayName: dayNames[date.getDay()],
        date: date.getDate(),
        month: monthNames[date.getMonth()],
        fullDate: new Date(date),
        offer: "20% off",
      });
    }
    return days;
  };

  const timeSlots = [
    { id: 1, time: "06:00", offer: "5% off" },
    { id: 2, time: "06:30", offer: "5% off" },
    { id: 3, time: "07:00", offer: "5% off" },
    { id: 4, time: "07:30", offer: "5% off" },
    { id: 5, time: "08:00", offer: "10% off" },
    { id: 6, time: "08:30", offer: "10% off" },
    { id: 7, time: "09:00", offer: "10% off" },
    { id: 8, time: "09:30", offer: "10% off" },
    { id: 9, time: "10:00", offer: "15% off" },
    { id: 10, time: "10:30", offer: "15% off" },
    { id: 11, time: "11:00", offer: "15% off" },
    { id: 12, time: "11:30", offer: "15% off" },
    { id: 13, time: "12:00", offer: "10% off" },
    { id: 14, time: "12:30", offer: "10% off" },
    { id: 15, time: "13:00", offer: "10% off" },
    { id: 16, time: "13:30", offer: "10% off" },
    { id: 17, time: "14:00", offer: "10% off" },
    { id: 18, time: "14:30", offer: "10% off" },
    { id: 19, time: "15:00", offer: "10% off" },
    { id: 20, time: "15:30", offer: "10% off" },
    { id: 21, time: "16:00", offer: "15% off" },
    { id: 22, time: "16:30", offer: "15% off" },
    { id: 23, time: "17:00", offer: "15% off" },
    { id: 24, time: "17:30", offer: "15% off" },
    { id: 25, time: "18:00", offer: "20% off" },
    { id: 26, time: "18:30", offer: "20% off" },
    { id: 27, time: "19:00", offer: "25% off" },
    { id: 28, time: "19:30", offer: "25% off" },
    { id: 29, time: "20:00", offer: "30% off" },
    { id: 30, time: "20:30", offer: "20% off" },
    { id: 31, time: "21:00", offer: "20% off" },
    { id: 32, time: "21:30", offer: "15% off" },
    { id: 33, time: "22:00", offer: "15% off" },
    { id: 34, time: "22:30", offer: "10% off" },
    { id: 35, time: "23:00", offer: "10% off" },
    { id: 36, time: "23:30", offer: "5% off" },
  ];

  const handleGuestSelection = (num) => setSelectedGuests(num);
  const handleDaySelection = (index) => {
    setSelectedDay(index);
    setSelectedTime(null);
  };
  const handleTimeSelection = (id) => setSelectedTime(id);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails({
      ...bookingDetails,
      [name]: value,
    });
  };
  const handleProceed = () => {
    if (selectedTime) {
      setIsDetailsOpen(true);
    } else {
      alert("Please select a time slot");
    }
  };

  // Handle booking submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const days = getTenDays();
      const selectedDate = days[selectedDay].fullDate;
      const selectedTimeSlot = timeSlots.find(
        (slot) => slot.id === selectedTime
      );

      const bookingData = {
        restaurantId: id,
        guests: selectedGuests,
        date: selectedDate,
        time: selectedTimeSlot.time,
        name: bookingDetails.name,
        email: bookingDetails.email,
        phone: bookingDetails.phone,
        specialRequests: bookingDetails.specialRequests,
      };

      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("You must be logged in to make a booking");
      }

      // Simulate API booking call
      const response = await axios.post(
        `${baseUrl}/api/bookings`,
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookingReceiptData({
        ...bookingData,
        restaurant: restaurant,
        offer: selectedTimeSlot.offer,
        bookingId:
          response.data?.bookingId || Math.floor(Math.random() * 1000000), // fallback if no id
        createdAt: new Date(),
      });

      setBookingSuccess(true);
    } catch (error) {
      console.error("Booking error:", error);
      alert(
        error.response?.data?.message || error.message || "Failed to book table"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Download receipt as image
  const handleDownloadReceipt = () => {
    // Print only receipt
    if (receiptRef.current) {
      const printContents = receiptRef.current.innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      // window.location.reload();
    }
  };

  const days = getTenDays();

  if (loading)
    return <div className={styles.loading}>Loading restaurant details...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!restaurant)
    return <div className={styles.error}>Restaurant not found</div>;

  if (bookingSuccess && bookingReceiptData) {
    return (
      <div ref={receiptRef}>
        <Receipt data={bookingReceiptData} onDownload={handleDownloadReceipt} />
      </div>
    );
  }

  return (
    <div className={styles.bookTableContainer}>
      <div className={styles.backgroundOverlay}></div>
      <div className={styles.restaurantHeader}>
        <h1 className={styles.heading}>
          <Utensils className={styles.icon} />
          Book Table at {restaurant.name}
        </h1>
        <p className={styles.bookingSubtitle}>{restaurant.description}</p>
        <div className={styles.restaurantInfo}>
          <span>
            <MapPin size={16} /> {restaurant.address}
          </span>
          <span>
            <Clock size={16} /> {restaurant.openingHours || "Open today"}
          </span>
        </div>
      </div>

      <div className={styles.bookingSection}>
        <h2 className={styles.subHeading}>
          <Users className={styles.sectionIcon} size={20} />
          Number of Guest(s)
        </h2>
        <div className={styles.guestSelector}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12].map((num) => (
            <button
              key={num}
              className={`${styles.guestButton} ${
                selectedGuests === num ? styles.selected : ""
              }`}
              onClick={() => handleGuestSelection(num)}
            >
              {num}
              {selectedGuests === num && (
                <span className={styles.checkmark}>✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.bookingSection}>
        <h2 className={styles.subHeading}>
          <Calendar className={styles.sectionIcon} size={20} />
          When are you visiting?
        </h2>
        <div className={styles.dateSelector}>
          {days.map((day, index) => (
            <div
              key={index}
              className={`${styles.dateOption} ${
                selectedDay === index ? styles.selected : ""
              }`}
              onClick={() => handleDaySelection(index)}
            >
              <div className={styles.dayName}>{day.dayName}</div>
              <div className={styles.dateNumber}>
                {day.date} {day.month}
              </div>
              {day.offer && (
                <div className={styles.offerBadge}>{day.offer}</div>
              )}
              {selectedDay === index && (
                <div className={styles.selectedIndicator}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bookingSection}>
        <h2 className={styles.subHeading}>
          <Clock className={styles.sectionIcon} size={20} />
          Select the time of day
        </h2>
        <div className={styles.timeSelector}>
          {timeSlots.map((slot) => (
            <div
              key={slot.id}
              className={`${styles.timeOption} ${
                selectedTime === slot.id ? styles.selected : ""
              }`}
              onClick={() => handleTimeSelection(slot.id)}
            >
              <div className={styles.time}>{slot.time}</div>
              {slot.offer && (
                <div className={styles.offerBadge}>{slot.offer}</div>
              )}
              {selectedTime === slot.id && (
                <span className={styles.checkmark}>✓</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <button
        className={styles.proceedButton}
        onClick={handleProceed}
        disabled={!selectedTime}
      >
        {selectedTime ? "Proceed" : "Select a time"}
      </button>

      {isDetailsOpen && (
        <div className={styles.detailsOverlay}>
          <div className={styles.detailsModal}>
            <h2 className={styles.modalHeading}>
              <CheckCircle className={styles.modalIcon} size={24} />
              Complete Your Reservation
            </h2>
            <div className={styles.bookingSummary}>
              <div className={styles.summaryItem}>
                <Users size={16} className={styles.summaryIcon} />
                <span>
                  <strong>Guests:</strong> {selectedGuests}
                </span>
              </div>
              <div className={styles.summaryItem}>
                <Calendar size={16} className={styles.summaryIcon} />
                <span>
                  <strong>Date:</strong> {days[selectedDay].dayName},{" "}
                  {days[selectedDay].date} {days[selectedDay].month}
                </span>
              </div>
              <div className={styles.summaryItem}>
                <Clock size={16} className={styles.summaryIcon} />
                <span>
                  <strong>Time:</strong>{" "}
                  {timeSlots.find((slot) => slot.id === selectedTime)?.time}
                </span>
              </div>
              <div className={styles.summaryItem}>
                <AlertCircle size={16} className={styles.summaryIcon} />
                <span>
                  <strong>Offer:</strong>{" "}
                  {timeSlots.find((slot) => slot.id === selectedTime)?.offer}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="name">
                  <Users size={16} className={styles.inputIcon} />
                  Full Name
                </label>
                <input
                  className={styles.input}
                  type="text"
                  id="name"
                  name="name"
                  value={bookingDetails.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="email">
                  <Mail size={16} className={styles.inputIcon} />
                  Email
                </label>
                <input
                  className={styles.input}
                  type="email"
                  id="email"
                  name="email"
                  value={bookingDetails.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="phone">
                  <Phone size={16} className={styles.inputIcon} />
                  Phone Number
                </label>
                <input
                  className={styles.input}
                  type="tel"
                  id="phone"
                  name="phone"
                  value={bookingDetails.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your contact number"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="specialRequests">
                  <MessageSquare size={16} className={styles.inputIcon} />
                  Special Requests (Optional)
                </label>
                <textarea
                  className={styles.textarea}
                  id="specialRequests"
                  name="specialRequests"
                  value={bookingDetails.specialRequests}
                  onChange={handleInputChange}
                  placeholder="Any special requests or notes for the restaurant"
                  rows="3"
                />
              </div>

              <div className={styles.buttonGroup}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setIsDetailsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.confirmButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Confirm Booking (₹0)"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookTable;
