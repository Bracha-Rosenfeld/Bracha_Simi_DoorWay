import React, { useState } from 'react'
import ViewApartments from './showSubscriptionOptions';
import PublishApartments from './publishApartment';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { useCurrentUser } from './userProvider'




const deals = () => {
  const [showPublishState, setPublishState] = useState(false);
  const { currentUser, setCurrentUser, isLoadingUser } = useCurrentUser();
  const navigate = useNavigate();
  const choosePublish = () => {
    if (isLoadingUser) return;// Wait for the user to load

    if (currentUser && currentUser.id != -1) {
      setPublishState(true);
    }
    else
      navigate('/login')
  }
  return (
    <>
      <ViewApartments></ViewApartments>
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', width: '250px' }}>
        <h3>Publish</h3>
        <p>Publish your apartment for sale or rent so that all our clients get to see it</p>
        <p><strong>Price:</strong> No fee </p>
        <button onClick={() => choosePublish()}>Choose to Publish</button>
      </div>
      {showPublishState && <PublishApartments />}
    </>
  )
}

export default deals;