import React from 'react';
import Auth_Referral from './Auth_Referral';
import Home from './Home';
import FriendsPage from './Friends';
import Flash from './Flash';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
    <Routes>
    
      <Route path="/" element={<Flash />} />
      <Route path="/Auth" element={<Auth_Referral />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/friends" element={<FriendsPage />} />
   
    </Routes>
  </Router>
  )
}

export default App
