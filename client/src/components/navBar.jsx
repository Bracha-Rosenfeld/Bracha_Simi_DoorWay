import React from 'react'
import { Link } from 'react-router-dom';

const navBar = () => {
    return (
        <div>
            <nav>
                <h2>🏠The DoorWay</h2>
                <ul>
                    <li><Link to="/login">About</Link></li>
                    <li><Link to="/login">Deals</Link></li>
                    <li><Link to="/login">Contact</Link></li>
                    <li><Link to="/login">👤</Link></li>
                    <li><Link to="/login">🛒</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default navBar
