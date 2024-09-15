import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import flashs from './assets/beraflash.gif';
import './Flash.css';

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
    <div style={{backgroundImage:`url(${flashs})`,backgroundRepeat:'no-repeat',backgroundSize:'cover', height:'100vh', width:'100vw',display:'flex',alignItems:'center',justifyContent:'center'}}>
    </div>
  );
};

export default Flash;
