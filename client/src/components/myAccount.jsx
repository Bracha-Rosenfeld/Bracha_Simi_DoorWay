import React from 'react'
import { useCurrentUser, UserProvider } from './userProvider'
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import LogoutButton from './logoutButton';


const myAccount = () => {
    const navigate = useNavigate();
    const { currentUser } = useCurrentUser();
    const [userData, setUserData] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [originalData, setOriginalData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isChanged, setIsChanged] = useState(false);

    const viewUserDetails = async () => {
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
    const handleInputChange = (field, value) => {
        setUserData(prev => {
            const updated = { ...prev, [field]: value };
            // Compare with original to check if anything changed
            const changed = JSON.stringify(updated) !== JSON.stringify(originalData);
            setIsChanged(changed);
            return updated;
        });
    };

    const editUserDetails = () => {
        setIsEditing(true);
    };

    const saveChanges = async () => {
        try {
            const response = await fetch(`http://localhost:5000/users/${currentUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username: userData.username, email: userData.email, phone: userData.phone, address: userData.address }),
            })
            if (response.ok) {
                const updated = await response.json();
                setOriginalData(updated); // update original
                setIsEditing(false);
                setIsChanged(false);
            }
            else {
                console.error("Error updating user details:", response.statusText);
            }

        } catch (err) {
            console.error("Error:", err.massage);
        }
    }

    return (
        <>
            <h2>My Account</h2>
             <LogoutButton />
            <button onClick={viewUserDetails}>Display My Details</button>

            {showDetails && userData && (
                <div>
                    {isEditing ? (
                        <>
                            <div>
                                Name:
                                <input
                                    type="text"
                                    value={userData.username}
                                    onChange={(e) => handleInputChange('username', e.target.value)}
                                />
                            </div>
                            <div>
                                Email:
                                <input
                                    type="email"
                                    value={userData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                />
                            </div>
                            <div>
                                Phone:
                                <input
                                    type="tel"
                                    value={userData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                />
                            </div>
                            <div>
                                Address
                                <input
                                    type="address"
                                    value={userData.address}
                                    onChange={(e) => handleInputChange('address', e.target.value)}
                                />
                            </div>
                            <button
                                onClick={saveChanges}
                                disabled={!isChanged}
                            >
                                Save Changes
                            </button>
                        </>
                    ) : (
                        <>
                            <p><strong>Name:</strong> {userData.username}</p>
                            <p><strong>Email:</strong> {userData.email}</p>
                            <p><strong>Phone:</strong> {userData.phone}</p>
                            <p><strong>Address:</strong> {userData.address}</p>
                            <button onClick={editUserDetails}>Edit Details</button>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default myAccount
