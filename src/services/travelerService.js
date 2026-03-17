import api from './api';
import Cookies from 'js-cookie';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/agencyProfile'

export const registerTraveler = async (username, password) => {
    try {
        const response = await api.post('/auth/register/traveler', { username, password });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Network Error");
    }
};
export const redirectToGoogle = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
};

export const loginTraveler = async(username, password) => {
    try{
        const response = await api.post('/auth/login/traveler', {username,password});
        return response.data;
    }catch(error){
        throw error.response ? error.response.data : new error("Network Error");
    }
};

export const getActiveAgencies = async () => {
     const token = Cookies.get('jwt_token');

     const response = await axios.get(`${API_BASE_URL}/activeAgencies`, {
        headers: { 
            'Authorization': `Bearer ${token}` 
        }
    });
    return response.data;
}
