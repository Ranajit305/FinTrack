import axios from 'axios'

export const axiosUrl = axios.create({
    baseURL: import.meta.env.BASE_URL || 'http://localhost:5000/api',
    withCredentials: true
})