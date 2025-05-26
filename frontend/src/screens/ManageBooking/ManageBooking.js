import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  Users,
  Mail,
  Phone,
  MessageSquare,
  Check,
  X,
  Circle,
  Filter,
  Search,
  CalendarX,
  FileWarning,
  Eye,
  FilterX,
  ChevronDown,
} from "lucide-react";
import styles from "./ManageBooking.module.css";
const baseUrl = process.env.REACT_APP_API_BASE_URL;
const DARK_GREEN = "#1a5d1a";
const LIGHT_GREEN = "#239e53";

const statusInfo = {
  pending: { icon: <Circle size={14} />, label: "Pending", color: "#ff9500" },
  confirmed: {
    icon: <Check size={14} />,
    label: "Confirmed",
    color: LIGHT_GREEN,
  },
  cancelled: { icon: <X size={14} />, label: "Cancelled", color: "#ff3b30" },
  completed: {
    icon: <Check size={14} />,
    label: "Completed",
    color: "#007aff",
  },
};

const ManageBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterTime, setFilterTime] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [filtersExpanded, setFiltersExpanded] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const currentRestaurantId = localStorage.getItem("currentRestaurantId");

        if (!currentRestaurantId) {
          throw new Error("No restaurant ID found in localStorage");
        }

        const response = await fetch(
          `${baseUrl}/api/bookings/restaurant/${currentRestaurantId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await response.json();
        setBookings(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      const response = await fetch(`${baseUrl}/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setBookings(
          bookings.map((booking) =>
            booking._id === bookingId
              ? { ...booking, status: newStatus }
              : booking
          )
        );
        if (selectedBooking?._id === bookingId) {
          setSelectedBooking({ ...selectedBooking, status: newStatus });
        }
      } else {
        throw new Error("Failed to update booking status");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const bookingTimes = Array.from(
    new Set(
      bookings
        .filter(
          (booking) =>
            new Date(booking.date).toDateString() ===
            selectedDate.toDateString()
        )
        .map((booking) => booking.time)
    )
  ).sort();

  const filteredBookings = bookings
    .filter((booking) => {
      const bookingDate = new Date(booking.date).toDateString();
      const selectedDateStr = selectedDate.toDateString();
      const dateMatch = bookingDate === selectedDateStr;

      const statusMatch =
        filterStatus === "all" || booking.status === filterStatus;

      const searchMatch =
        booking.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.phone.includes(searchQuery);

      const timeMatch = filterTime === "all" || booking.time === filterTime;

      return dateMatch && statusMatch && searchMatch && timeMatch;
    })
    .sort((a, b) => a.time.localeCompare(b.time));

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  const clearFilters = () => {
    setFilterStatus("all");
    setFilterTime("all");
    setSearchQuery("");
  };

  const activeFiltersCount = [
    filterStatus !== "all",
    filterTime !== "all",
    searchQuery !== "",
  ].filter(Boolean).length;

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loader}>
          <div className={styles.spinner} />
          <span>Loading bookings...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.backgroundOverlay}></div>
        <div className={styles.errorState}>
          <FileWarning size={48} color="#ff3b30" />
          <h2>Error Loading Bookings</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.backgroundOverlay}></div>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <CalendarX size={32} color={DARK_GREEN} />
          <h1 className={styles.title}>Manage Bookings</h1>
        </div>

        <div className={styles.dateSelector}>
          <input
            type="date"
            value={selectedDate.toISOString().split("T")[0]}
            onChange={(e) => {
              setSelectedDate(new Date(e.target.value));
              setFilterTime("all");
            }}
            className={styles.dateInput}
          />
          {/* <span className={styles.dateDisplay}>{formatDate(selectedDate)}</span> */}
        </div>
      </div>

      <div className={styles.filtersSection}>
        <div className={styles.filtersHeader}>
          <button
            className={styles.filtersToggle}
            onClick={() => setFiltersExpanded(!filtersExpanded)}
          >
            <Filter size={18} />
            Filters
            {activeFiltersCount > 0 && (
              <span className={styles.filtersBadge}>{activeFiltersCount}</span>
            )}
            <ChevronDown
              size={18}
              className={`${styles.chevron} ${
                filtersExpanded ? styles.chevronUp : ""
              }`}
            />
          </button>

          {activeFiltersCount > 0 && (
            <button className={styles.clearFilters} onClick={clearFilters}>
              <FilterX size={16} />
              Clear Filters
            </button>
          )}
        </div>

        <div
          className={`${styles.filtersContent} ${
            filtersExpanded ? styles.filtersExpanded : ""
          }`}
        >
          <div className={styles.searchFilter}>
            <Search size={18} className={styles.filterIcon} />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.selectFilters}>
            <div className={styles.selectGroup}>
              <Clock size={16} className={styles.selectIcon} />
              <select
                value={filterTime}
                onChange={(e) => setFilterTime(e.target.value)}
                className={styles.select}
              >
                <option value="all">All Times</option>
                {bookingTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.selectGroup}>
              <Circle size={16} className={styles.selectIcon} />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={styles.select}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bookingsSection}>
        <div className={styles.bookingsHeader}>
          <h2 className={styles.sectionTitle}>
            {filteredBookings.length} Booking
            {filteredBookings.length !== 1 ? "s" : ""} for{" "}
            {selectedDate.toLocaleDateString()}
          </h2>
        </div>

        {filteredBookings.length > 0 ? (
          <div className={styles.bookingsGrid}>
            {filteredBookings.map((booking) => (
              <div key={booking._id} className={styles.bookingCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.timeSlot}>
                    <Clock size={16} />
                    {booking.time}
                  </div>
                  <div
                    className={styles.statusBadge}
                    style={{
                      backgroundColor: statusInfo[booking.status]?.color,
                    }}
                  >
                    {statusInfo[booking.status]?.icon}
                    {statusInfo[booking.status]?.label}
                  </div>
                </div>

                <div className={styles.cardContent}>
                  <h3 className={styles.guestName}>{booking.name}</h3>
                  <div className={styles.guestInfo}>
                    <div className={styles.infoItem}>
                      <Users size={14} />
                      <span>{booking.guests} guests</span>
                    </div>
                    <div className={styles.infoItem}>
                      <Phone size={14} />
                      <span>{booking.phone}</span>
                    </div>
                  </div>
                  {booking.specialRequests && (
                    <div className={styles.specialRequests}>
                      <MessageSquare size={14} />
                      <span>{booking.specialRequests}</span>
                    </div>
                  )}
                </div>

                <div className={styles.cardActions}>
                  <button
                    className={styles.viewButton}
                    onClick={() => handleViewDetails(booking)}
                  >
                    <Eye size={16} />
                    View Details
                  </button>

                  <div className={styles.quickActions}>
                    {booking.status === "pending" && (
                      <>
                        <button
                          className={styles.confirmButton}
                          onClick={() =>
                            updateBookingStatus(booking._id, "confirmed")
                          }
                        >
                          <Check size={14} />
                        </button>
                        <button
                          className={styles.cancelButton}
                          onClick={() =>
                            updateBookingStatus(booking._id, "cancelled")
                          }
                        >
                          <X size={14} />
                        </button>
                      </>
                    )}
                    {booking.status === "confirmed" && (
                      <button
                        className={styles.completeButton}
                        onClick={() =>
                          updateBookingStatus(booking._id, "completed")
                        }
                      >
                        <Circle size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <FileWarning size={64} color={LIGHT_GREEN} />
            <h3>No bookings found</h3>
            <p>
              {activeFiltersCount > 0
                ? "Try adjusting your filters to see more results"
                : "No bookings scheduled for this date"}
            </p>
            {activeFiltersCount > 0 && (
              <button
                className={styles.clearFiltersButton}
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>

      {showModal && selectedBooking && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Booking Details</h2>
              <button className={styles.closeButton} onClick={closeModal}>
                <X size={24} />
              </button>
            </div>

            <div className={styles.modalContent}>
              <div className={styles.bookingInfo}>
                <div className={styles.infoSection}>
                  <h4>Customer Information</h4>
                  <div className={styles.infoGrid}>
                    <div className={styles.infoRow}>
                      <User size={18} />
                      <span>{selectedBooking.name}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <Mail size={18} />
                      <span>{selectedBooking.email}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <Phone size={18} />
                      <span>{selectedBooking.phone}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.infoSection}>
                  <h4>Booking Details</h4>
                  <div className={styles.infoGrid}>
                    <div className={styles.infoRow}>
                      <Calendar size={18} />
                      <span>{formatDate(selectedBooking.date)}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <Clock size={18} />
                      <span>{selectedBooking.time}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <Users size={18} />
                      <span>{selectedBooking.guests} guests</span>
                    </div>
                  </div>
                </div>

                {selectedBooking.specialRequests && (
                  <div className={styles.infoSection}>
                    <h4>Special Requests</h4>
                    <div className={styles.specialRequestsText}>
                      <MessageSquare size={18} />
                      <p>{selectedBooking.specialRequests}</p>
                    </div>
                  </div>
                )}

                <div className={styles.infoSection}>
                  <h4>Status & Actions</h4>
                  <div className={styles.statusSection}>
                    <div
                      className={styles.currentStatus}
                      style={{
                        backgroundColor:
                          statusInfo[selectedBooking.status]?.color,
                      }}
                    >
                      {statusInfo[selectedBooking.status]?.icon}
                      {statusInfo[selectedBooking.status]?.label}
                    </div>

                    <div className={styles.statusActions}>
                      <button
                        className={`${styles.statusButton} ${
                          selectedBooking.status === "confirmed"
                            ? styles.active
                            : ""
                        }`}
                        onClick={() =>
                          updateBookingStatus(selectedBooking._id, "confirmed")
                        }
                      >
                        <Check size={16} />
                        Confirm
                      </button>
                      <button
                        className={`${styles.statusButton} ${
                          styles.cancelStatusButton
                        } ${
                          selectedBooking.status === "cancelled"
                            ? styles.active
                            : ""
                        }`}
                        onClick={() =>
                          updateBookingStatus(selectedBooking._id, "cancelled")
                        }
                      >
                        <X size={16} />
                        Cancel
                      </button>
                      <button
                        className={`${styles.statusButton} ${
                          styles.completeStatusButton
                        } ${
                          selectedBooking.status === "completed"
                            ? styles.active
                            : ""
                        }`}
                        onClick={() =>
                          updateBookingStatus(selectedBooking._id, "completed")
                        }
                      >
                        <Circle size={16} />
                        Complete
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.metaInfo}>
                <p>
                  <strong>Booking ID:</strong> {selectedBooking._id}
                </p>
                <p>
                  <strong>Created:</strong>{" "}
                  {new Date(selectedBooking.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBooking;
