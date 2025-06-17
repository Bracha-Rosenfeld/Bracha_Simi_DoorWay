// import React, { useState, useEffect } from 'react'
// import { useCurrentUser } from './userProvider'
// import axios from 'axios'

// const addToCartButton = ({aptId}) => {
//     const { currentUser, isLoadingUser } = useCurrentUser();
//     const [favorites, setFavorites] = useState([]);
//     const [isInCart, setIsInCart] = useState(false);
//     const [error, setError] = useState('');
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const cart = await axios.get(`http://localhost:5000/users/${currentUser.id}/cart`);
//                 setFavorites(cart.data);
//                 setIsInCart(cart.data.some(item => item.id === aptId));
//             } catch (err) {
//                 setError(err.response?.data?.error || 'Error fetching data');
//             }
//         };
//         if (isLoadingUser) return; // Wait for the user to load
//         if (currentUser && currentUser.id !== -1) {
//             fetchData();
//         } else {
//             setError('User not logged in');
//         }
//     }, [currentUser, isLoadingUser]);

//     const handleAddToCart = async () => {
//         try {
//             const response = await axios.post(`http://localhost:5000/users/${currentUser.id}/cart`, {
//                 apartment_id: aptId,
//             });
//             if (response.status === 200) {
//                 setIsInCart(true);
//             }


//         } catch (err) {
//             setError(err.response?.data?.error || 'Error adding to favorites');
//         }
//         // }
//     }
//     if (error) {
//         return <div>Error: {error}</div>;
//     } return (
//         <button onClick={handleAddToCart} disabled={isInCart} > {isInCart ? 'Already in Cart' : 'Add to Cart'}</button>
//     )
// }

// export default addToCartButton  
import React, { useState, useEffect } from 'react'
import { useCurrentUser } from '../userProvider'
import axios from 'axios'
import styles from './apartments.module.css'

const AddToCartButton = ({aptId}) => {
    const { currentUser, isLoadingUser } = useCurrentUser();
    const [favorites, setFavorites] = useState([]);
    const [isInCart, setIsInCart] = useState(false);
    const [error, setError] = useState('');
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const cart = await axios.get(`http://localhost:5000/users/${currentUser.id}/cart`);
                setFavorites(cart.data);
                setIsInCart(cart.data.some(item => item.id === aptId));
            } catch (err) {
                setError(err.response?.data?.error || 'Error fetching data');
            }
        };
        if (isLoadingUser) return;
        if (currentUser && currentUser.id !== -1) {
            fetchData();
        } else {
            setError('User not logged in');
        }
    }, [currentUser, isLoadingUser]);
    
    const handleAddToCart = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/users/${currentUser.id}/cart`, {
                apartment_id: aptId,
            });
            if (response.status === 200) {
                setIsInCart(true);
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Error adding to favorites');
        }
    }
    
    if (error) {
        return <div className={styles.errorMessage}>Error: {error}</div>;
    }
    
    return (
        <button 
            className={styles.addToCartButton}
            onClick={handleAddToCart} 
            disabled={isInCart}
        >
            {isInCart ? 'Already in Cart' : 'Add to Cart'}
        </button>
    )
}

export default AddToCartButton