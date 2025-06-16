import React, { useState, useEffect } from 'react'
import { useCurrentUser } from './userProvider';
import axios from 'axios';
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
            <h3>My Apartments</h3>
            {usersApartments.length > 0 ? (
                <ul>
                    {usersApartments.map((apt) => (
                        <li key={apt.id}>
                            <div><strong>{apt.title}</strong></div>

                            {editingAptId === apt.id ? (
                                <>
                                    <div>
                                        <strong>Price: </strong>
                                        <input
                                            type="number"
                                            name="price"
                                            value={editedData.price}
                                            onChange={handleChange}
                                            min="0"
                                        />
                                    </div>
                                    <div>
                                        <strong>Details: </strong>
                                        <input
                                            type="text"
                                            name="details"
                                            value={editedData.details}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {hasChanges && (
                                        <>
                                            <button onClick={() => saveChanges(apt.id)}>Save</button>
                                            <button onClick={cancelChanges}>Cancel</button>
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    <div>
                                        <strong>Price: </strong>{apt.price}
                                    </div>
                                    <div>
                                        <strong>Details: </strong>{apt.details}
                                    </div>
                                    <button onClick={() => handleEdit(apt)}>Edit</button>
                                    <button onClick={() => handleDelete(apt)}>Delete</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No apartments found.</p>
            )}
        </div>
    );
};

export default UsersApartments;
