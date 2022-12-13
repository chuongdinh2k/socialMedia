import axios from 'axios';

export const configBaseURL = axios.defaults.baseURL = 'http://localhost:5000';
export const configAuthorization = axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
export const configIdAccount = axios.defaults.headers.common['IdAccount'] = `Bearer ${localStorage.getItem('idAccount')}`;
export const configIdUser = axios.defaults.headers.common['IdUser'] = `Bearer ${localStorage.getItem('idUser')}`;

export const configHeader = {
    configAuthorization,
    configIdAccount,
    configIdUser
};



