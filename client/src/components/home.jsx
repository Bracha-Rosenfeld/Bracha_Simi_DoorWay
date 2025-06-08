import React from 'react'
import { useCurrentUser } from './userProvider'
import { Navigate, useNavigate, Link } from 'react-router-dom';
import NavBar from './navBar/navBar';

const home = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useCurrentUser();
  //const data = '';
  // const checkIfUserExists = async () => {
  //   if (currentUser && currentUser.id != -1) {
  //     console.log("currentUser:", currentUser.id);
  //     const response = await fetch(`http://localhost:3000/users?id=${currentUser.id}`);
  //     if (response.ok) {
  //       data = await response.json();
  //       return true;
  //     }
  //   }
  //   else return false;
  // }
  const manageViewApartments = async () => {
    if (currentUser && currentUser.id != -1) {
      console.log("currentUser:", currentUser.id);
      const response = await fetch(`http://localhost:3000/users?id=${currentUser.id}`);
      if (response.ok) {
        const data = await response.json();
      }
      if (data.find(role => role == viewer)) {
        Navigate('/apartments');
      }
    }
    else { navigate('/login') }
  }

  const managePublishApartments = async () => {
    if (currentUser && currentUser.id != -1) {
      navigate('/publish')
    }
    else
      navigate('/login')
  }

  return (
    <div>
      {/* <NavBar /> */}
      <main >
        <p>To use the website please log in or sign up.</p>
        <button onClick={manageViewApartments}>View</button>
        <button onClick={managePublishApartments}>publish</button>
      </main>
    </div>
  );
};

export default home;