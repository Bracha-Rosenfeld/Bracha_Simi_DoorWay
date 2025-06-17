import React, { useState, useEffect } from 'react';
import ShowSubscriptionOptions from './showSubscriptionOptions';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { useCurrentUser } from '../userProvider';
import ExtendSubscription from './ExtendSubscription';
import styles from './deals.module.css';
import axios from 'axios';

const Deals = () => {
  const { currentUser, setCurrentUser, isLoadingUser } = useCurrentUser();
  const [userRoles, setUserRoles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      if (currentUser && currentUser.id && currentUser.id !== -1) {

        try {
          const res = await axios.get('http://localhost:5000/users/roles', {
            withCredentials: true
          });
          const roles = res.data;
          setUserRoles(roles);
        } catch (err) {
          console.error('Failed to fetch user roles:', err);
        }
      }
    };
    fetchRoles();
  }, [currentUser]);

  const choosePublish = () => {
    navigate('/publish');
  };

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Choose Your Perfect Plan</h1>
        <p className={styles.pageSubtitle}>
          Get access to premium apartment listings and publishing tools tailored to your needs
        </p>
      </div>

      <div className={styles.plansGrid}>
        <div className={`${styles.planCard} ${styles.freePlan}`}>
          <div className={styles.planHeader}>
            <h3 className={styles.planTitle}>Publish - For Free!</h3>
            <p className={styles.planDescription}>
              Publish your apartment for sale or rent so that all our clients get to see it
            </p>
          </div>
          <div className={styles.planPrice}>
            <span className={styles.priceAmount}>FREE</span>
          </div>
          <ul className={styles.planFeatures}>
            <li>Unlimited apartment listings</li>
            <li>Basic property photos</li>
            <li>Standard search visibility</li>
            <li>Email notifications</li>
          </ul>
          <button className={`${styles.planButton} ${styles.free}`} onClick={choosePublish}>
            Choose to Publish
          </button>
        </div>
        {userRoles.includes('viewer') ? <ExtendSubscription /> : <ShowSubscriptionOptions />}
      </div>
    </div>
  );
};

export default Deals;