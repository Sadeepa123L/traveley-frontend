import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../LandingPage/NavBar/Navbar';
import Footer from '../LandingPage/Footer/Footer';

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