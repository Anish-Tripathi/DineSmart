import React from "react";
import { CheckCircle } from "lucide-react";
import styles from "./AddRestaurant.module.css";

const StepProgress = ({ steps, currentStep, goToStep }) => (
  <div className={styles.progressContainer}>
    <div className={styles.stepsContainer}>
      {steps.map((step, index) => (
        <div
          key={index}
          className={`${styles.stepItem} ${
            index === currentStep
              ? styles.stepActive
              : index < currentStep
              ? styles.stepCompleted
              : styles.stepInactive
          }`}
          onClick={() => goToStep(index)}
        >
          <div className={styles.stepIcon}>
            {index < currentStep ? <CheckCircle size={20} /> : step.icon}
          </div>
          <span className={styles.stepTitle}>{step.title}</span>
        </div>
      ))}
    </div>
    <div className={styles.progressBar}>
      <div
        className={styles.progressFill}
        style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
      ></div>
    </div>
  </div>
);

export default StepProgress;
