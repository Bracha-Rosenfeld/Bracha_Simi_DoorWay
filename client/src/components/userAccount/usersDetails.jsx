// import React, { useState, useEffect } from 'react'
// import { useLocation } from 'react-router-dom';
// import { useCurrentUser } from './userProvider';
// import axios from 'axios';


// const usersDetails = () => {
//     const { currentUser, setCurrentUser, isLoadingUser } = useCurrentUser();
//     const [userData, setUserData] = useState({ username: '', email: '', phone: '', address: '' })
//     const [originalData, setOriginalData] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [isChanged, setIsChanged] = useState(false);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         if (isLoadingUser) return;
//         if (currentUser && currentUser.id != -1) {
//             axios.get(`http://localhost:5000/users/${currentUser.id}`)
//                 .then(res => {
//                     setUserData(res.data);
//                     setOriginalData(res.data);
//                 })
//                 .catch(() => setError('Failed to fetch user data'));
//         }
//     }, [currentUser, isLoadingUser]);

//     useEffect(() => {
//         console.log('Current user after refresh:', currentUser);
//     }, [currentUser]);

//     const handleInputChange = (field, value) => {
//         setUserData(prev => {
//             const updated = { ...prev, [field]: value };
//             // Compare with original to check if anything changed
//             const changed = JSON.stringify(updated) !== JSON.stringify(originalData);
//             setIsChanged(changed);
//             return updated;
//         });
//     };

//     const editUserDetails = () => {
//         setIsEditing(true);
//     };

//     const saveChanges = async () => {
//         try {
//             const response = await fetch(`http://localhost:5000/users/${currentUser.id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ username: userData.username, email: userData.email, phone: userData.phone, address: userData.address }),
//             })
//             if (response.ok) {
//                 //const updated = await response.json();
//                 const { user: updated, token } = await response.json();
//                 setUserData(updated);
//                 setOriginalData(updated); // update original
//                 // setCurrentUser(prev => ({
//                 //     ...prev,
//                 //     username: updated.username,
//                 //     email: updated.email,
//                 //     phone: updated.phone,
//                 //     address: updated.address
//                 // }));
//                 setCurrentUser(updated)
//                 setIsEditing(false);
//                 setIsChanged(false);
//             }
//             else {
//                 console.error("Error updating user details:", response.statusText);
//             }

//         } catch (err) {
//             console.error('saveChanges error:', err);
//         }
//     }

//     return (
//         <div>
//             {isEditing ? (
//                 <>
//                     <div>
//                         Name:
//                         <input
//                             type="text"
//                             value={userData.username}
//                             onChange={(e) => handleInputChange('username', e.target.value)}
//                         />
//                     </div>
//                     <div>
//                         Email:
//                         <input
//                             type="email"
//                             value={userData.email}
//                             onChange={(e) => handleInputChange('email', e.target.value)}
//                         />
//                     </div>
//                     <div>
//                         Phone:
//                         <input
//                             type="tel"
//                             value={userData.phone}
//                             onChange={(e) => handleInputChange('phone', e.target.value)}
//                         />
//                     </div>
//                     <div>
//                         Address
//                         <input
//                             type="address"
//                             value={userData.address}
//                             onChange={(e) => handleInputChange('address', e.target.value)}
//                         />
//                     </div>
//                     <button
//                         onClick={saveChanges}
//                         disabled={!isChanged}
//                     >
//                         Save Changes
//                     </button>
//                 </>
//             ) : (
//                 <>
//                     <p><strong>Name:</strong> {userData.username}</p>
//                     <p><strong>Email:</strong> {userData.email}</p>
//                     <p><strong>Phone:</strong> {userData.phone}</p>
//                     <p><strong>Address:</strong> {userData.address}</p>
//                     <button onClick={editUserDetails}>Edit Details</button>
//                 </>
//             )}
//         </div>
//     )
// }

// export default usersDetails;

import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useCurrentUser } from '../userProvider';
import axios from 'axios';
import styles from './userAccount.module.css';

const UsersDetails = () => {
    const { currentUser, setCurrentUser, isLoadingUser } = useCurrentUser();
    const [userData, setUserData] = useState({ username: '', email: '', phone: '', address: '' })
    const [originalData, setOriginalData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isChanged, setIsChanged] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isLoadingUser) return;
        if (currentUser && currentUser.id != -1) {
            axios.get(`http://localhost:5000/users/${currentUser.id}`)
                .then(res => {
                    setUserData(res.data);
                    setOriginalData(res.data);
                })
                .catch(() => setError('Failed to fetch user data'));
        }
    }, [currentUser, isLoadingUser]);

    useEffect(() => {
        console.log('Current user after refresh:', currentUser);
    }, [currentUser]);

    const handleInputChange = (field, value) => {
        setUserData(prev => {
            const updated = { ...prev, [field]: value };
            // Compare with original to check if anything changed
            const changed = JSON.stringify(updated) !== JSON.stringify(originalData);
            setIsChanged(changed);
            return updated;
        });
    };

    const editUserDetails = () => {
        setIsEditing(true);
    };

    const saveChanges = async () => {
        try {
            const response = await fetch(`http://localhost:5000/users/${currentUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    username: userData.username, 
                    email: userData.email, 
                    phone: userData.phone, 
                    address: userData.address 
                }),
            })
            if (response.ok) {
                const { user: updated, token } = await response.json();
                setUserData(updated);
                setOriginalData(updated);
                setCurrentUser(updated)
                setIsEditing(false);
                setIsChanged(false);
            }
            else {
                console.error("Error updating user details:", response.statusText);
            }
        } catch (err) {
            console.error('saveChanges error:', err);
        }
    }

    const cancelChanges = () => {
        setUserData(originalData);
        setIsEditing(false);
        setIsChanged(false);
    };

    if (error) {
        return <div className={styles.errorMessage}>Error: {error}</div>;
    }

    return (
        <div className={styles.userDetailsCard}>
            <h3 className={styles.pageTitle}>My Details</h3>
            {isEditing ? (
                <>
                    <div className={styles.userDetailsGrid}>
                        <div className={styles.userDetailItem}>
                            <label className={styles.userDetailLabel}>Name:</label>
                            <input
                                className={styles.userInput}
                                type="text"
                                value={userData.username}
                                onChange={(e) => handleInputChange('username', e.target.value)}
                                placeholder="Enter your name"
                            />
                        </div>
                        <div className={styles.userDetailItem}>
                            <label className={styles.userDetailLabel}>Email:</label>
                            <input
                                className={styles.userInput}
                                type="email"
                                value={userData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className={styles.userDetailItem}>
                            <label className={styles.userDetailLabel}>Phone:</label>
                            <input
                                className={styles.userInput}
                                type="tel"
                                value={userData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                placeholder="Enter your phone number"
                            />
                        </div>
                        <div className={styles.userDetailItem}>
                            <label className={styles.userDetailLabel}>Address:</label>
                            <input
                                className={styles.userInput}
                                type="text"
                                value={userData.address}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                                placeholder="Enter your address"
                            />
                        </div>
                    </div>
                    <div className={styles.buttonGroup}>
                        <button
                            className={styles.primaryButton}
                            onClick={saveChanges}
                            disabled={!isChanged}
                        >
                            Save Changes
                        </button>
                        <button
                            className={styles.secondaryButton}
                            onClick={cancelChanges}
                        >
                            Cancel
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.userDetailsGrid}>
                        <div className={styles.userDetailItem}>
                            <span className={styles.userDetailLabel}>Name:</span>
                            <div className={styles.userDetailValue}>{userData.username}</div>
                        </div>
                        <div className={styles.userDetailItem}>
                            <span className={styles.userDetailLabel}>Email:</span>
                            <div className={styles.userDetailValue}>{userData.email}</div>
                        </div>
                        <div className={styles.userDetailItem}>
                            <span className={styles.userDetailLabel}>Phone:</span>
                            <div className={styles.userDetailValue}>{userData.phone}</div>
                        </div>
                        <div className={styles.userDetailItem}>
                            <span className={styles.userDetailLabel}>Address:</span>
                            <div className={styles.userDetailValue}>{userData.address}</div>
                        </div>
                    </div>
                    <div className={styles.buttonGroup}>
                        <button 
                            className={styles.primaryButton}
                            onClick={editUserDetails}
                        >
                            Edit Details
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default UsersDetails;