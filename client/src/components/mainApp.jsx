import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../components/home';
import About from '../components/about';
import Deals from '../components/deals';
import Login from '../components/login';
import Signup from '../components/signup';
const mainApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/deals" element={<Deals/>} />
                <Route path="/login" element={<Login/>} />
                <Route path='signup' element={<Signup/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default mainApp;