// import React, { useEffect, useState } from 'react'
// import axios from 'axios';

// const AllUsers = () => {
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const fetchUsers = () => {
//         axios.get('http://localhost:5000/users/', {
//             withCredentials: true
//         }).then((response) => {
//             if (response.data) {
//                 setUsers(response.data);
//             }
//         }).catch((error) => {
//             console.error('Failed to fetch users:', error);
//         });
//     };

//     const handleDelete = async (userId) => {
//         axios.delete(`http://localhost:5000/users/${userId}`, {
//             withCredentials: true
//         })
//             .then((response) => {
//                 if (response.status === 200) {
//                     // Remove the deleted user from the list
//                     setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
//                 } else {
//                     console.warn('Unexpected server response:', response);
//                     alert('Failed to delete the user.');
//                 }
//             })
//             .catch((error) => {
//                 console.error('Error deleting the user:', error);
//                 alert('An error occurred while trying to delete the user.');
//             });
//     };



//     return (
//         <div>
//             <h2>All Users</h2>
//             {users.length === 0 ? (
//                 <p>No users found.</p>
//             ) : (
//                 <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
//                     <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>Username</th>
//                             <th>Email</th>
//                             <th>Phone</th>
//                             <th>Address</th>
//                             <th>Longitude</th>
//                             <th>Latitude</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map((user) => (
//                             <tr key={user.id}>
//                                 <td>{user.id}</td>
//                                 <td>{user.username}</td>
//                                 <td>{user.email}</td>
//                                 <td>{user.phone}</td>
//                                 <td>{user.address}</td>
//                                 <td>{user.longitude}</td>
//                                 <td>{user.latitude}</td>
//                                 <td>
//                                     <button onClick={() => handleDelete(user.id)}>Delete</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// }
// export default AllUsers;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './AllUsers.module.css';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('id');
    const [sortDirection, setSortDirection] = useState('asc');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        setLoading(true);
        axios.get('http://localhost:5000/users/', {
            withCredentials: true
        }).then((response) => {
            if (response.data) {
                setUsers(response.data);
            }
        }).catch((error) => {
            console.error('Failed to fetch users:', error);
        }).finally(() => {
            setLoading(false);
        });
    };

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!userToDelete) return;

        axios.delete(`http://localhost:5000/users/${userToDelete.id}`, {
            withCredentials: true
        })
            .then((response) => {
                if (response.status === 200) {
                    setUsers(prevUsers => prevUsers.filter(user => user.id !== userToDelete.id));
                    setShowDeleteModal(false);
                    setUserToDelete(null);
                } else {
                    console.warn('Unexpected server response:', response);
                    alert('Failed to delete the user.');
                }
            })
            .catch((error) => {
                console.error('Error deleting the user:', error);
                alert('An error occurred while trying to delete the user.');
            });
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setUserToDelete(null);
    };

    const filteredUsers = users.filter(user =>
        user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone?.includes(searchTerm) ||
        user.address?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedUsers = [...filteredUsers].sort((a, b) => {
        const aValue = a[sortField] || '';
        const bValue = b[sortField] || '';

        if (sortDirection === 'asc') {
            return aValue.toString().localeCompare(bValue.toString(), undefined, { numeric: true });
        } else {
            return bValue.toString().localeCompare(aValue.toString(), undefined, { numeric: true });
        }
    });

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const getSortIcon = (field) => {
        if (sortField !== field) return '↕️';
        return sortDirection === 'asc' ? '↑' : '↓';
    };

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loadingSpinner}>
                    <div className={styles.spinner}></div>
                    <p>Loading users...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>User Management</h2>
                <div className={styles.titleUnderline}></div>
            </div>

            <div className={styles.controls}>
                <div className={styles.searchContainer}>
                    <div className={styles.searchIcon}>🔍</div>
                    <input
                        type="text"
                        placeholder="Search users by name, email, phone, or address..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>
                <div className={styles.statsContainer}>
                    <div className={styles.statCard}>
                        <span className={styles.statNumber}>{users.length}</span>
                        <span className={styles.statLabel}>Total Users</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statNumber}>{filteredUsers.length}</span>
                        <span className={styles.statLabel}>Filtered Results</span>
                    </div>
                </div>
            </div>

            {filteredUsers.length === 0 ? (
                <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>👥</div>
                    <h3>No users found</h3>
                    <p>{searchTerm ? 'Try adjusting your search criteria' : 'No users are currently registered'}</p>
                </div>
            ) : (
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('id')} className={styles.sortableHeader}>
                                    ID <span className={styles.sortIcon}>{getSortIcon('id')}</span>
                                </th>
                                <th onClick={() => handleSort('username')} className={styles.sortableHeader}>
                                    Username <span className={styles.sortIcon}>{getSortIcon('username')}</span>
                                </th>
                                <th onClick={() => handleSort('email')} className={styles.sortableHeader}>
                                    Email <span className={styles.sortIcon}>{getSortIcon('email')}</span>
                                </th>
                                <th onClick={() => handleSort('phone')} className={styles.sortableHeader}>
                                    Phone <span className={styles.sortIcon}>{getSortIcon('phone')}</span>
                                </th>
                                <th onClick={() => handleSort('address')} className={styles.sortableHeader}>
                                    Address <span className={styles.sortIcon}>{getSortIcon('address')}</span>
                                </th>
                                <th>Location</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedUsers.map((user) => (
                                <tr key={user.id} className={styles.tableRow}>
                                    <td className={styles.idCell}>{user.id}</td>
                                    <td className={styles.usernameCell}>
                                        <div className={styles.userInfo}>
                                            <div className={styles.avatar}>
                                                {user.username?.charAt(0).toUpperCase() || 'U'}
                                            </div>
                                            <span>{user.username}</span>
                                        </div>
                                    </td>
                                    <td className={styles.emailCell}>{user.email}</td>
                                    <td className={styles.phoneCell}>{user.phone}</td>
                                    <td className={styles.addressCell}>{user.address}</td>
                                    <td className={styles.locationCell}>
                                        {user.longitude && user.latitude ? (
                                            <div className={styles.coordinates}>
                                                <div>📍 {parseFloat(user.latitude).toFixed(4)}, {parseFloat(user.longitude).toFixed(4)}</div>
                                            </div>
                                        ) : (
                                            <span className={styles.noLocation}>No location</span>
                                        )}
                                    </td>
                                    <td className={styles.actionsCell}>
                                        <button
                                            onClick={() => handleDeleteClick(user)}
                                            className={styles.deleteButton}
                                            title="Delete user"
                                        >
                                            🗑️ Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h3>Confirm Deletion</h3>
                        </div>
                        <div className={styles.modalBody}>
                            <p>Are you sure you want to delete this user?</p>
                            <div className={styles.userPreview}>
                                <strong>{userToDelete?.username}</strong>
                                <br />
                                <span className={styles.userEmail}>{userToDelete?.email}</span>
                            </div>
                            <p className={styles.warningText}>This action cannot be undone.</p>
                        </div>
                        <div className={styles.modalActions}>
                            <button
                                onClick={cancelDelete}
                                className={styles.cancelButton}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className={styles.confirmDeleteButton}
                            >
                                Delete User
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllUsers;