import React, { useState, useEffect } from 'react'
import ViewApartments from './showSubscriptionOptions';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { useCurrentUser } from './userProvider'
import ExtendSubscription from './ExtendSubscription';

const deals = () => {
  const { currentUser, setCurrentUser, isLoadingUser } = useCurrentUser();
  const [userRoles, setUserRoles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      if (currentUser && currentUser.id && currentUser.id !== -1) {
        try {
          const res = await fetch(`http://localhost:5000/users/${currentUser.id}/roles`);
          if (res.ok) {
            const roles = await res.json();
            setUserRoles(roles);
          }
        } catch (err) {
          console.error('Failed to fetch user roles:', err);
        }
      }
    };
    fetchRoles();
  }, [currentUser]);

  const isViewer = userRoles.includes('viewer');

  const choosePublish = () => {
    navigate('/publish');
  }

  return (
    <>
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', width: '250px' }}>
        <h3>Publish - For Free!</h3>
        <p>Publish your apartment for sale or rent so that all our clients get to see it</p>
        <p><strong>Price:</strong> No fee </p>
        <button onClick={() => choosePublish()}>Choose to Publish</button>
      </div>
      {isViewer ? <ExtendSubscription /> : <ViewApartments />}
    </>
  );
};

export default deals;
