import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../landing-page/navbar/Navbar';
import Footer from '../landing-page/footer/Footer';

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet /> 
      <Footer />
    </>
  );
};

export default MainLayout;