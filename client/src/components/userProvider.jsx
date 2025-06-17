import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null); // נתחיל ב־null
    const [isLoadingUser, setIsLoadingUser] = useState(true);

    useEffect(() => {

        axios.get('http://localhost:5000/users/currentUser', {
            withCredentials: true
        })
            .then(res => {
                setCurrentUser(res.data);
            })
            .catch(() => {
                setCurrentUser({
                    id: -1,
                    username: '',
                    email: '',
                    phone: null || '',
                    address: null || ''
                });
            })
            .finally(() => {
                setIsLoadingUser(false);
            });

    }, []);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser, isLoadingUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useCurrentUser = () => useContext(UserContext);
