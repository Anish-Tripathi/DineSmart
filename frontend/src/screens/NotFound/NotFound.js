import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';


const NotFound = () => {
  const navigate = useNavigate();
  
  const handleGoHome = () => {
    navigate('/');
  };
  
  return (
    <>
      <div className={styles.errorContainer}>
      <div className={styles.backgroundOverlay}></div>
        <div className={styles.errorContent}>
          <div className={styles.errorHeader}>
            <h1 className={styles.errorCode}>404</h1>
            <h2 className={styles.errorTitle}>Page Not Found</h2>
          </div>
          
          <div className={styles.errorGraphic}>
            <div className={`${styles.circle} ${styles.circleOuter}`}>
              <div className={`${styles.circle} ${styles.circleMiddle}`}>
                <div className={`${styles.circle} ${styles.circleInner}`}>
                  <span
                    role="img"
                    aria-label="Error"
                    className={styles.errorIcon}
                  >
                    ❌
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <p className={styles.errorMessage}>
          Oops! This dish is off the menu or has found a new kitchen!!
          </p>
          
          <div className={styles.errorActions}>
            <button
              className={styles.errorButton}
              onClick={handleGoHome}
            >
              Return to Home
            </button>
            <p className={styles.errorHelp}>
              Need help? <a href="/contact-us">Contact our support team</a>
            </p>
          </div>
        </div>
      </div>
  
    </>
  );
};

export default NotFound;