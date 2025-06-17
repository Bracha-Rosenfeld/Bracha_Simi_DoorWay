import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
const SubscriptionPayment = ({ amount, onSuccess }) => {
  return (
    <div>
      <h3>Choose Subscription: {amount}$</h3>
      <PayPalButtons
        createOrder={async (data, actions) => {
          return axios.post("http://localhost:5000/paypal/create-order",
            { amount },
            {
              headers: {
                "Content-Type": "application/json"
              }
            })
            .then(res => res.data)
            .then(order => order.id);
        }}
        onApprove={(data, actions) => {
          return axios.post("http://localhost:5000/paypal/capture-order",
            { orderID: data.orderID },
            {
              headers: {
                "Content-Type": "application/json"
              }
            })
            .then(res => {
              const details = res.data;
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
