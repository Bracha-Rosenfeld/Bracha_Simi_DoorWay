import React from 'react'
import { useCurrentUser, UserProvider } from './userProvider'
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import LogoutButton from './logoutButton';
import UsersDetails from './usersDetails';
import UsersApartments from './usersApartments';


const myAccount = () => {
    const navigate = useNavigate();
    const { currentUser } = useCurrentUser();
    const [userData, setUserData] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [usersApartments, setUsersApartments] = useState(null);
    const [showApartments, setShowApartments] = useState(false);
    const [originalData, setOriginalData] = useState(null);



    const showUserDetails = async () => {
        try {
            if (currentUser && currentUser.id != -1) {
                const response = await fetch(`http://localhost:5000/users/${currentUser.id}`);
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                    setOriginalData(data);
                    setShowDetails(true);
                }
                else {
                    console.error("Failed to fetch user data");
                }
            }
            // else {
            //     navigate('/login')
            // }
        }
        catch (err) {
            console.error("Error:", err);
        }
    }

    const showMyApartments = async () => {
        try {
            if (currentUser && currentUser.id != -1) {
                const response = await fetch(`http://localhost:5000/apartments?publisher_id=${currentUser.id}`);
                if (response.ok) {
                    const data = await response.json();
                    setUsersApartments(data);
                    setShowApartments(true);
                }
                else {
                    console.error("Failed to fetch user apartments");
                }
            }
            // else {
            //     navigate('/login')
            // }
        }
        catch (err) {
            console.error("Error:", err);
        }
    }


    return (
        <>
            <h2>My Account</h2>
            <LogoutButton />
            <button onClick={showUserDetails}>Display My Details</button>

            {showDetails && userData && (
                <UsersDetails
                    userData={userData}
                    setUserData={setUserData}
                    originalData={originalData}
                    setOriginalData={setOriginalData}
                />
            )}
            <button onClick={showMyApartments} >My Apartments</button>
            {showApartments && usersApartments && (
                <UsersApartments usersApartments={usersApartments} setUsersApartments={setUsersApartments} />
            )}
        </>
    );
};

export default myAccount
