import React, { useState } from 'react'

const UsersApartments = ({ usersApartments, setUsersApartments }) => {
    const [editingAptId, setEditingAptId] = useState(null);
    const [editedData, setEditedData] = useState({ price: '', details: '' });
    const [originalData, setOriginalData] = useState({ price: '', details: '' });

    const handleEdit = (apt) => {
        setEditingAptId(apt.id);
        setEditedData({ tilte: apt.title ,price: apt.price, details: apt.details, is_approved: 1});
        setOriginalData({tilte: apt.title, price: apt.price, details: apt.details, is_approved: 1 });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData(prev => ({ ...prev, [name]: value }));
    };

    const saveChanges = async (aptId) => {
        try {
            const response = await fetch(`http://localhost:5000/apartments/${aptId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editedData),
            });
            if (response.ok) {
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
