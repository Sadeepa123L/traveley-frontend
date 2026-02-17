import React, { useState } from 'react';
import { FaSearch, FaPaperPlane, FaPhoneAlt, FaEllipsisV, FaCircle } from 'react-icons/fa';
import './TravelerMessages.css';

const TravelerMessages = () => {
  // දැනට කතා කරපු Agencies වල Dummy ලිස්ට් එකක්
  const [conversations] = useState([
    {
      id: 1,
      agencyName: "Serendipity Travels",
      lastMessage: "Yes, we can arrange a custom tour for you.",
      time: "10:30 AM",
      unread: 2,
      online: true,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 2,
      agencyName: "Ocean Blue Tours",
      lastMessage: "Thank you for booking with us!",
      time: "Yesterday",
      unread: 0,
      online: false,
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 3,
      agencyName: "Wanderlust Lanka",
      lastMessage: "The total cost would be $450.",
      time: "Mon",
      unread: 0,
      online: true,
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=150&q=80"
    }
  ]);

  // දැනට තෝරගෙන තියෙන Chat එක
  const [activeChatId, setActiveChatId] = useState(1);
  const [inputText, setInputText] = useState("");

  // තෝරගත්ත Agency එකේ විස්තර
  const activeChat = conversations.find(c => c.id === activeChatId);

  // යවන්න තියෙන Dummy Messages ටිකක්
  const messages = [
    { id: 1, sender: 'agency', text: 'Hello! How can we help you plan your trip to Sri Lanka?', time: '10:00 AM' },
    { id: 2, sender: 'traveler', text: 'Hi! I am interested in the 4-day Sigiriya tour. Can we customize it?', time: '10:15 AM' },
    { id: 3, sender: 'agency', text: 'Absolutely! We can add an elephant safari to the package if you like.', time: '10:25 AM' },
    { id: 4, sender: 'agency', text: 'Yes, we can arrange a custom tour for you. Let me send the updated itinerary.', time: '10:30 AM' },
  ];

  return (
    <div className="messages-page-container">
      
      <div className="chat-layout">
        
        {/* --- වම් පැත්ත: Conversations List --- */}
        <div className="chat-sidebar">
          <div className="sidebar-header">
            <h2>Messages</h2>
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input type="text" placeholder="Search agencies..." />
            </div>
          </div>

          <div className="conversation-list">
            {conversations.map(chat => (
              <div 
                key={chat.id} 
                className={`conversation-item ${activeChatId === chat.id ? 'active' : ''}`}
                onClick={() => setActiveChatId(chat.id)}
              >
                <div className="avatar-wrapper">
                  <img src={chat.image} alt={chat.agencyName} />
                  {chat.online && <div className="online-indicator"></div>}
                </div>
                <div className="chat-info">
                  <div className="chat-name-time">
                    <h4>{chat.agencyName}</h4>
                    <span className="time">{chat.time}</span>
                  </div>
                  <div className="chat-last-msg">
                    <p>{chat.lastMessage}</p>
                    {chat.unread > 0 && <span className="unread-badge">{chat.unread}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- දකුණු පැත්ත: Chat Box --- */}
        <div className="chat-main-area">
          
          {/* Chat Header */}
          <div className="chat-header">
            <div className="active-agency-info">
              <img src={activeChat.image} alt="Agency" />
              <div>
                <h3>{activeChat.agencyName}</h3>
                <span className="status">
                  {activeChat.online ? <><FaCircle className="status-icon online" /> Online</> : 'Offline'}
                </span>
              </div>
            </div>
            <div className="chat-header-actions">
              <button className="icon-btn"><FaPhoneAlt /></button>
              <button className="icon-btn"><FaEllipsisV /></button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="chat-messages">
            <div className="date-divider"><span>Today</span></div>
            
            {messages.map(msg => (
              <div key={msg.id} className={`message-wrapper ${msg.sender === 'traveler' ? 'sent' : 'received'}`}>
                <div className="message-bubble">
                  <p>{msg.text}</p>
                  <span className="msg-time">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Type Message Area */}
          <div className="chat-input-area">
            <input 
              type="text" 
              placeholder="Type your message here..." 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button className="send-msg-btn">
              <FaPaperPlane className="send-icon" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default TravelerMessages;