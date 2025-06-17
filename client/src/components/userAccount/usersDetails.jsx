import React, { useState, useEffect } from 'react';
import { useCurrentUser } from '../userProvider';
import axios from 'axios';
import styles from './MyAccount.module.css';

const UsersDetails = () => {
    const { currentUser, setCurrentUser, isLoadingUser } = useCurrentUser();
    const [userData, setUserData] = useState({ username: '', email: '', phone: '', address: '' });
    const [originalData, setOriginalData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isChanged, setIsChanged] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isLoadingUser) return;
        if (currentUser && currentUser.id != -1) {
            setUserData(currentUser);
            setOriginalData(currentUser);
        }
    }, [currentUser, isLoadingUser]);

    const handleInputChange = (field, value) => {
        setUserData(prev => {
            const updated = { ...prev, [field]: value };
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
            const response = await axios.put(
                `http://localhost:5000/users/${currentUser.id}`,
                {
                    username: userData.username,
                    email: userData.email,
                    phone: userData.phone,
                    address: userData.address
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );

            const { user: updated, token } = response.data;
            setUserData(updated);
            setOriginalData(updated);
            setCurrentUser(updated);
            setIsEditing(false);
            setIsChanged(false);

        } catch (err) {
            setError('שגיאה בעדכון הפרטים: ' + (err.response?.data?.message || err.message));
        }
    };


    const cancelChanges = () => {
        setUserData(originalData);
        setIsEditing(false);
        setIsChanged(false);
    };

    if (error) {
        return <div className={styles.errorMessage}>{error}</div>;
    }

    return (
        <div className={styles.detailsContainer}>
            <h3 className={styles.detailsTitle}>Personal Details</h3>

            {isEditing ? (
                <>
                    <div className={styles.detailsGrid}>
                        <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>Name</label>
                            <input
                                type="text"
                                value={userData.username}
                                onChange={(e) => handleInputChange('username', e.target.value)}
                                className={styles.fieldInput}
                                placeholder="Enter your name"
                            />
                        </div>

                        <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>Email</label>
                            <input
                                type="email"
                                value={userData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                className={styles.fieldInput}
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>Phone</label>
                            <input
                                type="tel"
                                value={userData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                className={styles.fieldInput}
                                placeholder="Enter your phone number"
                            />
                        </div>

                        <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>Address</label>
                            <input
                                type="text"
                                value={userData.address}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                                className={styles.fieldInput}
                                placeholder="Enter your address"
                            />
                        </div>
                    </div>

                    <div className={styles.actionButtons}>
                        <button
                            onClick={cancelChanges}
                            className={styles.secondaryButton}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={saveChanges}
                            disabled={!isChanged}
                            className={styles.primaryButton}
                        >
                            Save Changes
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.detailsGrid}>
                        <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>Name</label>
                            <div className={styles.fieldValue}>{userData.username || 'Not provided'}</div>
                        </div>

                        <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>Email</label>
                            <div className={styles.fieldValue}>{userData.email || 'Not provided'}</div>
                        </div>

                        <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>Phone</label>
                            <div className={styles.fieldValue}>{userData.phone || 'Not provided'}</div>
                        </div>

                        <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>Address</label>
                            <div className={styles.fieldValue}>{userData.address || 'Not provided'}</div>
                        </div>
                    </div>

                    <div className={styles.actionButtons}>
                        <button onClick={editUserDetails} className={styles.primaryButton}>
                            Edit Details
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default UsersDetails;