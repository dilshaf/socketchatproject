import React, { useState, useEffect } from 'react';
import {  useNavigate, Navigate, Outlet } from 'react-router-dom';
import Header from '../../components/common/Header'
import UserSettings from '../../components/profile/UserSettings';
import Protected from './Protected';



const Home = () => {
  const [isLogged, setIsLogged] = useState(false);
  
  let navigate = useNavigate();

  const token =localStorage.getItem('token');
  const id = localStorage.getItem('id');
  const username = localStorage.getItem('username');


  const isLoggin = async () => {
    try {
   
      console.log(Boolean(token), Boolean(id), Boolean(username));

     

      if (token && id && username) {
        console.log('trueee');
        return setIsLogged(true);
      } else {
        console.log('falseee');
        return setIsLogged(false)
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  

  useEffect(()=>{
    isLoggin()
    navigate()
    // console.log(isLoggin(),'log');
  },[])


     
    
  return (
    <div>
      {/* <Header /> */}
      {isLogged ? <Protected element={<Outlet/>} /> : navigate("/") }
      {console.log(isLogged, 'isLogged')}
    </div>
  );
};

export default Home;
