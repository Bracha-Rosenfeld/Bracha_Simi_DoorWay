import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useCurrentUser } from '../userProvider';
import ApartmentDetails from './apartmentDetails';
import axios from 'axios';
import styles from './apartments.module.css'


const Cart = () => {
    const navigate = useNavigate();
    const { currentUser, isLoadingUser } = useCurrentUser();
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isLoadingUser) return;

        if (currentUser && currentUser.id !== -1) {
            axios.get(`http://localhost:5000/users/cart`, { withCredentials: true })
                .then(response => {
                    setFavorites(response.data);
                })
                .catch(err => {
                    setError(err.response?.data?.error || 'Error fetching cart');
                });
        } else {
            setError('User not logged in');
            navigate('/login');

        }
    }, [currentUser, isLoadingUser]);

    const handleRemove = async (apartmentId) => {
        try {
            await axios.delete(`http://localhost:5000/users/cart/${apartmentId}` ,{ withCredentials: true });
            setFavorites((prev) =>
                prev.filter((item) => item.id !== apartmentId)
            );
        } catch (err) {
            setError(err.response?.data?.error || 'Error removing from cart');
        }
    };

    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Your Favorites</h2>
            {favorites.length === 0 ? (
                <p>No favorites found.</p>
            ) : (
                <ul>
                    {favorites.map((item) => (
                        <li key={item.apartment_id}>
                            <ApartmentDetails apt={item} />
                            <button onClick={() => handleRemove(item.id)}>
                                Remove
                            </button>
                            
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;
