import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import axios from 'axios';
import Cookies from 'js-cookie';


const BASE_URL = 'http://localhost:8080';

let stompClient = null;

export const connectWebSocket = (userId, onMessageReceived) => {
    const socket = new SockJS(`${BASE_URL}/ws`);
    
    stompClient = new Client({
        webSocketFactory: () => socket,
        debug: (str) => {
            console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
    });

    stompClient.onConnect = (frame) => {
        console.log('Connected: ' + frame);
        
        stompClient.subscribe(`/user/${userId}/queue/messages`, (message) => {
            const receivedMessage = JSON.parse(message.body);
            onMessageReceived(receivedMessage);
        });
    };

    stompClient.onStompError = (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
    };

    stompClient.activate();
};

export const sendMessage = (chatMessage) => {
    if (stompClient && stompClient.connected) {
        stompClient.publish({
            destination: "/app/chat",
            body: JSON.stringify(chatMessage)
        });
    } else {
        console.error("WebSocket is not connected.");
    }
};

export const disconnectWebSocket = () => {
    if (stompClient !== null) {
        stompClient.deactivate();
    }
    console.log("Disconnected");
};

export const getChatHistory = async (senderId, receiverId) => {
    try {
        const token = Cookies.get('jwt_token'); 
        
        const response = await axios.get(`${BASE_URL}/messages/${senderId}/${receiverId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching chat history", error);
        throw error;
    }
};

export const getConversations = async (userId) => {
    try {
        const token = Cookies.get('jwt_token'); 
        const response = await axios.get(`${BASE_URL}/conversations/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        return response.data.map(msg => {
            const otherUserId = msg.senderId === userId ? msg.receiverId : msg.senderId;
            return {
                id: otherUserId,
                travelerName: `Traveler ${otherUserId}`, 
                lastMessage: msg.message,
                time: new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                unread: 0,
                online: false,
                color: "#0284c7"
            };
        });
    } catch (error) {
        throw error;
    }
};