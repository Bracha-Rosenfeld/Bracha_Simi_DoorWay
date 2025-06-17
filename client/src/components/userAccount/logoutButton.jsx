import React from 'react';
import { useCurrentUser } from '../userProvider';
import { useNavigate } from 'react-router-dom';
import styles from './MyAccount.module.css';

function LogoutButton() {
    const { setCurrentUser } = useCurrentUser();
    const navigate = useNavigate();
    
    const handleLogout = async () => {
        await fetch('http://localhost:5000/users/logout', {
            method: 'POST',
            credentials: 'include'
        });
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