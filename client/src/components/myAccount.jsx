// import React, { useState } from 'react';
// import { Link, Outlet } from 'react-router-dom';
// import LogoutButton from './logoutButton';

// const MyAccount = () => {
//     const [error, setError] = useState(null);
//     if (error) return <div>Error: {error}</div>;

//     return (
//         <>
//             <h2>My Account</h2>
//             <LogoutButton />

//             <nav style={{ marginBottom: '20px' }}>
//                 <button><Link to="details">Display My Details</Link></button>
//                 <button><Link to="apartments">My Apartments</Link></button>
//             </nav>

//             <Outlet />
//         </>
//     );
// };

// export default MyAccount;

import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import LogoutButton from './logoutButton';
import styles from './userAccount.module.css';

const MyAccount = () => {
    const [error, setError] = useState(null);
    
    if (error) return <div className={styles.errorMessage}>Error: {error}</div>;
    
    return (
        <div className={styles.accountContainer}>
            <h2 className={styles.pageTitle}>My Account</h2>
            <LogoutButton />
            <nav className={styles.accountNav}>
                <button className={styles.navButton}>
                    <Link to="details">Display My Details</Link>
                </button>
                <button className={styles.navButton}>
                    <Link to="apartments">My Apartments</Link>
                </button>
            </nav>
            <Outlet />
        </div>
    );
};

export default MyAccount;