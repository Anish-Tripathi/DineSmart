import React, { useEffect, useState, useRef } from "react";
import AddRestaurant from "./AddRestaurant";
import styles from "./MyRestaurant.module.css";
import {
  Star,
  Clock,
  Phone,
  Mail,
  User,
  AlertCircle,
  Calendar,
  MapPin,
  Utensils,
  IndianRupee,
  X,
  Pencil,
  Contact,
  Tag,
  Image,
  Save,
  Trash2,
  Plus,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { toast } from "sonner";
const baseUrl = process.env.REACT_APP_API_BASE_URL;
const API_URL = `${baseUrl}/api/restaurants`;

const defaultPromotion = {
  code: "",
  description: "",
  discountType: "percentage",
  discountValue: 10,
  minOrderAmount: 0,
  validFrom: new Date().toISOString().split("T")[0],
  validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
  isActive: true,
};

const MyRestaurant = () => {
  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(null);
  const [promoDraft, setPromoDraft] = useState({ ...defaultPromotion });
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    contact: true,
    promotions: true,
  });
  const formTopRef = useRef(null);

  useEffect(() => {
    const fetchMyRestaurant = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`${API_URL}/my-restaurants`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch restaurant");
        const data = await response.json();
        setRestaurant(data[0] || null);
        setFormData(data[0] || null);
      } catch (err) {
        setRestaurant(null);
      } finally {
        setLoading(false);
      }
    };
    fetchMyRestaurant();
  }, []);

  const handleEdit = () => setEditMode(true);

  const scrollToFormTop = () => {
    if (formTopRef.current) {
      try {
        formTopRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } catch (error) {
        console.error("Scroll failed, using fallback:", error);
        formTopRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setFormData(restaurant);
    setTimeout(scrollToFormTop, 100);
    setPromoDraft({ ...defaultPromotion });
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("contactInfo.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo,
          [field]: value,
        },
      }));
    } else if (name === "location.coordinates") {
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          coordinates: value.split(",").map(Number),
        },
      }));
    } else if (name === "tags") {
      setFormData((prev) => ({
        ...prev,
        tags: value
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t),
      }));
    } else if (name === "contactInfo.hours") {
      setFormData((prev) => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo,
          hours: value
            .split(",")
            .map((h) => h.trim())
            .filter((h) => h),
        },
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_URL}/${restaurant._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Update failed");
      const updated = await response.json();
      setRestaurant(updated);
      setFormData(updated);
      setEditMode(false);
      setTimeout(scrollToFormTop, 100);
      toast.success("Restaurant details updated successfully!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handlePromoDraftChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPromoDraft((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddPromotion = () => {
    if (!promoDraft.code || !promoDraft.description) {
      toast.error("Promotion code and description are required");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      promotions: [
        ...prev.promotions,
        {
          ...promoDraft,
          code: promoDraft.code.toUpperCase().trim(),
          validFrom: new Date(promoDraft.validFrom),
          validUntil: new Date(promoDraft.validUntil),
        },
      ],
    }));
    setPromoDraft({ ...defaultPromotion });
    toast.success("Promotion added successfully!");
  };

  const handleRemovePromotion = (idx) => {
    setFormData((prev) => ({
      ...prev,
      promotions: prev.promotions.filter((_, i) => i !== idx),
    }));
    toast.success("Promotion removed");
  };

  const handleDeleteRestaurant = async () => {
    toast(
      (t) => (
        <div className={styles.toastContainer}>
          <div className={styles.toastContent}>
            <AlertCircle size={20} className={styles.toastIcon} />
            <div>
              <p className={styles.toastTitle}>Delete Restaurant</p>
              <p className={styles.toastMessage}>
                This action cannot be undone. Are you sure?
              </p>
            </div>
          </div>
          <div className={styles.toastActions}>
            <button
              className={styles.toastDeleteBtn}
              onClick={async () => {
                toast.dismiss(t);
                try {
                  setLoading(true);
                  const token = localStorage.getItem("authToken");
                  const response = await fetch(`${API_URL}/${restaurant._id}`, {
                    method: "DELETE",
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
                  if (!response.ok)
                    throw new Error("Failed to delete restaurant");
                  toast.success("Restaurant deleted successfully!");
                  setRestaurant(null);
                  setFormData(null);
                  setTimeout(scrollToFormTop, 100);
                  setEditMode(false);
                } catch (err) {
                  toast.error(err.message || "Failed to delete restaurant");
                  setLoading(false);
                }
              }}
            >
              Delete
            </button>
            <button
              className={styles.toastCancelBtn}
              onClick={() => toast.dismiss(t)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: 10000,
      }
    );
  };

  if (loading)
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading your restaurant...</p>
      </div>
    );

  if (!restaurant)
    return (
      <div className={styles.noRestaurantContainer}>
        <AddRestaurant />
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.backgroundOverlay}></div>
      <div className={styles.header} ref={formTopRef}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <h1 className={styles.title}>
              <Utensils className={styles.titleIcon} />
              My Restaurant
            </h1>
            <p className={styles.subtitle}>
              Manage your restaurant details, promotions, and settings
            </p>
          </div>
          <div className={styles.headerActions}>
            {!editMode && (
              <button className={styles.editBtn} onClick={handleEdit}>
                <Pencil size={18} />
                Edit Restaurant
              </button>
            )}
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        {/* Restaurant Header Card */}
        <div className={styles.restaurantCard}>
          <div className={styles.restaurantHeader}>
            <div className={styles.imageSection}>
              <div className={styles.imageContainer}>
                <img
                  src={formData.image}
                  alt={formData.name}
                  className={styles.restaurantImage}
                />
                <div className={styles.ratingBadge}>
                  <Star size={16} />
                  <span>{formData.rating}</span>
                </div>
              </div>
              {editMode && (
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    <Image size={16} />
                    Image URL
                  </label>
                  <input
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Enter image URL"
                  />
                </div>
              )}
            </div>

            <div className={styles.restaurantInfo}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Restaurant Name</label>
                {editMode ? (
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.inputLarge}
                    placeholder="Enter restaurant name"
                  />
                ) : (
                  <h2 className={styles.restaurantName}>{formData.name}</h2>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Description</label>
                {editMode ? (
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className={styles.textarea}
                    rows={3}
                    placeholder="Describe your restaurant..."
                  />
                ) : (
                  <p className={styles.description}>{formData.description}</p>
                )}
              </div>

              <div className={styles.badges}>
                {formData.isVeg && (
                  <span className={styles.vegBadge}>
                    <span className={styles.vegDot}></span>
                    VEG
                  </span>
                )}
                {formData.featured && (
                  <span className={styles.featuredBadge}>
                    <Star size={14} />
                    FEATURED
                  </span>
                )}
                <span className={styles.cuisineBadge}>
                  <Utensils size={14} />
                  {formData.cuisine}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible Sections */}
        <div className={styles.sectionsContainer}>
          {/* Basic Information Section */}
          <div className={styles.section}>
            <div
              className={styles.sectionHeader}
              onClick={() => toggleSection("basic")}
            >
              <div className={styles.sectionTitle}>
                <User size={20} />
                <span>Basic Information</span>
              </div>
              {expandedSections.basic ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </div>

            {expandedSections.basic && (
              <div className={styles.sectionContent}>
                <div className={styles.grid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      <MapPin size={16} />
                      Address
                    </label>
                    {editMode ? (
                      <input
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="Enter full address"
                      />
                    ) : (
                      <p className={styles.value}>{formData.address}</p>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      <Utensils size={16} />
                      Cuisine Type
                    </label>
                    {editMode ? (
                      <input
                        name="cuisine"
                        value={formData.cuisine}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="e.g., Italian, Chinese"
                      />
                    ) : (
                      <p className={styles.value}>{formData.cuisine}</p>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      <Clock size={16} />
                      Delivery Time (minutes)
                    </label>
                    {editMode ? (
                      <input
                        name="deliveryTime"
                        type="number"
                        value={formData.deliveryTime}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="30"
                      />
                    ) : (
                      <p className={styles.value}>
                        {formData.deliveryTime} min
                      </p>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      <IndianRupee size={16} />
                      Price Range (1-5)
                    </label>
                    {editMode ? (
                      <select
                        name="priceRange"
                        value={formData.priceRange}
                        onChange={handleChange}
                        className={styles.select}
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p className={styles.value}>{formData.priceRange}</p>
                    )}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    <Tag size={16} />
                    Tags
                  </label>
                  {editMode ? (
                    <input
                      name="tags"
                      value={formData.tags?.join(", ") || ""}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="e.g., Fast Food, Family Friendly, Outdoor Seating"
                    />
                  ) : (
                    <div className={styles.tagsList}>
                      {formData.tags?.map((tag, idx) => (
                        <span key={idx} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {editMode && (
                  <>
                    <div className={styles.grid}>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>
                          <MapPin size={16} />
                          Coordinates (lng,lat)
                        </label>
                        <input
                          name="location.coordinates"
                          value={
                            formData.location?.coordinates?.join(",") || ""
                          }
                          onChange={handleChange}
                          className={styles.input}
                          placeholder="77.123456,28.123456"
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.label}>
                          <Star size={16} />
                          Rating (0-5)
                        </label>
                        <input
                          name="rating"
                          type="number"
                          step="0.1"
                          min="0"
                          max="5"
                          value={formData.rating}
                          onChange={handleChange}
                          className={styles.input}
                          placeholder="4.5"
                        />
                      </div>
                    </div>

                    <div className={styles.checkboxGroup}>
                      <label className={styles.checkboxLabel}>
                        <input
                          name="isVeg"
                          type="checkbox"
                          checked={formData.isVeg}
                          onChange={handleChange}
                          className={styles.checkbox}
                        />
                        <span className={styles.checkboxText}>
                          <span className={styles.vegDot}></span>
                          Vegetarian Restaurant
                        </span>
                      </label>
                      <label className={styles.checkboxLabel}>
                        <input
                          name="featured"
                          type="checkbox"
                          checked={formData.featured}
                          onChange={handleChange}
                          className={styles.checkbox}
                        />
                        <span className={styles.checkboxText}>
                          <Star size={16} />
                          Featured Restaurant
                        </span>
                      </label>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Contact Information Section */}
          <div className={styles.section}>
            <div
              className={styles.sectionHeader}
              onClick={() => toggleSection("contact")}
            >
              <div className={styles.sectionTitle}>
                <Contact size={20} />
                <span>Contact Information</span>
              </div>
              {expandedSections.contact ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </div>

            {expandedSections.contact && (
              <div className={styles.sectionContent}>
                <div className={styles.grid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      <Phone size={16} />
                      Phone Number
                    </label>
                    {editMode ? (
                      <input
                        name="contactInfo.phone"
                        value={formData.contactInfo?.phone || ""}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="+91 9876543210"
                      />
                    ) : (
                      <p className={styles.value}>
                        {formData.contactInfo?.phone || "Not provided"}
                      </p>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      <Mail size={16} />
                      Email Address
                    </label>
                    {editMode ? (
                      <input
                        name="contactInfo.email"
                        value={formData.contactInfo?.email || ""}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="restaurant@example.com"
                      />
                    ) : (
                      <p className={styles.value}>
                        {formData.contactInfo?.email || "Not provided"}
                      </p>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      <User size={16} />
                      Manager Name
                    </label>
                    {editMode ? (
                      <input
                        name="contactInfo.manager"
                        value={formData.contactInfo?.manager || ""}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="John Doe"
                      />
                    ) : (
                      <p className={styles.value}>
                        {formData.contactInfo?.manager || "Not provided"}
                      </p>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      <AlertCircle size={16} />
                      Emergency Contact
                    </label>
                    {editMode ? (
                      <input
                        name="contactInfo.emergencyContact"
                        value={formData.contactInfo?.emergencyContact || ""}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="+91 9876543210"
                      />
                    ) : (
                      <p className={styles.value}>
                        {formData.contactInfo?.emergencyContact ||
                          "Not provided"}
                      </p>
                    )}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    <Clock size={16} />
                    Operating Hours
                  </label>
                  {editMode ? (
                    <input
                      name="contactInfo.hours"
                      value={formData.contactInfo?.hours?.join(", ") || ""}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="9:00 AM - 10:00 PM, 9:00 AM - 11:00 PM"
                    />
                  ) : (
                    <div className={styles.hoursList}>
                      {formData.contactInfo?.hours?.length ? (
                        formData.contactInfo.hours.map((hour, index) => (
                          <span key={index} className={styles.hourItem}>
                            {hour.trim()}
                          </span>
                        ))
                      ) : (
                        <p className={styles.value}>Not provided</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Promotions Section */}
          <div className={styles.section}>
            <div
              className={styles.sectionHeader}
              onClick={() => toggleSection("promotions")}
            >
              <div className={styles.sectionTitle}>
                <Tag size={20} />
                <span>Promotions & Offers</span>
                {formData.promotions?.length > 0 && (
                  <span className={styles.promotionCount}>
                    {formData.promotions.length}
                  </span>
                )}
              </div>
              {expandedSections.promotions ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </div>

            {expandedSections.promotions && (
              <div className={styles.sectionContent}>
                {formData.promotions?.length > 0 ? (
                  <div className={styles.promotionsList}>
                    {formData.promotions.map((promo, idx) => (
                      <div
                        key={promo.code + idx}
                        className={styles.promotionCard}
                      >
                        <div className={styles.promotionHeader}>
                          <div className={styles.promoCodeSection}>
                            <span className={styles.promoCode}>
                              {promo.code}
                            </span>
                            <span className={styles.discount}>
                              {promo.discountType === "percentage"
                                ? `${promo.discountValue}% OFF`
                                : `₹${promo.discountValue} OFF`}
                            </span>
                          </div>
                          <div className={styles.promoStatus}>
                            {promo.isActive ? (
                              <span className={styles.statusActive}>
                                <Eye size={14} />
                                Active
                              </span>
                            ) : (
                              <span className={styles.statusInactive}>
                                <EyeOff size={14} />
                                Inactive
                              </span>
                            )}
                            {editMode && (
                              <button
                                className={styles.removePromoBtn}
                                onClick={() => handleRemovePromotion(idx)}
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>
                        </div>
                        <p className={styles.promoDescription}>
                          {promo.description}
                        </p>
                        <div className={styles.promoDetails}>
                          <span className={styles.minOrder}>
                            <IndianRupee size={12} />
                            Min: ₹{promo.minOrderAmount}
                          </span>
                          <span className={styles.validity}>
                            <Calendar size={12} />
                            {new Date(
                              promo.validFrom
                            ).toLocaleDateString()} -{" "}
                            {new Date(promo.validUntil).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.noPromotions}>
                    <Tag size={32} className={styles.noPromotionsIcon} />
                    <h3>No Active Promotions</h3>
                    <p>
                      Add promotions to attract more customers and boost sales!
                    </p>
                  </div>
                )}

                {editMode && (
                  <div className={styles.addPromoSection}>
                    <div className={styles.addPromoHeader}>
                      <h4 className={styles.addPromoTitle}>
                        <Plus size={18} />
                        Add New Promotion
                      </h4>
                    </div>
                    <div className={styles.promoForm}>
                      <div className={styles.grid}>
                        <div className={styles.formGroup}>
                          <label className={styles.label}>Promo Code</label>
                          <input
                            name="code"
                            value={promoDraft.code}
                            onChange={handlePromoDraftChange}
                            className={styles.input}
                            placeholder="SAVE20"
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.label}>Description</label>
                          <input
                            name="description"
                            value={promoDraft.description}
                            onChange={handlePromoDraftChange}
                            className={styles.input}
                            placeholder="20% off on orders above ₹500"
                          />
                        </div>
                      </div>

                      <div className={styles.grid}>
                        <div className={styles.formGroup}>
                          <label className={styles.label}>Discount Type</label>
                          <select
                            name="discountType"
                            value={promoDraft.discountType}
                            onChange={handlePromoDraftChange}
                            className={styles.select}
                          >
                            <option value="percentage">Percentage (%)</option>
                            <option value="fixed">Fixed Amount (₹)</option>
                          </select>
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.label}>Discount Value</label>
                          <input
                            name="discountValue"
                            type="number"
                            value={promoDraft.discountValue}
                            onChange={handlePromoDraftChange}
                            className={styles.input}
                            placeholder="20"
                            min="0"
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.label}>
                            Min Order Amount
                          </label>
                          <input
                            name="minOrderAmount"
                            type="number"
                            value={promoDraft.minOrderAmount}
                            onChange={handlePromoDraftChange}
                            className={styles.input}
                            placeholder="500"
                            min="0"
                          />
                        </div>
                      </div>

                      <div className={styles.grid}>
                        <div className={styles.formGroup}>
                          <label className={styles.label}>Valid From</label>
                          <input
                            name="validFrom"
                            type="date"
                            value={promoDraft.validFrom}
                            onChange={handlePromoDraftChange}
                            className={styles.input}
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.label}>Valid Until</label>
                          <input
                            name="validUntil"
                            type="date"
                            value={promoDraft.validUntil}
                            onChange={handlePromoDraftChange}
                            className={styles.input}
                          />
                        </div>
                      </div>

                      <div className={styles.promoFormActions}>
                        <label className={styles.checkboxLabel}>
                          <input
                            name="isActive"
                            type="checkbox"
                            checked={promoDraft.isActive}
                            onChange={handlePromoDraftChange}
                            className={styles.checkbox}
                          />
                          <span className={styles.checkboxText}>
                            Active promotion
                          </span>
                        </label>
                        <button
                          type="button"
                          className={styles.addPromoBtn}
                          onClick={handleAddPromotion}
                        >
                          <Plus size={16} />
                          Add Promotion
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {editMode && (
          <div className={styles.actionButtons}>
            <button className={styles.saveBtn} onClick={handleSave}>
              <Save size={18} />
              Save Changes
            </button>
            <button className={styles.cancelBtn} onClick={handleCancel}>
              <X size={18} />
              Cancel
            </button>
            <button
              className={styles.deleteBtn}
              onClick={handleDeleteRestaurant}
            >
              <Trash2 size={18} />
              Delete Restaurant
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRestaurant;
