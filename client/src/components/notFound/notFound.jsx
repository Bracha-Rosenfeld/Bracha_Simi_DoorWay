// import React from 'react'

// const notFound = () => {
//   return (
//     <div>404 Not Found ☹️</div>
//   )
// }

// export default notFound
// NotFound.jsx
import React from 'react';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* 404 Number */}
        <div className={styles.numberSection}>
          <h1 className={styles.errorNumber}>404</h1>
        </div>
        <div className={styles.iconSection}>
          <div className={styles.iconCircle}>
            <svg 
              className={styles.icon} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.002-5.824-2.618M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
          </div>
        </div>
        
        <h2 className={styles.title}>Page Not Found</h2>
        
        <p className={styles.description}>
          Sorry, we couldn't find the page you're looking for. 
          The page might have been moved, deleted, or the URL might be incorrect.
        </p>
        
        <div className={styles.buttonContainer}>
          <button 
            onClick={() => window.history.back()}
            className={styles.primaryButton}
          >
            Go Back
          </button>
          
          <button 
            onClick={() => window.location.href = '/'}
            className={styles.secondaryButton}
          >
            Go to Homepage
          </button>
        </div>
      </div>
      
      {/* Bottom Text */}
      <div className={styles.bottomText}>
        <p>
          Need help? 
          <span className={styles.supportLink}>Contact Support</span>
        </p>
      </div>
    </div>
  );
};

export default NotFound;