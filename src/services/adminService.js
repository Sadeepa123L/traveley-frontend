import api from './api'
import Cookies from 'js-cookie';

export const getPendingAgencies = async () => {
    try{
         const token = Cookies.get('jwt_token');

         const response = await api.get('/agency/pending', {
            headers: {
                Authorization: `Bearer ${token}`
            }
         });
         return response.data.data;
    }catch(error){
        throw error.response ? error.response.data : new Error("Network Error");
    }
}