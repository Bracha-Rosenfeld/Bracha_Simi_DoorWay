import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout';
import Home from '../components/home';
import About from '../components/about/about';
import Deals from '../components/deals';
import Login from '../components/login/login';
import Register from '../components/register/register';
import Apartments from '../components/apartments';
import ShowSubscriptionOptions from './showSubscriptionOptions'
import PublishApartment from './publishApartment'
import MyAccount from '../components/myAccount';
import UsersDetails from '../components/usersDetails';
import UsersApartments from '../components/usersApartments';
import UserDetails from '../components/userDetails/userDetails';
import AdminHome from '../components/adminHome';
import NotFound from '../components/notFound';
import Cart from './cart';
import { useCurrentUser } from './userProvider';
import axios from 'axios';

const mainApp = () => {
    const { currentUser, isLoadingUser } = useCurrentUser();
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        if (isLoadingUser) return;
        if (currentUser && currentUser.id != -1) {
            const roles = axios.get(`http://localhost:5000/users/${currentUser.id}/roles`, {
                withCredentials: true
            }).then((response) => {
                if (response.data && response.data.length > 0) {
                    if (response.data.includes('admin')) {
                        setUserRole('admin');
                    } else if (response.data.includes('viewer')) {
                        setUserRole('viewer');
                    } else {
                        setUserRole('publiehsr');
                    }
                } else {
                    setUserRole(null);
                }
            }).catch((error) => {
                setError('Error fetching user roles:', error);
                setUserRole(null); // Fallback to myAccount if roles fetch fails
            });
        }
        else {
            setUserRole(null);
        }
    }, [currentUser, isLoadingUser]);
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={userRole === 'admin' ? <Navigate to={'/adminHome'} /> : <Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/deals" element={<Deals />} />
                    <Route path="/login" element={userRole == null ? <Login /> : <Navigate to={'/myAccount'} />} />
                    <Route path="/register" element={userRole == null ? <Register /> : <Navigate to={'/'} />} />
                    <Route path="/userDetails" element={currentUser == null ? <Navigate to={'/login'} /> : <UserDetails />} />
                    <Route path="/myAccount" element={userRole ? <MyAccount /> : <Navigate to={'/login'} />}>
                        <Route path="details" element={<UsersDetails />} />
                        <Route path="apartments" element={<UsersApartments />} />
                    </Route>
                    <Route path="/apartments" element={(currentUser == null || currentUser.id == -1) ? userRole === 'viewer' ? <Apartments /> : <Navigate to={'/subsciptionOptions'} /> : <Navigate to={'/login'} />} />
                    <Route path="/publish" element={(currentUser == null || currentUser.id == -1) ? <Navigate to={'/login'} /> : <PublishApartment />} />
                    <Route path='/subsciptionOptions' element={<ShowSubscriptionOptions />} />
                    <Route path="/cart" element={userRole ? <Cart /> : <Navigate to={'/login'} />} />
                    <Route path='/adminHome' element={userRole === 'admin' ? <AdminHome /> : <Navigate to={'/'} />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default mainApp;