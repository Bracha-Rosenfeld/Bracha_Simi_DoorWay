import { useCurrentUser } from './userProvider'
import { Navigate, useNavigate, Link } from 'react-router-dom';
import NavBar from './navBar/navBar';
import React, { useState } from 'react';
import SubscriptionPayment from './SubscriptionPayment';
import ViewApartments from './showSubscriptionOptions';
import PublishApartments from './publishApartment';


const home = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useCurrentUser();
  const [showSubscriptionOptions, setShowSubscriptionOptions] = useState(false);

  const manageViewApartments = async () => {
    if (currentUser && currentUser.id != -1) {
      console.log("currentUser:", currentUser.id);
      const response = await fetch(`http://localhost:5000/usersRoles/${currentUser.id}`);
      if (response.ok) {
        const data = await response.json();
        console.log('data:', data);

        if (data.find(role => role === "viewer")) {
          navigate('/apartments');
        }
      }
      setShowSubscriptionOptions(true);
    }
    else { navigate('/login') }
  }

  const managePublishApartments = async () => {
    if (currentUser && currentUser.id != -1) {
      navigate('/publish');
    }
    else
      navigate('/login')
  }



  return (
 
    <>
      <p>To use the website, please log in or sign up.</p>
      <button onClick={manageViewApartments}>View Apartments</button>
      <button onClick={managePublishApartments}>Publish Apartment</button>
      {showSubscriptionOptions && (
        <ViewApartments/>
      )}
    </>
  );
};

export default home;