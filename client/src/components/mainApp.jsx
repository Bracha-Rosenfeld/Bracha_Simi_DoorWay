import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../components/home';
const mainApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                
            </Routes>
        </BrowserRouter>
    )
}

export default mainApp;