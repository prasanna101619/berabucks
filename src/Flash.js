import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import flashs from './assets/FlashScreen.gif';

const Flash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
        if(localStorage.getItem('userNum')){
            navigate('/Home');
        }
        else{
            navigate('/Auth');}
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{height:'100vh', width:'100vw'}}>
      <img src={flashs} />
    </div>
  );
};

export default Flash;
