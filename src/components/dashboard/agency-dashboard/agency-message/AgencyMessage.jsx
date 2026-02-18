import React, { useState } from 'react';
import { FaSearch, FaPaperPlane, FaPhoneAlt, FaEllipsisV, FaCircle } from 'react-icons/fa';
import './AgencyMessage.css';

const AgencyMessages = () => {
  const [conversations] = useState([
    {
      id: 1,
      travelerName: "Kasun Perera",
      lastMessage: "Can we add an elephant safari to the package?",
      time: "10:30 AM",
      unread: 2,
      online: true,
      color: "#0284c7"
    },
    {
      id: 2,
      travelerName: "Sarah Smith",
      lastMessage: "Thank you! We will arrive by 10 AM.",
      time: "Yesterday",
      unread: 0,
      online: false,
      color: "#16a34a"
    },
    {
      id: 3,
      travelerName: "Nuwan Silva",
      lastMessage: "Is the train ticket included in the price?",
      time: "Mon",
      unread: 0,
      online: true,
      color: "#d97706"
    }
  ]);

  const [activeChatId, setActiveChatId] = useState(1);
  const [inputText, setInputText] = useState("");

  const activeChat = conversations.find(c => c.id === activeChatId);

  const messages = [
    { id: 1, sender: 'traveler', text: 'Hi! I am interested in the 4-day Sigiriya tour. Can we customize it?', time: '10:15 AM' },
    { id: 2, sender: 'agency', text: 'Hello Kasun! Yes, absolutely. How would you like to customize it?', time: '10:20 AM' },
    { id: 3, sender: 'traveler', text: 'Can we add an elephant safari to the package?', time: '10:30 AM' },
  ];

  return (
    <div className="agency-msg-container">
      <div className="agency-chat-layout">
        
        <div className="agency-chat-sidebar">
          <div className="sidebar-top">
            <h2>Traveler Inbox</h2>
            <div className="search-box">
              <FaSearch className="s-icon" />
              <input type="text" placeholder="Search travelers..." />
            </div>
          </div>

          <div className="conv-list">
            {conversations.map(chat => (
              <div 
                key={chat.id} 
                className={`conv-item ${activeChatId === chat.id ? 'active-conv' : ''}`}
                onClick={() => setActiveChatId(chat.id)}
              >
                <div className="traveler-avatar" style={{ backgroundColor: chat.color }}>
                  {chat.travelerName.charAt(0)}
                  {chat.online && <div className="on-dot"></div>}
                </div>
                <div className="conv-info">
                  <div className="conv-head">
                    <h4>{chat.travelerName}</h4>
                    <span className="conv-time">{chat.time}</span>
                  </div>
                  <div className="conv-msg">
                    <p>{chat.lastMessage}</p>
                    {chat.unread > 0 && <span className="u-badge">{chat.unread}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="agency-chat-main">
          
          <div className="chat-top-bar">
            <div className="active-user-info">
              <div className="traveler-avatar" style={{ backgroundColor: activeChat.color }}>
                {activeChat.travelerName.charAt(0)}
              </div>
              <div>
                <h3>{activeChat.travelerName}</h3>
                <span className="u-status">
                  {activeChat.online ? <><FaCircle className="dot-icon online" /> Online</> : 'Offline'}
                </span>
              </div>
            </div>
            <div className="chat-actions">
              <button className="act-btn"><FaPhoneAlt /></button>
              <button className="act-btn"><FaEllipsisV /></button>
            </div>
          </div>

          <div className="chat-msg-area">
            <div className="day-divider"><span>Today</span></div>
            
            {messages.map(msg => (
              <div key={msg.id} className={`msg-wrap ${msg.sender === 'agency' ? 'msg-sent' : 'msg-received'}`}>
                <div className="msg-bubble">
                  <p>{msg.text}</p>
                  <span className="m-time">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="chat-type-area">
            <input 
              type="text" 
              placeholder="Type your reply here..." 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button className="send-reply-btn">
              <FaPaperPlane className="snd-icon" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AgencyMessages;