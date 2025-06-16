import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import LogoutButton from './logoutButton';

const MyAccount = () => {
    const [error, setError] = useState(null);
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
