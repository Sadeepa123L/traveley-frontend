import React from 'react'
import { Outlet } from 'react-router-dom'
import './TravelerLayout.css'; 

import NavBar from '../../dashboard/traveler-dashboard/traveler-navbar/TravelerNavBar'
import ChatBot from '../../dashboard/traveler-dashboard/chatbot/ChatBot'

function TravelerLayout (){
    return(
        <div className='traveler-layout'>
            <div className='layout-navbar'>
                < NavBar/>
            </div>
            <div className='layout-content'>
                <Outlet/>
            </div>
            <ChatBot/>
        </div>
    );

}

export default TravelerLayout;