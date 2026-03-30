import React, { useState, useEffect, useRef } from 'react';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { sendMessageToChatbot } from '../../../../services/chatbotService';
import './ChatBot.css';
import ReactMarkdown from 'react-markdown';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! 👋 I'm your AI Travel Assistant. How can I help you plan your perfect trip today?", sender: "bot" }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      scrollToBottom();
    }, 50);
    return () => clearTimeout(timeout);
  }, [messages, isLoading, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await sendMessageToChatbot(input);
      setMessages([...newMessages, { text: aiResponse, sender: "bot" }]);
    } catch (error) {
      setMessages([...newMessages, { text: "Connection error. Please try again.", sender: "bot" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-wrapper">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="header-info">
              <div className="status-dot"></div>
              <FaRobot className="bot-main-icon" />
              <div className="header-text">
                <span className="bot-name">Travely AI</span>
                <span className="bot-status">Online</span>
              </div>
            </div>
            <button className="close-header-btn" onClick={toggleChat}>
              <FaTimes />
            </button>
          </div>

          <div className="chatbot-body" onWheel={(e) => e.stopPropagation()}>
            {messages.map((msg, index) => (
              <div key={index} className={`message-container ${msg.sender === 'bot' ? 'bot-align' : 'user-align'}`}>
                <div className={`message-bubble ${msg.sender === 'bot' ? 'bot-bubble' : 'user-bubble'}`}>
                  {msg.sender === 'bot' ? (
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message-container bot-align">
                <div className="message-bubble bot-bubble typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-footer">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button className="send-action-btn" onClick={handleSendMessage} disabled={isLoading}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}

      <button className={`chatbot-toggle-btn ${isOpen ? 'active' : ''}`} onClick={toggleChat}>
        {isOpen ? <FaTimes /> : <FaRobot />}
      </button>
    </div>
  );
};

export default ChatBot;