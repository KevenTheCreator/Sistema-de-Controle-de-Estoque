import React from 'react';
import { Outlet } from 'react-router-dom';
import Logo from '../Logo/logo';
import './AuthLayout.css';

const AuthLayout = () => {
  return (
    <div className='auth-layout'>
      <Logo/>
      <Outlet/>
    </div>
  )
}

export default AuthLayout
