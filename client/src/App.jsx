import React from 'react'
import MainApp from './components/MainApp.jsx'
import { UserProvider } from './components/userProvider';
import './App.css'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { GoogleOAuthProvider } from '@react-oauth/google';



function App() {
  return (
    <PayPalScriptProvider options={{
      "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
      currency: "USD",
      intent: "capture"
    }}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>

        <UserProvider>
          <MainApp />
        </UserProvider>
      </GoogleOAuthProvider>
    </PayPalScriptProvider>

  )
}

export default App;
