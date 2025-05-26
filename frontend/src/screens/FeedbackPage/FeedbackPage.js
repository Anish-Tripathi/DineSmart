import React, { useState } from "react";
import styles from "./FeedbackPage.module.css";
import {
  ThumbsUp,
  Send,
  MessageSquare,
  Check,
  User,
  Utensils,
  Star,
  Mail,
} from "lucide-react";

const FeedbackPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    diningExperience: "",
    rating: 0,
    feedback: "",
  });
  const [submittedFeedbacks, setSubmittedFeedbacks] = useState([]);
  const [showThankYou, setShowThankYou] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.feedback.trim()) {
      setSubmittedFeedbacks([...submittedFeedbacks, formData]);
      setFormData({
        name: "",
        email: "",
        diningExperience: "",
        rating: 0,
        feedback: "",
      });
      setShowThankYou(true);
      setCurrentStep(1);

      setTimeout(() => {
        setShowThankYou(false);
      }, 3000);
    }
  };

  return (
    <div className={styles.feedbackPage}>
      <div className={styles.backgroundOverlay}></div>

      <header className={styles.header}>
        <h1>
          <MessageSquare className={styles.headerIcon} /> Feedback
        </h1>
        <p>Help us improve by sharing your dining experience</p>
      </header>

      <div className={styles.contentContainer}>
        <section className={styles.feedbackFormSection}>
          <h2 className={styles.sectionTitle}>
            <ThumbsUp className={styles.sectionIcon} />
            Share Your Experience
          </h2>

          {showThankYou && (
            <div className={styles.thankYouMessage}>
              <Check className={styles.checkIcon} />
              <p>Thank you for your valuable feedback!</p>
            </div>
          )}

          <form className={styles.feedbackForm} onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className={styles.formStep}>
                <div className={styles.inputGroup}>
                  <label htmlFor="name" className={styles.inputLabel}>
                    <User className={styles.inputIcon} /> Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.inputField}
                    placeholder="Anish Tripathi"
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="email" className={styles.inputLabel}>
                    <Mail className={styles.inputIcon} /> Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.inputField}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className={styles.formNavigation}>
                  <button
                    type="button"
                    className={styles.nextButton}
                    onClick={nextStep}
                    disabled={!formData.name || !formData.email}
                  >
                    Next <Send className={styles.buttonIcon} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Dining Experience */}
            {currentStep === 2 && (
              <div className={styles.formStep}>
                <div className={styles.inputGroup}>
                  <label
                    htmlFor="diningExperience"
                    className={styles.inputLabel}
                  >
                    <Utensils className={styles.inputIcon} /> Dining Experience
                  </label>
                  <select
                    id="diningExperience"
                    name="diningExperience"
                    value={formData.diningExperience}
                    onChange={handleChange}
                    className={styles.inputField}
                    required
                  >
                    <option value="">Select your experience</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="takeaway">Takeaway</option>
                    <option value="delivery">Delivery</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>
                    <Star className={styles.inputIcon} /> Rating
                  </label>
                  <div className={styles.ratingContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`${styles.ratingStar} ${
                          star <= formData.rating ? styles.active : ""
                        }`}
                        onClick={() => handleRatingChange(star)}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.formNavigation}>
                  <button
                    type="button"
                    className={styles.backButton}
                    onClick={prevStep}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className={styles.nextButton}
                    onClick={nextStep}
                    disabled={
                      !formData.diningExperience || formData.rating === 0
                    }
                  >
                    Next <Send className={styles.buttonIcon} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Feedback */}
            {currentStep === 3 && (
              <div className={styles.formStep}>
                <div className={styles.inputGroup}>
                  <label htmlFor="feedback" className={styles.inputLabel}>
                    <MessageSquare className={styles.inputIcon} /> Your Feedback
                  </label>
                  <textarea
                    id="feedback"
                    name="feedback"
                    value={formData.feedback}
                    onChange={handleChange}
                    className={styles.feedbackTextarea}
                    placeholder="Tell us about your experience..."
                    rows="5"
                    required
                  ></textarea>
                </div>

                <div className={styles.formNavigation}>
                  <button
                    type="button"
                    className={styles.backButton}
                    onClick={prevStep}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={!formData.feedback.trim()}
                  >
                    Submit Feedback <Send className={styles.buttonIcon} />
                  </button>
                </div>
              </div>
            )}
          </form>
        </section>
      </div>
    </div>
  );
};

export default FeedbackPage;
