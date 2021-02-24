import axios from 'axios';

const apiServer = axios.create({
    baseURL: process.env.API_SERVER_ADDRESS
});

export default apiServer