import React, { useEffect, useState } from 'react';
import { useCurrentUser } from './userProvider';
import { Navigate, useNavigate, Link, Outlet } from 'react-router-dom';
import LogoutButton from './logoutButton';

const MyAccount = () => {
    const navigate = useNavigate();
    const { currentUser, isLoadingUser } = useCurrentUser();
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isLoadingUser) return; // מחכה לטעינת המשתמש

        if (!currentUser || currentUser.id === -1) {
            setError('User not logged in');
            navigate('/login');
        }
    }, [currentUser, isLoadingUser]);

    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <h2>My Account</h2>
            <LogoutButton />

            <nav style={{ marginBottom: '20px' }}>
                <button><Link to="details">Display My Details</Link></button>
                <button><Link to="apartments">My Apartments</Link></button>
            </nav>

            <Outlet />
        </>
    );
};

export default MyAccount;
