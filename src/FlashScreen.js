import React from 'react';
import './FlashScreen.css'; 
import flashScreenGif from './assets/FlashScreen.gif'; 

const FlashScreen = () => {
  return (
    <div className="flash-screen">
      <img src={flashScreenGif} alt="Loading" />
    </div>
  );
};

export default FlashScreen;
