import axios from 'axios'

export const axiosUrl = axios.create({
    baseURL: import.meta.env.MODE === 'development' ? 'http://localhost:5000/api' : 'fintrack-production-8853.up.railway.app/api',
    withCredentials: true
})