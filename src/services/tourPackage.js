import api from './api'
import Cookies from 'js-cookie';

export const saveTourPackage = async (formData) => {
    try{

        const token = Cookies.get('jwt_token');

        if (!token) {
        throw new Error("No authentication token found. Please login again.");
            }
        const reponse = await api.post('tourPackage/save', formData, {
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

export const getMyPackages = async ()=>{
    try{
        const token = Cookies.get('jwt_token');
        if(!token) throw new Error("NO token found")

            const reponse = await api.get('tourPackage/myPackages',{
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });
        return reponse.data;
    }catch(error){
        console.error("Error fetching packages:", error);
        throw new Error("Failed to fetch packages");
    }
};

export const updatePackage = async (id, formData) => {
    try{
        const token = Cookies.get('jwt_token');
        if(!token) throw new Error("NO token found")

            const response = await api.put(`tourPackage/update/${id}`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }catch(error){
        console.error("Error updating package:", error);

        if (error.response && error.response.data && error.response.data.error) {
            throw new Error(error.response.data.error);
        }
        throw new Error("Failed to update package");
    }
 };
 export const deletePackage = async (id) => {
        const token = Cookies.get('jwt_token');

        const response = await api.delete(`tourPackage/delete/${id}`, {

        headers: { 'Authorization': `Bearer ${token}` }

    });
     return response.data;
    };

 export const getActivePackages = async () => {
    const token = Cookies.get('jwt_token');

    const response = await api.get('tourPackage/activePackages', {
        headers: { 
            'Authorization': `Bearer ${token}` 
        }
    });
    return response.data;
 };