import React, { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import './About.css';
import AboutOne from '../../assets/AboutOne.jpg';
import AboutTwo from '../../assets/AboutTwo.jpg';
import { FaGlobeAsia } from "react-icons/fa";
import { AiTwotoneSafetyCertificate } from "react-icons/ai";
import { GrStatusGood } from "react-icons/gr";
import { MdManageSearch } from "react-icons/md";
import SpecialtiesCarousel from '../Carousel/SpecialtiesCarousel';

function About() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            offset: 100,
        });
    }, []);

    return(
        <section className='about-container'>
            <div className='about-content-one'>
                <div className='about-text-side-one'>
                    <p className='brand-name' data-aos="fade-right">Traveley Go</p>
                    <h1 className='about-tittle' data-aos="fade-right" data-aos-delay="100">
                        <span>Who </span>We Are
                    </h1>
                    <p className='about-text' data-aos="fade-right" data-aos-delay="200">
                        Traveley is Sri Lanka's leading travel marketplace connecting passionate travelers
                        with top-rated agencies. We bridge the gap between dream destinations and reality by offering
                        a seamless platform for planning, booking, and experiencing the perfect getaway.
                    </p>

                    <div className='stats-row'>
                        <div className='stat-box' data-aos="zoom-in" data-aos-delay="100">
                            <h2 className='stat-number'>100+</h2>
                            <p className='stat-label'>Happy Travelers</p>
                        </div>
                        <div className='stat-box' data-aos="zoom-in" data-aos-delay="200">
                            <h2 className='stat-number'>50+</h2>
                            <p className='stat-label'>Verified Agencies</p>
                        </div>
                        <div className='stat-box' data-aos="zoom-in" data-aos-delay="300">
                            <h2 className='stat-number'>20+</h2>
                            <p className='stat-label'>Destinations</p>
                        </div>
                        <div className='stat-box' data-aos="zoom-in" data-aos-delay="400">
                            <h2 className='stat-number'>98%</h2>
                            <p className='stat-label'>Customer Satisfaction</p>
                        </div>
                    </div>
                </div>

                <div className='about-img-side'>
                    <img 
                        src={AboutOne} 
                        alt='About image one' 
                        className='about-image' 
                        data-aos="fade-left" 
                    />
                </div>
            </div>
            <div className='about-content-two'>
                <div className='about-img-side-two'>
                    <img 
                        className='about-image-two' 
                        src={AboutTwo} 
                        alt='About image two'
                        data-aos="fade-right"
                    />
                </div>
                
                <div className='about-text-side-two'>
                    <p className='brand-name-two' data-aos="fade-left">Traveley Go</p>
                    <h1 className='about-tittle' data-aos="fade-left" data-aos-delay="100">
                        Your Gateway to the <span> World</span>
                    </h1>
                    <p className='about-text' data-aos="fade-left" data-aos-delay="200">
                        Our mission is to connect you with top-rated agencies for both local adventures and international journeys.
                        Whether you are exploring the beauty of Sri Lanka or flying overseas, we provide a seamless, secure, and
                        personalized booking experience for every destination.
                    </p>

                    <ul className='about-features-list'>
                        <li className='feature-items' data-aos="fade-up" data-aos-delay="100">
                            <FaGlobeAsia className='feature-item'/>
                            <span>Explore diverse packages for local getaways and international tours.</span>
                        </li>
                        <li className='feature-items' data-aos="fade-up" data-aos-delay="200">
                            <AiTwotoneSafetyCertificate className='feature-item'/>
                            <span>We only work with trusted agencies to ensure safe and reliable trips.</span>
                        </li>
                        <li className='feature-items' data-aos="fade-up" data-aos-delay="300">
                            <GrStatusGood className='feature-item'/>
                            <span>No hidden fees—get the best value for your travel budget.</span>
                        </li>
                        <li className='feature-items' data-aos="fade-up" data-aos-delay="400">
                            <MdManageSearch className='feature-item'/>
                            <span>Compare, book, and manage your entire trip in one place.</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div data-aos="fade-up">
                <SpecialtiesCarousel />
            </div>
        </section>
    );

}

export default About;