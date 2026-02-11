import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';

import Home from '../LandingPage/Home/Home';
import About from '../LandingPage/About/About';
import Services from '../LandingPage/Services/Services';
import Login from '../LoginPage/Login';
import TravelerSignUp from'../SignUpPages/TravelerSignUp/TravelerSignUp';
import AgencySignUp from '../SignUpPages/AgencySignUp/AgencySignUp'

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={
          <>
            <section id="home">
              <Home />
            </section>

            <section id="about">
              <About />
            </section>

            <section id="services">
              <Services />
            </section>
          </>
        } />

      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/Travelersignup" element={<TravelerSignUp />} />
      <Route path="/Agencysignup" element={<AgencySignUp />} />
      
      <Route path="*" element={<h1>404 - Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;