import { data } from 'react-router-dom';
import api from './api'
import Cookies from 'js-cookie';


export const registerAgency = async(username, password) => {
    try{
        const response = await api.post('/auth/register/agency', {username, password});
        return response.data;
    }catch(err){
        throw err.response ? err.response.data : new err("Network Error");
    }
};

export const loginAgency = async(username, password) => {
    try{
        const response = await api.post('/auth/login/agency', {username,password});
        return response.data;
    }catch(error){
        throw error.response ? error.response.data : new error("Network Error");
    }
};

export const saveOrUpdateAgencyProfile = async (formData) => {
    try{

        const token = Cookies.get('jwt_token');
    
        if (!token) {
            throw new Error("No authentication token found. Please login again.");
        }

        const response = await api.post('agencyProfile/save', formData,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        return response.data;

    }catch(error){
        console.error("Axios Error:", error);
        const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || "Failed to save profile.";
        throw new Error(errorMessage);
    }
};

export const getMyProfile = async () => {
    try{
        const token = Cookies.get('jwt_token');
        if(!token) throw new Error("NO token found")

                const reponse = await api.get('agencyProfile/getProfile',{
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });
        return reponse.data;
    }catch(error){
        console.error("Error fetching profile:", error);
        throw new Error("Failed to fetch agency profile");
    }
}

export const updatePassword = async (passwordData) => {
        const token = Cookies.get('jwt_token');
        if(!token) throw new Error("NO token found")

            const response = await api.put('agency/updatePassword', passwordData, {
                headers : {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;

};
export const getActiveAndSuspendAgencies = async () => {
     const token = Cookies.get('jwt_token');

     const response = await api.get('agencyProfile/active-suspend', {
        headers: { 
            'Authorization': `Bearer ${token}` 
        }
    });
    return response.data;
}

export const updateStatus = async (id) => {
     const token = Cookies.get('jwt_token');
     console.log(token);
          const response = await api.put(`agency/updateStatus/${id}`, {}, {
        headers: { 
            'Authorization': `Bearer ${token}` 
        }
    });
    return response.data;
}

export const deleteAgency = async (id) => {

    const token = Cookies.get('jwt_token');

              const response = await api.delete(`admin/deleteAgency/${id}`,{
        headers: { 
            'Authorization': `Bearer ${token}` 
        }
    });
    return response.data;
}
