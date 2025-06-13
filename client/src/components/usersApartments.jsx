import React, { useState } from 'react'

const usersApartments = ({ usersApartments, setUsersApartments }) => {
    const [editingAptId, setEditingAptId] = useState(null);
    const [editedPrice, setEditedPrice] = useState('');
    const [originalPrice, setOriginalPrice] = useState('');
    const handleEditPrice = (apt) => {
        setEditingAptId(apt.id);
        setEditedPrice(apt.price);
        setOriginalPrice(apt.price);
    };

    const handlePriceChange = (e) => {
        setEditedPrice(e.target.value);
    };

    const savePriceChange = async (aptId) => {
        try {
            const response = await fetch(`http://localhost:5000/apartments/${aptId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ price: editedPrice }),
            });
            if (response.ok) {
                // Update local state
                setUsersApartments(prev =>
                    prev.map(apt =>
                        apt.id === aptId ? { ...apt, price: editedPrice } : apt
                    )
                );
                setEditingAptId(null);
                setEditedPrice('');
                setOriginalPrice('');
            } else {
                console.error("Error updating apartment price:", response.statusText);
            }
        } catch (err) {
            console.error("Error:", err);
        }
    };
    return (
        <div>
            <h3>My Apartments</h3>
            {usersApartments.length > 0 ? (
                <ul>
                    {usersApartments.map((apt) => (
                        <li key={apt.id}>
                            <div><strong>{apt.title} </strong> </div>
                            <div>
                                <strong>Price: </strong>
                                {editingAptId === apt.id ? (
                                    <>
                                        <input
                                            type="number"
                                            value={editedPrice}
                                            onChange={handlePriceChange}
                                            min="0"
                                        />
                                        {editedPrice !== String(originalPrice) && (
                                            <button onClick={() => savePriceChange(apt.id)}>
                                                Save
                                            </button>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {apt.price}
                                        <button style={{ marginLeft: '10px' }} onClick={() => handleEditPrice(apt)}>
                                            Edit Price
                                        </button>
                                    </>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No apartments found.</p>
            )}
        </div>)
}

export default usersApartments; 