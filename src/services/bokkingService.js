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