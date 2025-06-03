import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = () => {
    return (
        <div className={styles.wrapper}>
            <nav className={styles.navbar}>
                <h2 className={styles.logo}>🏠The DoorWay</h2>
                <ul className={styles.navList}>
                    <li className={styles.navItem}><Link to="/about" className={styles.navLink}>About</Link></li>
                    <li className={styles.navItem}><Link to="/deals" className={styles.navLink}>Deals</Link></li>
                    <li className={styles.navItem}><a href="#contact" className={styles.navLink}>Contact</a></li>
                    <li className={styles.navItem}><Link to="/login" className={styles.navLink}>👤</Link></li>
                    <li className={styles.navItem}><Link to="/login" className={styles.navLink}>🛒</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default NavBar;

