import React from 'react'
import { Outlet } from 'react-router-dom'
import './AgencyLayout.css'; 

import NavBar from '../../dashboard/agency-dashboard/agency-navbar/AgencyNavBar'

function AgencyLayout (){
    return(
        <div className='agency-layout'>
            <div className='layout-navbar'>
                < NavBar/>
            </div>
            <div className='layout-content'>
                <Outlet/>
            </div>
        </div>
    );

}

export default AgencyLayout;