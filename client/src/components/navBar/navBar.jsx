import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import { useCurrentUser } from '../userProvider';
import axios from 'axios';

const NavBar = () => {
    const [homeNav, setHomeNav] = useState('/');
    const { currentUser, isLoadingUser } = useCurrentUser();
    const [error, setError] = useState(null);
    useEffect(() => {
        if (isLoadingUser) return; // Wait for the user to load

        if (currentUser && currentUser.id !== -1) {
            const roles = axios.get(`http://localhost:5000/usersRoles/${currentUser.id}`, {
                withCredentials: true
            }).then((response) => {
                if (response.data && response.data.length > 0) {
                    if (response.data.includes('admin')) {
                        setHomeNav('/adminHome');
                    } else {
                        setHomeNav('/');
                    }
                } else {
                    setHomeNav('/');
                }
            }).catch((error) => {
                setError('Error fetching user roles:', error);
            });
        }
    }, [currentUser, isLoadingUser]);
    return (
        <div className={styles.wrapper}>
            {error && <p className={styles.error}>{error}</p>}
            <nav className={styles.navbar}>
                <h2 className={styles.logo}>
                    <Link to={homeNav}><img src="/doorway_logo_custom.svg" alt="Doorway Logo" className="logo" /></Link>
                </h2>
                <ul className={styles.navList}>
                    <li className={styles.navItem}><Link to="/about" className={styles.navLink}>About</Link></li>
                    <li className={styles.navItem}><Link to="/deals" className={styles.navLink}>Deals</Link></li>
                    <li className={styles.navItem}><a href="#contact" className={styles.navLink}>Contact</a></li>
                    <li className={styles.navItem}><Link to="/login" className={styles.navLink}>👤</Link></li>
                    <li className={styles.navItem}><Link to="/cart" className={styles.navLink}>🛒</Link></li>

                </ul>
            </nav>
        </div>
    );
};

export default NavBar;

