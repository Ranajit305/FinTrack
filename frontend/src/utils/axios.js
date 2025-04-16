import axios from 'axios'

export const axiosUrl = axios.create({
    baseURL: import.meta.env.MODE === 'development' ? 'http://localhost:5000/api' : import.meta.env.BASE_URL,
    withCredentials: true
})