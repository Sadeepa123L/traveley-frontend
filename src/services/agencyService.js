import api from './api'

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
