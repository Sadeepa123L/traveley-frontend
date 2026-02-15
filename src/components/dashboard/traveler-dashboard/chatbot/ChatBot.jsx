import React, { useState } from 'react';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';
import './ChatBot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbot-wrapper">
            {isOpen && (
        <div className="chatbot-window">
          {/* Header එක */}
          <div className="chatbot-header">
            <div className="header-info">
              <FaRobot className="robot-icon" />
              <span>AI Travel Assistant</span>
            </div>
            <button className="close-btn" onClick={toggleChat}>
              <FaTimes />
            </button>
          </div>

          <div className="chatbot-body">
            <div className="message bot-message">
              Hi there! 👋 I'm your AI Travel Assistant. How can I help you plan your perfect trip today?
            </div>
          </div>

          <div className="chatbot-footer">
            <input type="text" placeholder="Type your message..." />
            <button className="send-btn">
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
      <button className="chatbot-toggle-btn" onClick={toggleChat}>
        {isOpen ? <FaTimes className="icon-large" /> : <FaRobot className="icon-large" />}
      </button>

    </div>
  );
};

export default ChatBot;