import api from './api';

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