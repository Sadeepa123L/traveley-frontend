import api from './api';
import Cookies from 'js-cookie';

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

     const response = await api.get('agencyProfile/activeAgencies', {
        headers: { 
            'Authorization': `Bearer ${token}` 
        }
    });
    return response.data;
}

export const getLatestPackages = async () => {
     const token = Cookies.get('jwt_token');

     const response = await api.get('/tourPackage/latestPackages', {

        headers: {
            'Authorization': `Bearer ${token}`
        }
     });
     return response.data;
}

export const saveTravelerProfile = async (formData) => {

    const token = Cookies.get('jwt_token');

    const response = await api.post('/TravelerProfile/save', formData, {

        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}

export const getProfile = async () => {

    const token = Cookies.get('jwt_token');
    const response = await api.get('/TravelerProfile/getProfile', {

        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}
export const getAllProfiles = async () => {

    const token = Cookies.get('jwt_token');
    const response = await api.get('/TravelerProfile/getAllProfiles', {

        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}

