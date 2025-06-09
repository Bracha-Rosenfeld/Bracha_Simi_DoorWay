import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout';
import Home from '../components/home';
import About from '../components/about/about';
import Deals from '../components/deals';
import Login from '../components/login/login';
import Register from '../components/register/register';
import Apartments from '../components/apartments';
import Publish from './publish'
import MyAccount from '../components/myAccount';
import UserDetails from '../components/userDetails/userDetails';
import NotFound from '../components/notFound';

const mainApp = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/deals" element={<Deals />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/userDetails" element={<UserDetails />} />
                    <Route path='/myAccount' element={<MyAccount />} />
                    <Route path="/apartments" element={<Apartments />} />
                    <Route path="/publish" element={<Publish />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default mainApp;