import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout';
import Home from '../components/home/home';
import About from '../components/about/about';
import Deals from '../components/deals/deals';
import Login from './loginAndRegister/login';
import Register from './loginAndRegister/register';
import Apartments from '../components/apartments/apartments';
import ShowSubscriptionOptions from './deals/showSubscriptionOptions'
import PublishApartment from './publishApartment/publishApartment'
import MyAccount from '../components/userAccount/myAccount';
import UsersDetails from '../components/userAccount/usersDetails';
import UsersApartments from '../components/userAccount/usersApartments';
import CompleteRegister from './loginAndRegister/completeRegister';
import AdminHome from './adminHome/adminHome';
import AllUsers from './allUsers/allUsers';
import NotFound from '../components/notFound';
import Cart from './apartments/cart';
import { useCurrentUser } from './userProvider';
import axios from 'axios';

const mainApp = () => {
    const { currentUser, isLoadingUser } = useCurrentUser();
    const [userRole, setUserRole] = useState(null);
    const fetchCurrentUserRole = async () => {
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
                console.error('Error fetching user roles:', error);
                setUserRole(null); // Fallback to myAccount if roles fetch fails
            });
        }
        else {
            setUserRole(null);
        }

    }

    useEffect(() => {
        fetchCurrentUserRole();
    }, [currentUser, isLoadingUser]);

    useEffect(() => {
        fetchCurrentUserRole();
    }, [])

    return (
        <BrowserRouter>
            <Layout userRole={userRole}>
                <Routes>
                    <Route path="/" element={userRole === 'admin' ? <Navigate to={'/adminHome'} /> : <Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/allusers" element={userRole == 'admin' ? <AllUsers /> : <NotFound />} />
                    <Route path="/deals" element={<Deals />} />
                    <Route path="/login" element={userRole == null ? <Login /> : <Navigate to={'/myAccount'} />} />
                    <Route path="/register" element={userRole == null ? <Register /> : <Navigate to={'/'} />} />
                    <Route path="/completeRegister" element={currentUser == null ? <Navigate to={'/login'} /> : <CompleteRegister />} />
                    <Route path="/myAccount" element={userRole ? <MyAccount /> : <Navigate to={'/login'} />}>
                        <Route index element={<Navigate to={'/myAccount/details'} />} />
                        <Route path="details" element={<UsersDetails />} />
                        <Route path="apartments" element={<UsersApartments />} />
                    </Route>
                    <Route path="/apartments" element={(currentUser && currentUser.id !== -1) ? (userRole === 'viewer' || userRole == 'admin') ? <Apartments /> : <Navigate to={'/subsciptionOptions'} /> : <Navigate to={'/login'} />} />
                    <Route path="/publish" element={(currentUser == null || currentUser.id == -1) ? <Navigate to={'/login'} /> : <PublishApartment />} />
                    <Route path='/subsciptionOptions' element={<ShowSubscriptionOptions setUserRole={setUserRole} />} />
                    <Route path="/cart" element={userRole ? <Cart /> : <Navigate to={'/login'} />} />
                    <Route path='/adminHome' element={userRole === 'admin' ? <AdminHome /> : <Navigate to={'/'} />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default mainApp;