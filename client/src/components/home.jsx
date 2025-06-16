import { useCurrentUser } from './userProvider'
import { useNavigate, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


const home = () => {
  const navigate = useNavigate();
  const { currentUser, isLoadingUser } = useCurrentUser();
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
    navigate('/apartments');
  }

  const managePublishApartments = async () => {
    navigate('/publish');
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
    </>
  );
};

export default home;