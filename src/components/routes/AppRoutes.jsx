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
import TravelerMessages from '../dashboard/traveler-dashboard/raveler-messages/TravelerMessages'
import TravelerLayout from '../layout/travelerlayout/layout';

import AgencyLayout from '../layout/agencylayout/layout'
import AgencyHome from '../dashboard/agency-dashboard/agency-home/AgencyHome'
import AgencyPackage from '../dashboard/agency-dashboard/agency-packages/AgencyPackage'
import AgencyBookings from '../dashboard/agency-dashboard/agency-bookings/AgencyBookings'
import AgencyMessage from '../dashboard/agency-dashboard/agency-message/AgencyMessage'
import AgencySettings from '../dashboard/agency-dashboard/agency-settings/AgencySettings'


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
        <Route path='/TravelerMessages' element={<TravelerMessages/>}/>
      </Route>
x 
      <Route element={<AgencyLayout/>}>
      <Route path='/AgencyDashBoard' element={<Navigate to ="/AgencyHome"/>}/>
      <Route path='/AgencyHome' element={<AgencyHome/>}/>
      <Route path='/AgencyPackage' element={<AgencyPackage/>}/>
      <Route path='/AgencyBookings' element={<AgencyBookings/>}/>
      <Route path='/AgencyMessage' element={<AgencyMessage/>}/>
      <Route path='/AgencySettings' element={<AgencySettings/>}/>
      </Route>

      <Route path="*" element={<h1>404 - Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;