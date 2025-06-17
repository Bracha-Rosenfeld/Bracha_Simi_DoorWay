import React from 'react';
import { useCurrentUser } from '../userProvider';
import { useNavigate } from 'react-router-dom';
import styles from './MyAccount.module.css';
import axios from 'axios';
function LogoutButton() {
    const { setCurrentUser } = useCurrentUser();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await axios.post(
            'http://localhost:5000/users/logout',
            {},
            { withCredentials: true }
        );

        setCurrentUser(null);
        navigate('/login');
    };

    return (
        <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
        </button>
    );
}

export default LogoutButton;