import api from './api';
import Cookies from 'js-cookie';

export const bookTourPackage = async (formData) => {
        const token = Cookies.get('jwt_token');

    const response = await api.post('/booking/bookTourPackage', formData, {

        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}

export const getAllBookings = async () => {
     const token = Cookies.get('jwt_token');

        const response = await api.get('/booking/getAllBookings',{

        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    return response.data;
}

export const updateStatus = async (id) => {
     const token = Cookies.get('jwt_token')

        const response = await api.put(`/booking/updateStatus/${id}`, {},{

        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}

export const getTopPackages = async () => {
        const token = Cookies.get('jwt_token')

        const response = await api.get('/booking/getTopPackages', {

        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}
export const getWeeklyRevenue = async () => {

        const token = Cookies.get('jwt_token')

        const response = await api.get('/booking/getWeeklyRevenue', {

        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}

export const resentBookings = async () => {

    
        const token = Cookies.get('jwt_token')

        const response = await api.get('/booking/getLatestBookings', {

        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}