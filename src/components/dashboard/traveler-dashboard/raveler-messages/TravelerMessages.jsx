import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaPaperPlane, FaPhoneAlt, FaEllipsisV, FaCircle, FaUserPlus } from 'react-icons/fa';
import './TravelerMessages.css';
import { getActiveAgencies, getProfile } from '../../../../services/travelerService'; 
import { connectWebSocket, sendMessage, disconnectWebSocket, getChatHistory, getConversations } from '../../../../services/messageService';
import toast, { Toaster } from 'react-hot-toast';

const TravelerMessages = () => {
  const [travelerId, setTravelerId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [conversations, setConversations] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [allAgencies, setAllAgencies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const messagesEndRef = useRef(null);
  const activeChat = conversations.find(c => c.id === activeChatId);

  // Load Traveler Profile
  useEffect(() => {
    const fetchTravelerProfile = async () => {
      try {
        const profileData = await getProfile();
        setTravelerId(profileData.id);
      } catch (error) {
        toast.error("Failed to load traveler profile");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTravelerProfile();
  }, []);

  // Load Existing Conversations
  useEffect(() => {
    const fetchExistingConversations = async () => {
      if (!travelerId) return;
      try {
        const pastChats = await getConversations(travelerId);
        if (pastChats && pastChats.length > 0) {
          setConversations(pastChats);
          setActiveChatId(pastChats[0].id); 
        }
      } catch (error) {
        console.error("Error fetching existing conversations:", error);
      }
    };
    fetchExistingConversations();
  }, [travelerId]);

  // Fetch All Agencies for New Chat
  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const data = await getActiveAgencies();
        setAllAgencies(data);
      } catch (error) {
        console.error("Error fetching agencies:", error);
      }
    };
    fetchAgencies();
  }, []);

  // WebSocket Connection & Incoming Messages
  useEffect(() => {
    if (!travelerId) return;

    connectWebSocket(travelerId, (incomingMessage) => {
      if (incomingMessage.senderId === activeChatId || incomingMessage.receiverId === activeChatId) {
        setMessages((prevMessages) => [...prevMessages, incomingMessage]);
      }
      
      setConversations(prev => {
        const isExisting = prev.find(c => c.id === incomingMessage.senderId || c.id === incomingMessage.receiverId);
        if(!isExisting) {
            return [{
                id: incomingMessage.senderId,
                travelerName: `Agency ${incomingMessage.senderId}`,
                lastMessage: incomingMessage.message,
                time: "Just now",
                unread: 1,
                online: true,
                color: "#111"
            }, ...prev];
        }
        return prev;
      });
    });

    return () => {
      disconnectWebSocket();
    };
  }, [activeChatId, travelerId]);

  // Load Chat History
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getChatHistory(travelerId, activeChatId);
        setMessages(history);
      } catch (error) {
        console.error("Failed to load history");
      }
    };

    if (activeChatId && travelerId) {
      fetchHistory();
    }
  }, [activeChatId, travelerId]);

  // Auto Scroll to Bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send Message
  const handleSendMessage = () => {
    if (inputText.trim() !== "" && travelerId && activeChatId) {
      const newMsg = {
        senderId: travelerId,
        receiverId: activeChatId,
        message: inputText
      };

      sendMessage(newMsg);

      const displayMsg = {
        ...newMsg,
        id: Date.now(), 
        timestamp: new Date().toISOString()
      };
      setMessages((prev) => [...prev, displayMsg]);
      setInputText("");
    }
  };

  const formatTime = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Handle Starting a New Chat
  const handleSelectAgency = (agency) => {
    const existingChat = conversations.find(c => c.id === agency.id);
    if (existingChat) {
      setActiveChatId(agency.id);
    } else {
      const newConv = {
        id: agency.id,
        travelerName: agency.name || agency.agencyName,
        lastMessage: "New Conversation started",
        time: "Just now",
        unread: 0,
        online: false,
        image: agency.photoUrl || "https://via.placeholder.com/150",
        color: "#8b5cf6"
      };
      setConversations(prev => [newConv, ...prev]);
      setActiveChatId(agency.id);
    }
    setShowNewChatModal(false);
    setSearchTerm("");
  };

  if (isLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading Chat...</div>;
  }

  // Filter Agencies for New Chat Modal
  const filteredAgencies = allAgencies.filter(a => {
    const isAlreadyChatted = conversations.some(c => c.id === a.id);
    const matchesSearch = (a.name || a.agencyName || "").toLowerCase().includes(searchTerm.toLowerCase()) || a.id.toString().includes(searchTerm);
    return !isAlreadyChatted && matchesSearch;
  });

  const activeAgencyInfo = allAgencies.find(a => a.id === activeChat?.id);
  const activeDisplayName = activeAgencyInfo ? (activeAgencyInfo.name || activeAgencyInfo.agencyName) : activeChat?.travelerName;
  const activeImage = activeAgencyInfo?.photoUrl || activeChat?.photoUrl || "https://via.placeholder.com/150";

  return (
    <div className="messages-page-container">
      <Toaster position="top-right" />
      <div className="chat-layout">
        
        <div className="chat-sidebar">
          <div className="sidebar-header">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h2>Messages</h2>
              <button 
                onClick={() => setShowNewChatModal(!showNewChatModal)} 
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#c87a2c', fontSize: '18px' }}
                title="Start New Chat"
              >
                <FaUserPlus />
              </button>
            </div>
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input type="text" placeholder="Search agencies..." />
            </div>
          </div>

          {/* New Chat Agency Selection Area */}
          {showNewChatModal && (
            <div style={{ padding: '15px', background: '#f9fafb', borderBottom: '1px solid #eee', maxHeight: '300px', overflowY: 'auto' }}>
              <input 
                type="text" 
                placeholder="Search agency by name..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <div className="agency-selection-list">
                {filteredAgencies.length > 0 ? (
                  filteredAgencies.map(agency => (
                    <div 
                      key={agency.id} 
                      onClick={() => handleSelectAgency(agency)}
                      style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '10px' }}
                      onMouseOver={(e) => e.currentTarget.style.background = '#f0f0f0'}
                      onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <img 
                        src={agency.photoUrl || "https://via.placeholder.com/150"} 
                        alt="Agency" 
                        style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }} 
                      />
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '600' }}>{agency.name || agency.agencyName}</div>
                        <div style={{ fontSize: '11px', color: '#888' }}>ID: {agency.id}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ fontSize: '12px', color: '#888', textAlign: 'center', padding: '10px' }}>No agencies found</div>
                )}
              </div>
            </div>
          )}

          {/* Conversation List Render */}
          <div className="conversation-list">
            {conversations.map(chat => {
              const aInfo = allAgencies.find(a => a.id === chat.id);
              const displayName = aInfo ? (aInfo.name || aInfo.agencyName) : chat.travelerName;
              const displayImg = aInfo?.photoUrl || chat.photoUrl || "https://via.placeholder.com/150";

              return (
                <div 
                  key={chat.id} 
                  className={`conversation-item ${activeChatId === chat.id ? 'active' : ''}`}
                  onClick={() => setActiveChatId(chat.id)}
                >
                  <div className="avatar-wrapper">
                    <img src={displayImg} alt="Agency" />
                    {chat.online && <div className="online-indicator"></div>}
                  </div>
                  <div className="chat-info">
                    <div className="chat-name-time">
                      <h4>{displayName}</h4>
                      <span className="time">{chat.time}</span>
                    </div>
                    <div className="chat-last-msg">
                      <p>{chat.lastMessage}</p>
                      {chat.unread > 0 && <span className="unread-badge">{chat.unread}</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="chat-main-area">
          {activeChat ? (
            <>
              {/* Active Chat Header Render */}
              <div className="chat-header">
                <div className="active-agency-info">
                  <img src={activeImage} alt="Agency" />
                  <div>
                    <h3>{activeDisplayName}</h3>
                    <span className="status">
                      {activeChat?.online ? <><FaCircle className="status-icon online" /> Online</> : 'Offline'}
                    </span>
                  </div>
                </div>
                <div className="chat-header-actions">
                  <button className="icon-btn"><FaPhoneAlt /></button>
                  <button className="icon-btn"><FaEllipsisV /></button>
                </div>
              </div>

              <div className="chat-messages">
                <div className="date-divider"><span>Chat History</span></div>
                {messages.map((msg, index) => (
                  <div key={index} className={`message-wrapper ${msg.senderId === travelerId ? 'sent' : 'received'}`}>
                    <div className="message-bubble">
                      <p>{msg.message}</p>
                      <span className="msg-time">{formatTime(msg.timestamp)}</span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="chat-input-area">
                <input 
                  type="text" 
                  placeholder="Type your message here..." 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                />
                <button className="send-msg-btn" onClick={handleSendMessage}>
                  <FaPaperPlane className="send-icon" />
                </button>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#888' }}>
              <h3>Select an agency to start chatting</h3>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default TravelerMessages;