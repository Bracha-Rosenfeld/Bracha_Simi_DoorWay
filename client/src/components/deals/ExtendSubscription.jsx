import { useNavigate } from 'react-router-dom';
import SubscriptionPayment from './SubscriptionPayment';
// import PublishApartments from '../publishApartment/publishApartment';
import { useCurrentUser } from '../userProvider';
import React, { useState } from 'react';
import styles from './deals.module.css';
import axios from 'axios';

const ExtendSubscription = () => {
  const [showPublishState, setPublishState] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [amountToPay, setAmountToPay] = useState(null);
  const { currentUser } = useCurrentUser();
  const navigate = useNavigate();

  const chooseExtend = (amount) => {
    setAmountToPay(amount);
    setShowPayment(true);
  };

  const addUserRole = async () => {
    try {
      const numOfDays = amountToPay === 70 ? 30 : 60;
      const response = await axios.put(
        `http://localhost:5000/users/roles/viewer`,
        {
          num_of_days: numOfDays
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true // אם את משתמשת בקוקיז / JWT
        }
      );
      if (!response.ok) {
        throw new Error('Failed to Extend viewer role');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.sectionDivider}></div>

      <div className={styles.extendSection}>
        <h2 className={styles.sectionTitle}>Extend Your Subscription</h2>
        <p className={styles.sectionSubtitle}>
          Already a member? Extend your current plan and save more
        </p>

        <div className={styles.plansGrid}>
          {/* Extend Monthly */}
          <div className={styles.planCard}>
            <div className={styles.planHeader}>
              <h3 className={styles.planTitle}>Extend Monthly Plan</h3>
              <p className={styles.planDescription}>
                Extend your viewer access for one month at a special member rate
              </p>
            </div>
            <div className={styles.planPrice}>
              <span className={styles.priceAmount}>
                <span className={styles.priceCurrency}>$</span>70
              </span>
              <span className={styles.pricePeriod}>/month</span>
            </div>
            <ul className={styles.planFeatures}>
              <li>Member discount applied</li>
              <li>Seamless continuation</li>
              <li>No setup required</li>
              <li>Instant activation</li>
            </ul>
            <button
              className={`${styles.planButton} ${styles.secondary}`}
              onClick={() => chooseExtend(70)}
            >
              Extend Monthly
            </button>
          </div>

          {/* Extend Bi-Monthly */}
          <div className={styles.planCard}>
            <div className={styles.planHeader}>
              <h3 className={styles.planTitle}>Extend Bi-Monthly Plan</h3>
              <p className={styles.planDescription}>
                Extend for two months at a member discount with continued premium access
              </p>
            </div>
            <div className={styles.planPrice}>
              <span className={styles.priceAmount}>
                <span className={styles.priceCurrency}>$</span>120
              </span>
              <span className={styles.pricePeriod}>/2 months</span>
            </div>
            <ul className={styles.planFeatures}>
              <li>Maximum member savings</li>
              <li>Extended premium access</li>
              <li>Priority renewal</li>
              <li>Exclusive member benefits</li>
            </ul>
            <button
              className={`${styles.planButton} ${styles.primary}`}
              onClick={() => chooseExtend(120)}
            >
              Extend Bi-Monthly
            </button>
          </div>
        </div>
      </div>

      {/* Payment Section */}
      {showPayment && (
        <SubscriptionPayment
          amount={amountToPay}
          onSuccess={() => {
            setShowPayment(false);
            addUserRole();
            navigate('/apartments');
          }}
          onCancel={() => setShowPayment(false)}
        />
      )}
    </>
  );
};

export default ExtendSubscription;
