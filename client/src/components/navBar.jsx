import React from 'react'
import { Link } from 'react-router-dom';

const navBar = () => {
    return (
        <div>
            <nav>
                <h2>🏠The DoorWay</h2>
                <ul>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/deals">Deals</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/login">👤</Link></li>
                    <li><Link to="/login">🛒</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default navBar
