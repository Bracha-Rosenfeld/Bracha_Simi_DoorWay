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









//with css!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// import React, { useState } from 'react';
// import { Link, Outlet } from 'react-router-dom';
// import LogoutButton from './logoutButton';
// import styles from './userAccount.module.css';

// const MyAccount = () => {
//     const [error, setError] = useState(null);
    
//     if (error) return <div className={styles.errorMessage}>Error: {error}</div>;
    
//     return (
//         <div className={styles.accountContainer}>
//             <h2 className={styles.pageTitle}>My Account</h2>
//             <LogoutButton />
//             <nav className={styles.accountNav}>
//                 <button className={styles.navButton}>
//                     <Link to="details">Display My Details</Link>
//                 </button>
//                 <button className={styles.navButton}>
//                     <Link to="apartments">My Apartments</Link>
//                 </button>
//             </nav>
//             <Outlet />
//         </div>
//     );
// };

// export default MyAccount;



//new css
// import React, { useState } from 'react';
// import { Link, Outlet, useLocation } from 'react-router-dom';
// import LogoutButton from './logoutButton';
// import styles from './userAccount.module.css';

// const MyAccount = () => {
//     const [error, setError] = useState(null);
//     const location = useLocation();

//     if (error) return <div className={styles.errorMessage}>Error: {error}</div>;

//     return (
//         <div className={styles.accountLayout}>
//             <aside className={styles.sidebar}>
//                 <LogoutButton />
//                 <nav className={styles.accountNavColumn}>
//                     <Link 
//                         to="details" 
//                         className={`${styles.navLink} ${location.pathname.endsWith('/details') || location.pathname.endsWith('/myaccount') ? styles.activeNavLink : ''}`}
//                     >
//                         My Details
//                     </Link>
//                     <Link 
//                         to="apartments" 
//                         className={`${styles.navLink} ${location.pathname.endsWith('/apartments') ? styles.activeNavLink : ''}`}
//                     >
//                         My Apartments
//                     </Link>
//                 </nav>
//             </aside>
//             <main className={styles.accountContent}>
//                 <Outlet />
//             </main>
//         </div>
//     );
// };

// export default MyAccount;
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