// userProvider.js
import React, { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null); // נתחיל ב־null
    const [isLoadingUser, setIsLoadingUser] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/users/me', {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.ok ? res.json() : Promise.reject())
            .then(user => setCurrentUser(user))
            .catch(() => setCurrentUser({
                id: -1, username: '', email: '', phone: null, address: null
            }))
            .finally(() => setIsLoadingUser(false));
    }, []);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser, isLoadingUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useCurrentUser = () => useContext(UserContext);
