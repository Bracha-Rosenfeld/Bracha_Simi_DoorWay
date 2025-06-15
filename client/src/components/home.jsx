import { useCurrentUser } from './userProvider'
import { Navigate, useNavigate, Link } from 'react-router-dom';
import NavBar from './navBar/navBar';
import React, { useState,useEffect } from 'react';
import SubscriptionPayment from './SubscriptionPayment';
import ViewApartments from './showSubscriptionOptions';
import PublishApartments from './publishApartment';


const home = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, isLoadingUser } = useCurrentUser();
  const [showSubscriptionOptions, setShowSubscriptionOptions] = useState(false);
  const [shouldCompleteProfile, setShouldCompleteProfile] = useState(false);

  useEffect(() => {
    if (!isLoadingUser && currentUser && currentUser.id !== -1) {
      if (!currentUser.address || !currentUser.phone) {
        setShouldCompleteProfile(true);
      } else {
        setShouldCompleteProfile(false);
      }
    }
  }, [currentUser, isLoadingUser]);


  const manageViewApartments = async () => {
    if (isLoadingUser) return; // Wait for the user to load
    if (currentUser && currentUser.id != -1) {
      //console.log("currentUser:", currentUser.id);
      const response = await fetch(`http://localhost:5000/users/${currentUser.id}/roles`);
      if (response.ok) {
        const data = await response.json();
        //console.log('data:', data);
        if (data.find(role => role === "viewer")) {
          navigate('/apartments');
        }
      }
      setShowSubscriptionOptions(true);
    }
    else { navigate('/login') }
  }

  const managePublishApartments = async () => {
    if (isLoadingUser) return; // Wait for the user to load
    if (currentUser && currentUser.id != -1) {
      navigate('/publish');
    }
    else
      navigate('/login')
  }

  return (

    <>
      <p>To use the website, please log in or sign up.</p>
      {shouldCompleteProfile && (
        <div style={{ backgroundColor: '#ffeecc', padding: '10px', border: '1px solid orange', borderRadius: '8px', margin: '10px 0' }}>
          👋 Looks like you signed up with Google. We recommend <Link to="/myAccount/details">completing your profile</Link> with your address and phone number.
        </div>
      )}
      <button onClick={manageViewApartments}>View Apartments</button>
      <button onClick={managePublishApartments}>Publish Apartment</button>
      {showSubscriptionOptions && (
        <ViewApartments />
      )}
    </>
  );
};

export default home;