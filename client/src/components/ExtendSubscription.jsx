import { useNavigate } from 'react-router-dom';
import SubscriptionPayment from './SubscriptionPayment';
import PublishApartments from './publishApartment';
import { useCurrentUser } from './userProvider';
import React, { useState } from 'react';

const ExtendSubscription = () => {
  const [showPublishState, setPublishState] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [amountToPay, setAmountToPay] = useState(null);
  const { currentUser } = useCurrentUser();
  const navigate = useNavigate();

  const chooseExtend = (amount) => {
    setAmountToPay(amount);
    setShowPayment(true);
  };

  const addUserRole = async () => {
    try {
      const expiryDate = amountToPay === 70
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        : new Date(Date.now() + 60 * 24 * 60 * 60 * 1000);
      const expiry_d = expiryDate.toISOString().split('T')[0];
      const response = await fetch(`http://localhost:5000/users/${currentUser.id}/roles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role_name: "viewer", expiry_date: expiry_d }),
      });
      if (!response.ok) throw new Error('Failed to extend viewer role');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', width: '250px' }}>
          <h3>Extend Monthly Plan</h3>
          <p>Extend viewer access for one month.</p>
          <p><strong>Price:</strong> $70</p>
          <button onClick={() => chooseExtend(80)}>Extend Monthly</button>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', width: '250px' }}>
          <h3>Extend Bi-Monthly Plan</h3>
          <p>Extend for two months at a discount.</p>
          <p><strong>Price:</strong> $120</p>
          <button onClick={() => chooseExtend(150)}>Extend Bi-Monthly</button>
        </div>
        {/* Payment Section */}
            {showPayment && (
                <SubscriptionPayment
                    amount={amountToPay}
                    onSuccess={() => {
                        setShowPayment(false);
                        addUserRole();
                        navigate('/apartments');
                    }}
                    onCancel={() => setShowPayment(false)}
                />
            )}
      </div>
    </>
  );
};


export default ExtendSubscription
