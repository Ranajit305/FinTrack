import axios from 'axios'

export const axiosUrl = axios.create({
    baseURL: import.meta.env.MODE === 'development' ? 'http://localhost:5000/api' : import.meta.env.CLIENT_URL,
    withCredentials: true
})