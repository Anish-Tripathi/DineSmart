import React from "react";
import {
  Utensils,
  Calendar,
  Users,
  Tag,
  Mail,
  Phone,
  MessageSquare,
  Download,
} from "lucide-react";
import styles from "./Receipt.module.css";

const Receipt = ({ data, onDownload, onClose }) => {
  const {
    bookingId,
    restaurant,
    guests,
    date,
    time,
    name,
    email,
    phone,
    specialRequests,
    offer,
    createdAt,
  } = data;
  const bookingDate = new Date(date);
  const formattedDate = `${bookingDate.toLocaleDateString()} ${time}`;
  const createdAtDate = new Date(createdAt);
  console.log(data);

  return (
    <div className={styles.receiptPage}>
      <div className={styles.backgroundOverlay} onClick={onClose}></div>
      <div className={styles.receiptContainer}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <div className={styles.receiptStatus}>
          <div className={styles.statusIcon}>✓</div>
          <h2>Booking Confirmed!</h2>
          <p>Your table at {restaurant.name} has been successfully booked.</p>
        </div>

        <div className={styles.receiptHeader}>
          <div className={styles.logo}>
            <Utensils size={28} color="#2ecc40" />
          </div>
          <div>
            <h2 className={styles.title}>Booking Receipt</h2>
            <div className={styles.greenLine}></div>
          </div>
        </div>

        <div className={styles.receiptBody}>
          <div className={styles.receiptSection}>
            <h3>Booking Details</h3>
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <div className={styles.detailIcon}>
                  <Calendar size={18} />
                </div>
                <div className={styles.detailContent}>
                  <span className={styles.detailLabel}>Date & Time</span>
                  <span className={styles.detailValue}>{formattedDate}</span>
                </div>
              </div>

              <div className={styles.detailItem}>
                <div className={styles.detailIcon}>
                  <Users size={18} />
                </div>
                <div className={styles.detailContent}>
                  <span className={styles.detailLabel}>Guests</span>
                  <span className={styles.detailValue}>{guests}</span>
                </div>
              </div>

              <div className={styles.detailItem}>
                <div className={styles.detailIcon}>
                  <Tag size={18} />
                </div>
                <div className={styles.detailContent}>
                  <span className={styles.detailLabel}>Offer</span>
                  <span className={styles.detailValue}>{offer}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.receiptSection}>
            <h3>Restaurant</h3>
            <div className={styles.restaurantInfo}>
              <h4>{restaurant.name}</h4>
              <p>{restaurant.address}</p>
            </div>
          </div>

          <div className={styles.receiptSection}>
            <h3>Customer Information</h3>
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <div className={styles.detailIcon}>
                  <Users size={18} />
                </div>
                <div className={styles.detailContent}>
                  <span className={styles.detailLabel}>Name</span>
                  <span className={styles.detailValue}>{name}</span>
                </div>
              </div>

              <div className={styles.detailItem}>
                <div className={styles.detailIcon}>
                  <Mail size={18} />
                </div>
                <div className={styles.detailContent}>
                  <span className={styles.detailLabel}>Email</span>
                  <span className={styles.detailValue}>{email}</span>
                </div>
              </div>

              <div className={styles.detailItem}>
                <div className={styles.detailIcon}>
                  <Phone size={18} />
                </div>
                <div className={styles.detailContent}>
                  <span className={styles.detailLabel}>Phone</span>
                  <span className={styles.detailValue}>{phone}</span>
                </div>
              </div>

              {specialRequests && (
                <div className={styles.detailItemFull}>
                  <div className={styles.detailIcon}>
                    <MessageSquare size={18} />
                  </div>
                  <div className={styles.detailContent}>
                    <span className={styles.detailLabel}>Special Requests</span>
                    <span className={styles.detailValue}>
                      {specialRequests}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className={styles.receiptMetadata}>
            <div className={styles.metadataItem}>
              <span className={styles.metadataLabel}>Booking ID</span>
              <span className={styles.metadataValue}>{bookingId}</span>
            </div>
            <div className={styles.metadataItem}>
              <span className={styles.metadataLabel}>Created</span>
              <span className={styles.metadataValue}>
                {createdAtDate.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <button className={styles.downloadBtn} onClick={onDownload}>
          <Download size={18} />
          <span>Download Receipt</span>
        </button>
      </div>
    </div>
  );
};

export default Receipt;
