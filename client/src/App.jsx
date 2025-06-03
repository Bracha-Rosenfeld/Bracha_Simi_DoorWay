import React from 'react'
import MainApp from './components/MainApp.jsx'
import { UserProvider } from './components/userProvider';
import './App.css'

function App() {

  return (
    <UserProvider>
      <MainApp />
    </UserProvider>

  )
}

export default App;
