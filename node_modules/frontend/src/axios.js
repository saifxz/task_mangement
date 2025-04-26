import axios from 'axios';

const instance = axios.create({
  baseURL: '/api', // Because backend is under /api
});

export default instance;
