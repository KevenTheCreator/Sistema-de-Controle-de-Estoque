import React from 'react';
import { Outlet } from 'react-router-dom';
import './MainLayout.css';
import Navegacao from '../Navegacao/Navegacao.jsx';
import Footer from '../Footer/Footer.jsx';


const MainLayout = () => {
  return (
    <div className='main-layout'>
        <Navegacao/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default MainLayout
