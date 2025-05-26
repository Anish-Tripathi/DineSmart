import React from "react";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import styles from "./AddRestaurant.module.css";

const NavigationButtons = ({
  currentStep,
  steps,
  setCurrentStep,
  handleSubmit,
  scrollToFormTop,
}) => {
  const handlePrevClick = () => {
    if (currentStep > 0) {
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
      }, 300); // Wait for scroll to complete
    }
    setTimeout(scrollToFormTop, 400);
  };

  const handleNextClick = () => {
    if (currentStep < steps.length - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 300); // Wait for scroll to complete
    }
    setTimeout(scrollToFormTop, 100);
  };

  return (
    <div className={styles.navigationButtons}>
      <button
        type="button"
        onClick={handlePrevClick}
        disabled={currentStep === 0}
        className={`${styles.button} ${styles.prevButton} ${
          currentStep === 0 ? styles.buttonDisabled : ""
        }`}
      >
        <ChevronLeft size={20} className={styles.buttonIcon} />
        Previous
      </button>

      {currentStep === steps.length - 1 ? (
        <button
          type="button"
          onClick={handleSubmit}
          className={`${styles.button} ${styles.submitButton}`}
        >
          <CheckCircle size={20} className={styles.buttonIcon} />
          Submit Restaurant
        </button>
      ) : (
        <button
          type="button"
          onClick={handleNextClick}
          className={`${styles.button} ${styles.nextButton}`}
        >
          Next
          <ChevronRight size={20} className={styles.buttonIcon} />
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
