import React, { useEffect } from 'react'
import { navigate } from './misc'

const ProtectedRoute = (props) => {
  const {Component}=props


  useEffect(()=>{
    let login=localStorage.getItem('login')
    if(!login){
      navigate('/login')
    }
  },[])
  return (
    <div>
      <Component/>
    </div>
  )
}

export default ProtectedRoute