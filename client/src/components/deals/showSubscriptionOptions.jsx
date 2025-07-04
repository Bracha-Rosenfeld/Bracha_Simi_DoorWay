import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import SubscriptionPayment from './SubscriptionPayment';
import styles from './deals.module.css';

const showSubscriptionOptions = ({ setUserRole }) => {
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);
  const [amountToPay, setAmountToPay] = useState(null);
  const [showSubscriptionOptions, setShowSubscriptionOptions] = useState(false);

  const choosePlan = (amount) => {
    setAmountToPay(amount);
    setShowSubscriptionOptions(false);
    setShowPayment(true);
  };

  const addUserRole = async () => {
    try {
      const expiryDate = amountToPay === 80
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        : new Date(Date.now() + 60 * 24 * 60 * 60 * 1000);
      const expiry_d = expiryDate.toISOString().split('T')[0];

      const response = await axios.post(
        `http://localhost:5000/users/roles`,
        {
          role_name: "viewer",
          expiry_date: expiry_d
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add viewer role');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.planCard}>
        <div className={styles.planHeader}>
          <h3 className={styles.planTitle}>Monthly Plan</h3>
          <p className={styles.planDescription}>
            Get full access to all apartment listings for one month with premium features
          </p>
        </div>
        <div className={styles.planPrice}>
          <span className={styles.priceAmount}>
            <span className={styles.priceCurrency}>$</span>80
          </span>
          <span className={styles.pricePeriod}>/month</span>
        </div>
        <ul className={styles.planFeatures}>
          <li>Access to all listings</li>
          <li>Advanced search filters</li>
          <li>Priority customer support</li>
          <li>Detailed property analytics</li>
          <li>Mobile app access</li>
        </ul>
        <button
          className={`${styles.planButton} ${styles.secondary}`}
          onClick={() => choosePlan(80)}
        >
          Choose Monthly
        </button>
      </div>

      <div className={`${styles.planCard} ${styles.featured}`}>
        <div className={styles.planBadge}>Best Value</div>
        <div className={styles.planHeader}>
          <h3 className={styles.planTitle}>Bi-Monthly Plan</h3>
          <p className={styles.planDescription}>
            Access all apartments for two months at a discounted rate with exclusive benefits
          </p>
        </div>
        <div className={styles.planPrice}>
          <span className={styles.priceAmount}>
            <span className={styles.priceCurrency}>$</span>150
          </span>
          <span className={styles.pricePeriod}>/2 months</span>
        </div>
        <ul className={styles.planFeatures}>
          <li>Everything in Monthly Plan</li>
          <li>25% cost savings</li>
          <li>Exclusive property previews</li>
          <li>Personal account manager</li>
          <li>API access for developers</li>
        </ul>
        <button
          className={`${styles.planButton} ${styles.primary}`}
          onClick={() => choosePlan(150)}
        >
          Choose Bi-Monthly
        </button>
      </div>

      {showPayment && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button
              className={styles.closeBtn}
              onClick={() => setShowPayment(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <SubscriptionPayment
              amount={amountToPay}
              onSuccess={async () => {
                setShowPayment(false);
                addUserRole();
                setUserRole('viewer');
                navigate('/apartments');
              }}
              onCancel={() => setShowPayment(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default showSubscriptionOptions;