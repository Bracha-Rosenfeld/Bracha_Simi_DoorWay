// import React, { useState, useEffect } from 'react'
// import { useCurrentUser } from './userProvider';
// import axios from 'axios';
// const UsersApartments = () => {
//     const { currentUser, isLoadingUser } = useCurrentUser();
//     const [usersApartments, setUsersApartments] = useState([]);
//     const [editingAptId, setEditingAptId] = useState(null);
//     const [editedData, setEditedData] = useState({ price: '', details: '' });
//     const [originalData, setOriginalData] = useState({ price: '', details: '' });
//     useEffect(() => {
//         if (isLoadingUser) return;
//         if (currentUser && currentUser.id !== -1) {
//             axios.get(`http://localhost:5000/apartments`, {
//                 params: { publisher_id: currentUser.id }
//             }).then(response => {
//                 setUsersApartments(response.data);
//             }).catch(() => {
//                 setUsersApartments([]);
//             });
//         } else {
//             setUsersApartments([]);
//         }
//     }, [currentUser, isLoadingUser]);
//     const handleEdit = (apt) => {
//         setEditingAptId(apt.id);
//         setEditedData({ title: apt.title, price: apt.price, details: apt.details, is_approved: 1 });
//         setOriginalData({ title: apt.title, price: apt.price, details: apt.details, is_approved: 1 });
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setEditedData(prev => ({ ...prev, [name]: value }));
//     };

//     const saveChanges = async (aptId) => {
//         try {
//             const response = await axios.put(`http://localhost:5000/apartments/${aptId}`, editedData);
//             if (response.status == 200) {
//                 setUsersApartments(prev =>
//                     prev.map(apt =>
//                         apt.id === aptId ? { ...apt, ...editedData } : apt
//                     )
//                 );
//                 setEditingAptId(null);
//                 setEditedData({ price: '', details: '' });
//                 setOriginalData({ price: '', details: '' });
//             } else {
//                 console.error("Error updating apartment:", response.statusText);
//             }
//         } catch (err) {
//             console.error("Error:", err);
//         }
//     };

//     const handleDelete = async (apt) => {
//         try {
//             const confirmed = window.confirm("Are you sure you want to delete this apartment?");
//             if (!confirmed) return;
//             const response = await axios.delete(`http://localhost:5000/apartments/${apt.id}`);
//             if (response.status === 200) {
//                 setUsersApartments(prev => prev.filter(a => a.id !== apt.id));
//             }
//         } catch (err) {
//             console.error("Error deleting apartment:", err);
//         }
//     }

//     const cancelChanges = () => {
//         setEditedData(originalData);
//         setEditingAptId(null);
//     };

//     const hasChanges =
//         editedData.price !== String(originalData.price) ||
//         editedData.details !== originalData.details;

//     return (
//         <div>
//             <h3>My Apartments</h3>
//             {usersApartments.length > 0 ? (
//                 <ul>
//                     {usersApartments.map((apt) => (
//                         <li key={apt.id}>
//                             <div><strong>{apt.title}</strong></div>

//                             {editingAptId === apt.id ? (
//                                 <>
//                                     <div>
//                                         <strong>Price: </strong>
//                                         <input
//                                             type="number"
//                                             name="price"
//                                             value={editedData.price}
//                                             onChange={handleChange}
//                                             min="0"
//                                         />
//                                     </div>
//                                     <div>
//                                         <strong>Details: </strong>
//                                         <input
//                                             type="text"
//                                             name="details"
//                                             value={editedData.details}
//                                             onChange={handleChange}
//                                         />
//                                     </div>
//                                     {hasChanges && (
//                                         <>
//                                             <button onClick={() => saveChanges(apt.id)}>Save</button>
//                                             <button onClick={cancelChanges}>Cancel</button>
//                                         </>
//                                     )}
//                                 </>
//                             ) : (
//                                 <>
//                                     <div>
//                                         <strong>Price: </strong>{apt.price}
//                                     </div>
//                                     <div>
//                                         <strong>Details: </strong>{apt.details}
//                                     </div>
//                                     <button onClick={() => handleEdit(apt)}>Edit</button>
//                                     <button onClick={() => handleDelete(apt)}>Delete</button>
//                                 </>
//                             )}
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No apartments found.</p>
//             )}
//         </div>
//     );
// };

// export default UsersApartments;


import React, { useState, useEffect } from 'react'
import { useCurrentUser } from './userProvider';
import axios from 'axios';
import styles from './userAccount.module.css';

const UsersApartments = () => {
    const { currentUser, isLoadingUser } = useCurrentUser();
    const [usersApartments, setUsersApartments] = useState([]);
    const [editingAptId, setEditingAptId] = useState(null);
    const [editedData, setEditedData] = useState({ price: '', details: '' });
    const [originalData, setOriginalData] = useState({ price: '', details: '' });
    
    useEffect(() => {
        if (isLoadingUser) return;
        if (currentUser && currentUser.id !== -1) {
            axios.get(`http://localhost:5000/apartments`, {
                params: { publisher_id: currentUser.id }
            }).then(response => {
                setUsersApartments(response.data);
            }).catch(() => {
                setUsersApartments([]);
            });
        } else {
            setUsersApartments([]);
        }
    }, [currentUser, isLoadingUser]);

    const handleEdit = (apt) => {
        setEditingAptId(apt.id);
        setEditedData({ title: apt.title, price: apt.price, details: apt.details, is_approved: 1 });
        setOriginalData({ title: apt.title, price: apt.price, details: apt.details, is_approved: 1 });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData(prev => ({ ...prev, [name]: value }));
    };

    const saveChanges = async (aptId) => {
        try {
            const response = await axios.put(`http://localhost:5000/apartments/${aptId}`, editedData);
            if (response.status == 200) {
                setUsersApartments(prev =>
                    prev.map(apt =>
                        apt.id === aptId ? { ...apt, ...editedData } : apt
                    )
                );
                setEditingAptId(null);
                setEditedData({ price: '', details: '' });
                setOriginalData({ price: '', details: '' });
            } else {
                console.error("Error updating apartment:", response.statusText);
            }
        } catch (err) {
            console.error("Error:", err);
        }
    };

    const handleDelete = async (apt) => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete this apartment?");
            if (!confirmed) return;
            const response = await axios.delete(`http://localhost:5000/apartments/${apt.id}`);
            if (response.status === 200) {
                setUsersApartments(prev => prev.filter(a => a.id !== apt.id));
            }
        } catch (err) {
            console.error("Error deleting apartment:", err);
        }
    }

    const cancelChanges = () => {
        setEditedData(originalData);
        setEditingAptId(null);
    };

    const hasChanges =
        editedData.price !== String(originalData.price) ||
        editedData.details !== originalData.details;

    return (
        <div>
            <h3 className={styles.pageTitle}>My Apartments</h3>
            {usersApartments.length > 0 ? (
                <ul className={styles.apartmentsList}>
                    {usersApartments.map((apt) => (
                        <li key={apt.id} className={styles.apartmentItem}>
                            <div className={styles.apartmentItemTitle}>
                                {apt.title}
                            </div>

                            {editingAptId === apt.id ? (
                                <>
                                    <div className={styles.apartmentEditForm}>
                                        <div className={styles.apartmentFormGroup}>
                                            <label className={styles.apartmentFormLabel}>Price:</label>
                                            <input
                                                className={styles.apartmentInput}
                                                type="number"
                                                name="price"
                                                value={editedData.price}
                                                onChange={handleChange}
                                                min="0"
                                                placeholder="Enter price"
                                            />
                                        </div>
                                        <div className={styles.apartmentFormGroup}>
                                            <label className={styles.apartmentFormLabel}>Details:</label>
                                            <textarea
                                                className={`${styles.apartmentInput} ${styles.apartmentTextarea}`}
                                                name="details"
                                                value={editedData.details}
                                                onChange={handleChange}
                                                placeholder="Enter apartment details"
                                            />
                                        </div>
                                    </div>
                                    {hasChanges && (
                                        <div className={styles.buttonGroup}>
                                            <button 
                                                className={styles.primaryButton}
                                                onClick={() => saveChanges(apt.id)}
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
                                    )}
                                </>
                            ) : (
                                <>
                                    <div className={styles.apartmentDisplay}>
                                        <div className={styles.apartmentDisplayItem}>
                                            <span className={styles.apartmentDisplayLabel}>Price:</span>
                                            <span className={styles.apartmentDisplayValue}>{apt.price} ₪</span>
                                        </div>
                                        <div className={styles.apartmentDisplayItem}>
                                            <span className={styles.apartmentDisplayLabel}>Details:</span>
                                            <span className={styles.apartmentDisplayValue}>{apt.details}</span>
                                        </div>
                                    </div>
                                    <div className={styles.buttonGroup}>
                                        <button 
                                            className={styles.primaryButton}
                                            onClick={() => handleEdit(apt)}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className={styles.dangerButton}
                                            onClick={() => handleDelete(apt)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <div className={styles.emptyState}>
                    <div className={styles.emptyStateIcon}>🏠</div>
                    <p>No apartments found.</p>
                </div>
            )}
        </div>
    );
};

export default UsersApartments;

