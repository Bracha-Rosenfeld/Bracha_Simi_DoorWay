import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import LogoutButton from './logoutButton';
import styles from './MyAccount.module.css';

const MyAccount = () => {
    const [error, setError] = useState(null);
    const location = useLocation();

    if (error) return <div className={styles.errorMessage}>Error: {error}</div>;

    return (
        <div className={styles.accountContainer}>
            <div className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <h2 className={styles.sidebarTitle}>My Account</h2>
                </div>
                
                <nav className={styles.navigation}>
                    <button className={`${styles.navButton} ${location.pathname.includes('details') ? styles.active : ''}`}>
                        <Link to="details" className={styles.navLink}>
                            My Details
                        </Link>
                    </button>
                    <button className={`${styles.navButton} ${location.pathname.includes('apartments') ? styles.active : ''}`}>
                        <Link to="apartments" className={styles.navLink}>
                            My Apartments
                        </Link>
                    </button>
                </nav>
                
                <LogoutButton />
            </div>
            
            <div className={styles.mainContent}>
                <div className={styles.contentCard}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MyAccount;