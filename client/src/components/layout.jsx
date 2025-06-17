import React from 'react'
import NavBar from './navBar/navBar';
import Contact from './contact/contact';

const layout = ({ userRole,children }) => {
    return (
        <>
            <NavBar userRole={userRole}/>
            <main>{children}</main>
            <Contact userRole={userRole}/>
        </>
    )
}

export default layout