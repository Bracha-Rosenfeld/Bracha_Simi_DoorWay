import React from 'react'
import { useCurrentUser, UserProvider } from './userProvider'
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { useState ,useEffect} from 'react';
import LogoutButton from './logoutButton';
import UsersDetails from './usersDetails';
import UsersApartments from './usersApartments';


const myAccount = () => {
    const navigate = useNavigate();
    const { currentUser ,isLoadingUser} = useCurrentUser();
    const [userData, setUserData] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [usersApartments, setUsersApartments] = useState(null);
    const [showApartments, setShowApartments] = useState(false);
    const [originalData, setOriginalData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isLoadingUser) return;// Wait for the user to load

        if (currentUser && currentUser.id !== -1) { } else {
            setError('User not logged in');
            navigate('/login');

        }
    }, [currentUser, isLoadingUser]);

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
                    setError("Failed to fetch user data");
                }
            }
            // else {
            //     navigate('/login')
            // }
        }
        catch (err) {
            setError("Error:", err);
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
                    setError("Failed to fetch user apartments");
                }
            }
            // else {
            //     navigate('/login')
            // }
        }
        catch (err) {
            setError("Error:", err);
        }
    }


    if (error) return <div>Error: {error}</div>;
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
