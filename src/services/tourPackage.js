import api from './api'
import Cookies from 'js-cookie';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/tourPackage';

export const saveTourPackage = async (formData) => {
    try{

        const token = Cookies.get('jwt_token');

        if (!token) {
        throw new Error("No authentication token found. Please login again.");
            }
        const reponse = await axios.post(`${API_BASE_URL}/save`, formData, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });

        return reponse.data;
       

    }catch(error){
        console.error("Axios Error:", error);
        const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || "Failed to save Tour Package";
        throw new Error(errorMessage);
    }
};