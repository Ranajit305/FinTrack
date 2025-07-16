import axios from 'axios'

export const axiosUrl = axios.create({
    baseURL: import.meta.env.MODE === 'development' ? 'http://localhost:5000/api' : 'https://fintrack-70c3.onrender.com/api',
    withCredentials: true
})
