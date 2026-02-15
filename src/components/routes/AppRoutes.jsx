import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';

import Home from '../landing-page/home/Home';
import About from '../landing-page/about/About';
import Services from '../landing-page/services/Services';

import Login from '../login-page/Login';
import TravelerSignUp from'../signup-page/TravelerSignUp/TravelerSignUp';
import AgencySignUp from '../signup-page/AgencySignUp/AgencySignUp'

import TravelerHome from '../dashboard/traveler-dashboard/traveler-home/TravelerHome'
import TravelerPackages from '../dashboard/traveler-dashboard/traveler-packages/TravelerPackages'
import TravelerAgencies from '../dashboard/traveler-dashboard/traveler-agencies/TravelerAgencies'
import TravelerBooking from '../dashboard/traveler-dashboard/traveler-booking/TravelerBooking'
import TravelerLayout from '../layout/travelerlayout/layout';


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


      <Route element={<TravelerLayout/>}>
        <Route path="/TravelerDashBoard" element={<Navigate to="/TravelerHome" />} />
        <Route path="/TravelerHome" element={<TravelerHome/>} />
        <Route path="/TravelerPackages" element={<TravelerPackages/>}/>
        <Route path="/TravelerAgencies" element={<TravelerAgencies/>}/>
        <Route path="/TravelerBooking" element={<TravelerBooking/>}/>
      </Route>

      <Route path="*" element={<h1>404 - Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;