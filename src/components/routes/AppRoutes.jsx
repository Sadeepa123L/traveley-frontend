import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';

import Home from '../Home/Home';
import About from '../About/About';
import Services from '../Services/Services';
import Login from '../LoginPage/Login';

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
      
      <Route path="*" element={<h1>404 - Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;