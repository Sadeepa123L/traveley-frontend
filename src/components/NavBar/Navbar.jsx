import './Navbar.css';

function NavBar() {
     return(
        <div className='Navbar'>
            <div className='nav-icon' >
                <h2>Traveley</h2>
            </div>
            <ul className='nav-menu'>
                <li>Home</li>
                <li>About</li>
                <li>Services</li>
            </ul>
            <div className='nav-button'>
                <button className='log'>Log in</button>
                <div className='dropdown'>
                   <span className="dropdown-btn">Sign Up</span>
                   <div className='dropdown-content'>
                        <a href='#'>Customer</a>
                        <a href='#'>Agency</a>
                   </div>
                </div>
            </div>
        </div>
    );

}

export default NavBar;