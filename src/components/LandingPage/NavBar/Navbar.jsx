import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function NavBar() {
    
    const navigate = useNavigate();

    return(
        <div className='Navbar'>
            <div className='nav-icon' >
                <a href="#home" style={{textDecoration:'none', color:'inherit'}}>
                    <h2>Traveley</h2>
                </a>
            </div>          
            <ul className='nav-menu'>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
            </ul>
            
            <div className='nav-button'>
                <button className='log' onClick={() => navigate('/login')}>Log in</button>

                <div className='dropdown'>
                   <span className="dropdown-btn">Sign Up</span>
                   <div className='dropdown-content'>
                        <a href='' onClick={() => navigate('/TravelerSignUp')}>Customer</a>
                        <a href='' onClick={() => navigate('/AgencySignUp')}>Agency</a>
                   </div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;