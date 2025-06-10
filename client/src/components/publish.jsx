import React from 'react'
import { useCurrentUser } from './userProvider'
import { Navigate, useNavigate, Link } from 'react-router-dom';


const publish = () => {
    const { currentUser, setCurrentUser } = useCurrentUser();
   const navigate = useNavigate();

    const managePublishApartments = async () => {
    if (currentUser && currentUser.id != -1) {
      navigate('/publish');
    }
    else
      navigate('/login')
  }

  return (
    <div>
      <button onClick={managePublishApartments}>Publish an Apartment!</button>
    </div>
  )
}

export default publish;
