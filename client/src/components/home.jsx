import { useCurrentUser } from './userProvider'
import { Navigate, useNavigate, Link } from 'react-router-dom';
import NavBar from './navBar/navBar';
import React, { useState } from 'react';
import SubscriptionPayment from './SubscriptionPayment';
import ViewApartments from './viewApartments';
import Publish from './publish';

const home = () => {
  // const navigate = useNavigate();
  // const { currentUser, setCurrentUser } = useCurrentUser();
  // const [showPayment, setShowPayment] = useState(false);
  // const [amountToPay, setAmountToPay] = useState(null);
  // const [showSubscriptionOptions, setShowSubscriptionOptions] = useState(false);

  // const manageViewApartments = async () => {
  //   if (currentUser && currentUser.id != -1) {
  //     console.log("currentUser:", currentUser.id);
  //     const response = await fetch(`http://localhost:5000/usersRoles/${currentUser.id}`);
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log('data:', data);

  //       if (data.find(role => role === "viewer")) {
  //         navigate('/apartments');
  //       }
  //     }
  //     setShowSubscriptionOptions(true);
  //   }
  //   else { navigate('/login') }
  // }

  // const choosePlan = (amount) => {
  //   setAmountToPay(amount);
  //   setShowSubscriptionOptions(false);
  //   setShowPayment(true);
  // };

  // const managePublishApartments = async () => {
  //   if (currentUser && currentUser.id != -1) {
  //     navigate('/publish');
  //   }
  //   else
  //     navigate('/login')
  // }

  // const addUserRole = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:5000/usersRoles/${currentUser.id}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         role_name: "viewer",
  //       }),
  //     });
  //     if (!response.ok) {
  //       throw new Error('Failed to add viewer role');
  //     }
  //     // Optionally handle success here
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  return (
    <>
      <ViewApartments></ViewApartments>
      <Publish></Publish>

    </>
    // <div>
    //   <main>
    //     <p>To use the website, please log in or sign up.</p>
    //     <button onClick={manageViewApartments}>View Apartments</button>
    //     <button onClick={managePublishApartments}>Publish Apartment</button>

    //  {/* Subscription Plan Options */}
    // {showSubscriptionOptions && (
    //   <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
    //     <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', width: '250px' }}>
    //       <h3>Monthly Plan</h3>
    //       <p>Get full access to all apartment listings for one month.</p>
    //       <p><strong>Price:</strong> $80</p>
    //       <button onClick={() => choosePlan(80)}>Choose Monthly</button>
    //     </div>
    //     <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', width: '250px' }}>
    //       <h3>Bi-Monthly Plan</h3>
    //       <p>Access all apartments for two months at a discounted rate.</p>
    //       <p><strong>Price:</strong> $150</p>
    //       <button onClick={() => choosePlan(150)}>Choose Bi-Monthly</button>
    //     </div>
    //   </div>
    // )}

    // {/* Payment Section */}
    //     {showPayment && (
    //       <SubscriptionPayment
    //         amount={amountToPay}
    //         onSuccess={() => {
    //           setShowPayment(false);
    //           addUserRole();
    //           navigate('/apartments');
    //         }}
    //         onCancel={() => setShowPayment(false)}
    //       />
    //     )}
    //   </main>
    // </div>
  );
};

export default home;