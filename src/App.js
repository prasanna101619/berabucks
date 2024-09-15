import React from 'react';
import Auth_Referral from './Auth_Referral';
import Home from './Home';
import FriendsPage from './Friends';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
    <Routes>
    
      <Route path="/:referralCode?" element={<Auth_Referral />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/friends" element={<FriendsPage />} />
   
    </Routes>
  </Router>
  )
}

export default App
