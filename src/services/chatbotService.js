import axios from 'axios';

const API_URL = 'http://localhost:8080/api/chatbot/ask';

export const sendMessageToChatbot = async (message) => {
    try{
        const response = await axios.get(`${API_URL}?message=${message}`);
        return response.data;
    }catch(error){
        console.error('Error sending message to chatbot:', error);
        throw error;
    }
};