import React from 'react'
import NavBar from './navBar';
import Contact from './contact';

const layout = ({ children }) => {
    return (
        <>
            <NavBar />
            <main>{children}</main>
            <Contact/>
        </>
    )
}

export default layout