// import React, { createContext, useState, useContext } from 'react';

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//     const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) || { id: -1, username: '', email: '' });

//     return (
//         <UserContext.Provider value={{ currentUser, setCurrentUser }}>
//             {children}
//         </UserContext.Provider>
//     );
// };

// export const useCurrentUser = () => useContext(UserContext);
import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({ id: -1, username: '', email: '' });

    // On mount, try to get the user from the cookie (via backend)
    useEffect(() => {
        fetch('http://localhost:5000/users/me', {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => {
                if (res.ok) return res.json();
                throw new Error('Not authenticated');
            })
            .then(user => {
                setCurrentUser(user);
            })
            .catch(() => {
                setCurrentUser({ id: -1, username: '', email: '' });
            });
    }, []);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useCurrentUser = () => useContext(UserContext);