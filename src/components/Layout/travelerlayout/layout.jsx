import React from 'react'
import { Outlet } from 'react-router-dom'
import './TravelerLayout.css'; 

import NavBar from '../../dashboard/traveler-dashboard/traveler-navbar/TravelerNavBar'

function TravelerLayout (){
    return(
        <div className='traveler-layout'>
            <div className='layout-navbar'>
                < NavBar/>
            </div>
            <div className='layout-content'>
                <Outlet/>
            </div>
        </div>
    );

}

export default TravelerLayout;