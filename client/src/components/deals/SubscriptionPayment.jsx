import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

const SubscriptionPayment = ({ amount, onSuccess }) => {
  return (
    <div>
      <h3>Choose Subscription: {amount}$</h3>
      <PayPalButtons
        createOrder={async (data, actions) => {
          return fetch("http://localhost:5000/paypal/create-order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ amount })
          })
            .then(res => res.json())
            .then(order => order.id);
        }}
        onApprove={(data, actions) => {
          return fetch("http://localhost:5000/paypal/capture-order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ orderID: data.orderID })
          })
            .then(res => res.json())
            .then(details => {
              console.log("Payment Successful!", details);
              onSuccess(details);
            });
        }}
        onError={(err) => {
          console.error("PayPal Error:", err);
        }}
      />
    </div>
  );
};

export default SubscriptionPayment;
