import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useCurrentUser } from './userProvider';
const apartmentDetails = ({ apt }) => {
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState([]);
  const { currentUser, isLoadingUser } = useCurrentUser();
  const [isInCart, setIsInCart] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cart = await axios.get(`http://localhost:5000/users/${currentUser.id}/cart`);
        setFavorites(cart.data);
        setIsInCart(cart.data.some(item => item.id === apt.id));
      } catch (err) {
        setError(err.response?.data?.error || 'Error fetching data');
      }
    };
    if (isLoadingUser) return; // Wait for the user to load
    if (currentUser && currentUser.id !== -1) {
      fetchData();
    } else {
      setError('User not logged in');
    }
  }, [currentUser, isLoadingUser]);

  const handleAddToCart = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/users/${currentUser.id}/cart`, {
        apartment_id: apt.id,
      });
      if (response.status === 200) {
        setIsInCart(true);
      }


    } catch (err) {
      setError(err.response?.data?.error || 'Error adding to favorites');
    }
    // }
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
      <h2><strong>{apt.title}</strong> </h2>
      <p><strong>address:</strong> {apt.address}</p>
      <p><strong>price:</strong> {apt.price} ₪</p>
      <p><strong>size:</strong> {apt.area} m²</p>
      <p><strong>rooms:</strong> {apt.num_of_rooms}</p>
      <p><strong>floor:</strong> {apt.floor_number}</p>
      <p> <strong>{apt.type == 'rent' ? 'for rent' : 'for sale'}</strong> </p>
      <p><strong>description:</strong> {apt.details}</p>
      <button onClick={handleAddToCart} disabled={isInCart} > {isInCart ? 'Already in Cart' : 'Add to Cart'}</button>

    </div>
  )
}

export default apartmentDetails