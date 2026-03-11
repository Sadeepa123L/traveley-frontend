import React from 'react'
import { Outlet } from 'react-router-dom'
import './AdminLayout.css'


import NavBar from '../../dashboard/admin-dashboard/admin-navbar/AdminNavBar'
import SideBar from '../../dashboard/admin-dashboard/admin-sidebar/AdminSideBar'

function TravelerLayout (){
    return(
        <div className='admin-layout-container'>
        <SideBar />
        <div className='main-content-wrapper'>
        <NavBar />
        <div className='layout-content'>
        <Outlet />
                </div>

            </div>

        </div>
    );

}

export default TravelerLayout;