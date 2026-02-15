import React, { useEffect } from 'react';
import './Services.css';
import { FaSearchLocation, FaMapMarkedAlt, FaUserCheck, FaShieldAlt, FaHeadset, FaHotel } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ServicesHeroImg from '../../../assets/HomeImg.jpg';

const Services = () => {

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const servicesData = [
    {
      id: 1,
      icon: <FaSearchLocation />,
      title: "Smart Package Search",
      desc: "Compare and find the best travel packages from top-rated agencies effortlessly."
    },
    {
      id: 2,
      icon: <FaMapMarkedAlt />,
      title: "Custom Trip Planning",
      desc: "Create your own itinerary. Pick destinations, hotels, and activities your way."
    },
    {
      id: 3,
      icon: <FaUserCheck />,
      title: "Verified Agencies",
      desc: "Travel safely. We only partner with registered and trusted travel agents."
    },
    {
      id: 4,
      icon: <FaShieldAlt />,
      title: "Secure Booking",
      desc: "Your payments and personal details are protected with top-tier security."
    },
    {
      id: 5,
      icon: <FaHeadset />,
      title: "24/7 Support",
      desc: "Our dedicated support team is here to assist you anytime, anywhere."
    },
    {
      id: 6,
      icon: <FaHotel />,
      title: "Exclusive Deals",
      desc: "Get access to special discounts on hotels and transport services."
    }
  ];

  return (
    <div className="services-page">
      <div className="services-hero">
        <img src={ServicesHeroImg} alt="Travel Services" className="hero-bg" />
        <div className="hero-overlay">
          <h1 data-aos="fade-down">Your Journey, <span className="highlight">Our Priority</span></h1>
          <p data-aos="fade-up">Connecting you with Sri Lanka's best travel agencies for a seamless experience.</p>
        </div>
      </div>
      <div className="services-container">
        <h2 className="section-title" data-aos="fade-up">What We Offer</h2>
        <div className="services-grid">
          {servicesData.map((service) => (
            <div className="service-card" key={service.id} data-aos="zoom-in" data-aos-delay={service.id * 100}>
              <div className="icon-box">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="agency-cta" data-aos="fade-up">
        <div className="cta-content">
          <h2>Are you a Travel Agency?</h2>
          <p>Expand your business with Traveley. List your packages and reach thousands of travelers instantly.</p>
          <button className="cta-btn">Partner with Us</button>
        </div>
      </div>
      <div className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          <div className="step" data-aos="fade-right">
            <span className="step-number">01</span>
            <h3>Discover</h3>
            <p>Browse through hundreds of unique travel packages.</p>
          </div>
          <div className="step" data-aos="fade-up">
            <span className="step-number">02</span>
            <h3>Book</h3>
            <p>Select your favorite trip and pay securely online.</p>
          </div>
          <div className="step" data-aos="fade-left">
            <span className="step-number">03</span>
            <h3>Travel</h3>
            <p>Pack your bags and enjoy your dream vacation.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;