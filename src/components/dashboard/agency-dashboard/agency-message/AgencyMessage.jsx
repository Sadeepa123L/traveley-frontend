import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaPaperPlane, FaPhoneAlt, FaEllipsisV, FaCircle, FaUserPlus } from 'react-icons/fa';
import './AgencyMessage.css';
import { connectWebSocket, sendMessage, disconnectWebSocket, getChatHistory, getConversations } from '../../../../services/messageService';
import { getMyProfile } from '../../../../services/agencyService';
import toast, { Toaster } from 'react-hot-toast';
import { getAllProfiles } from '../../../../services/travelerService';

const AgencyMessages = () => {
  const [agencyId, setAgencyId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [conversations, setConversations] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [allTravelers, setAllTravelers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const messagesEndRef = useRef(null);
  const activeChat = conversations.find(c => c.id === activeChatId);

  useEffect(() => {
    const fetchAgencyProfile = async () => {
      try {
        const profileData = await getMyProfile();
        setAgencyId(profileData.id);
      } catch (error) {
        toast.error("Failed to load agency profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgencyProfile();
  }, []);

  // Section: Load Existing Conversations on Mount
  useEffect(() => {
    const fetchExistingConversations = async () => {
      if (!agencyId) return;
      try {
        const pastChats = await getConversations(agencyId);
        if (pastChats && pastChats.length > 0) {
          setConversations(pastChats);
          setActiveChatId(pastChats[0].id); 
        }
      } catch (error) {
        console.error("Error fetching existing conversations:", error);
      }
    };

    fetchExistingConversations();
  }, [agencyId]);

  // Section: Fetch All Travelers
  useEffect(() => {
    const fetchTravelers = async () => {
      try {
        const data = await getAllProfiles();
        setAllTravelers(data);
      } catch (error) {
        console.error("Error fetching travelers:", error);
      }
    };
    fetchTravelers();
  }, []);

  useEffect(() => {
    if (!agencyId) return;

    connectWebSocket(agencyId, (incomingMessage) => {
      if (incomingMessage.senderId === activeChatId || incomingMessage.receiverId === activeChatId) {
        setMessages((prevMessages) => [...prevMessages, incomingMessage]);
      }
      
      setConversations(prev => {
        const isExisting = prev.find(c => c.id === incomingMessage.senderId || c.id === incomingMessage.receiverId);
        if(!isExisting) {
            return [{
                id: incomingMessage.senderId,
                travelerName: `Traveler ${incomingMessage.senderId}`,
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
  }, [activeChatId, agencyId]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getChatHistory(agencyId, activeChatId);
        setMessages(history);
      } catch (error) {
        console.error("Failed to load history");
      }
    };

    if (activeChatId && agencyId) {
      fetchHistory();
    }
  }, [activeChatId, agencyId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputText.trim() !== "" && agencyId && activeChatId) {
      const newMsg = {
        senderId: agencyId,
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

  const handleSelectTraveler = (traveler) => {
    const existingChat = conversations.find(c => c.id === traveler.id);
    if (existingChat) {
      setActiveChatId(traveler.id);
    } else {
      const newConv = {
        id: traveler.id,
        travelerName: traveler.firstName || traveler.username,
        lastMessage: "New Conversation started",
        time: "Just now",
        unread: 0,
        online: false,
        color: "#8b5cf6"
      };
      setConversations(prev => [newConv, ...prev]);
      setActiveChatId(traveler.id);
    }
    setShowNewChatModal(false);
    setSearchTerm("");
  };

  if (isLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading Chat...</div>;
  }

  // Section: Filter New Chat Travelers and Resolve Active Name
  const filteredTravelers = allTravelers.filter(t => {
    const isAlreadyChatted = conversations.some(c => c.id === t.id);
    const matchesSearch = (t.firstName || t.lastName || "").toLowerCase().includes(searchTerm.toLowerCase()) || t.id.toString().includes(searchTerm);
    return !isAlreadyChatted && matchesSearch;
  });

  const activeTravelerInfo = allTravelers.find(t => t.id === activeChat?.id);
  const activeDisplayName = activeTravelerInfo ? (activeTravelerInfo.firstName || activeTravelerInfo.username) : activeChat?.travelerName;

  return (
    <div className="agency-msg-container">
      <Toaster position="top-right" />
      <div className="agency-chat-layout">
        
        <div className="agency-chat-sidebar">
          <div className="sidebar-top">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Traveler Inbox</h2>
                <button 
                    onClick={() => setShowNewChatModal(!showNewChatModal)} 
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#c87a2c', fontSize: '18px' }}
                    title="Start New Chat"
                >
                    <FaUserPlus />
                </button>
            </div>
            <div className="search-box">
              <FaSearch className="s-icon" />
              <input type="text" placeholder="Search travelers..." />
            </div>
          </div>

          {/* Section: New Chat Traveler Selection Area */}
          {showNewChatModal && (
              <div style={{ padding: '15px', background: '#f9fafb', borderBottom: '1px solid #eee', maxHeight: '300px', overflowY: 'auto' }}>
                  <input 
                      type="text" 
                      placeholder="Search traveler by name or ID..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                  />
                  <div className="traveler-selection-list">
                      {filteredTravelers.length > 0 ? (
                          filteredTravelers.map(traveler => (
                              <div 
                                  key={traveler.id}
                                  onClick={() => handleSelectTraveler(traveler)}
                                  style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '10px' }}
                                  onMouseOver={(e) => e.currentTarget.style.background = '#f0f0f0'}
                                  onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                              >
                                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>
                                      {(traveler.firstName || traveler.username || "T").charAt(0)}
                                  </div>
                                  <div>
                                      <div style={{ fontSize: '14px', fontWeight: '600' }}>{traveler.firstName || traveler.username}</div>
                                      <div style={{ fontSize: '11px', color: '#888' }}>ID: {traveler.id}</div>
                                  </div>
                              </div>
                          ))
                      ) : (
                          <div style={{ fontSize: '12px', color: '#888', textAlign: 'center', padding: '10px' }}>No travelers found</div>
                      )}
                  </div>
              </div>
          )}

          {/* Section: Conversation List Render */}
          <div className="conv-list">
            {conversations.map(chat => {
              const tInfo = allTravelers.find(t => t.id === chat.id);
              const displayName = tInfo ? (tInfo.firstName || tInfo.username) : chat.travelerName;

              return (
                <div 
                  key={chat.id} 
                  className={`conv-item ${activeChatId === chat.id ? 'active-conv' : ''}`}
                  onClick={() => setActiveChatId(chat.id)}
                >
                  <div className="traveler-avatar" style={{ backgroundColor: chat.color }}>
                    {displayName?.charAt(0) || "T"}
                    {chat.online && <div className="on-dot"></div>}
                  </div>
                  <div className="conv-info">
                    <div className="conv-head">
                      <h4>{displayName}</h4>
                      <span className="conv-time">{chat.time}</span>
                    </div>
                    <div className="conv-msg">
                      <p>{chat.lastMessage}</p>
                      {chat.unread > 0 && <span className="u-badge">{chat.unread}</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="agency-chat-main">
          
          {activeChat ? (
              <>
                {/* Section: Active Chat Header Render */}
                <div className="chat-top-bar">
                  <div className="active-user-info">
                    <div className="traveler-avatar" style={{ backgroundColor: activeChat?.color }}>
                      {activeDisplayName?.charAt(0) || "T"}
                    </div>
                    <div>
                      <h3>{activeDisplayName}</h3>
                      <span className="u-status">
                        {activeChat?.online ? <><FaCircle className="dot-icon online" /> Online</> : 'Offline'}
                      </span>
                    </div>
                  </div>
                  <div className="chat-actions">
                    <button className="act-btn"><FaPhoneAlt /></button>
                    <button className="act-btn"><FaEllipsisV /></button>
                  </div>
                </div>

                <div className="chat-msg-area">
                  <div className="day-divider"><span>Chat History</span></div>
                  
                  {messages.map((msg, index) => (
                    <div key={index} className={`msg-wrap ${msg.senderId === agencyId ? 'msg-sent' : 'msg-received'}`}>
                      <div className="msg-bubble">
                        <p>{msg.message}</p>
                        <span className="m-time">{formatTime(msg.timestamp)}</span>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                <div className="chat-type-area">
                  <input 
                    type="text" 
                    placeholder="Type your reply here..." 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSendMessage();
                    }}
                  />
                  <button className="send-reply-btn" onClick={handleSendMessage}>
                    <FaPaperPlane className="snd-icon" />
                  </button>
                </div>
              </>
          ) : (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#888' }}>
                  <h3>Select a conversation or start a new one to begin chatting</h3>
              </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default AgencyMessages;