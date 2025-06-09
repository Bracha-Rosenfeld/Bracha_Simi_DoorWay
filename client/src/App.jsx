import React from 'react'
import MainApp from './components/MainApp.jsx'
import { UserProvider } from './components/userProvider';
import './App.css'
import { PayPalScriptProvider,PayPalButtons  } from "@paypal/react-paypal-js";


function App() {
  return (
    <PayPalScriptProvider options={{
      "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
      currency: "USD",
      intent: "capture"
    }}>
      <UserProvider>
        <MainApp />
      </UserProvider>
    </PayPalScriptProvider>

  )
}

export default App;
