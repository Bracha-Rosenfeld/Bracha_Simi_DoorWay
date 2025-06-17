import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = ({ userRole }) => {
    return (
        <div className={styles.wrapper}>
            <nav className={styles.navbar}>
                <h2 className={styles.logo}>
                    <Link to={'/'}><img src="/doorway_logo_custom.svg" alt="Doorway Logo" className="logo" /></Link>
                </h2>
                <ul className={styles.navList}>
                    {userRole == 'admin' && <li className={styles.navItem}><Link to="/adminHome" className={styles.navLink}>Unopproved Apartments</Link></li>}
                    {userRole == 'admin' && <li className={styles.navItem}><Link to="/allusers" className={styles.navLink}>Users</Link></li>}
                    {userRole == 'admin' && <li className={styles.navItem}><Link to="/publish" className={styles.navLink}>Publish</Link></li>}
                    {userRole !== 'admin' && <li className={styles.navItem}><Link to="/about" className={styles.navLink}>About</Link></li>}
                    <li className={styles.navItem}><Link to={userRole == 'admin' ? '/apartments' : '/deals'} className={styles.navLink}>{userRole == 'admin' ? 'Apartments' : 'Deals'}</Link></li>
                    <li className={styles.navItem}><a href="#contact" className={styles.navLink}>Contact</a></li>
                    <li className={styles.navItem}><Link to="/login" className={styles.navLink}>👤</Link></li>
                    <li className={styles.navItem}><Link to="/cart" className={styles.navLink}>🛒</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default NavBar;

