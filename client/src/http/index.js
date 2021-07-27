import axios from 'axios'

export const API_URL = 'http://localhost:5000/api' 

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL 
}) 

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

api.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalRequest = error.config
        if(error.response.status === 419 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true
            try {
                const { data } = await axios.get(`${API_URL}/users/refresh`, {withCredentials: true})
                localStorage.setItem('token', data.accessToken)
                return api.request(originalRequest)
            } catch(e) {
                throw new Error('Not authorizate')
            }
        }
        throw error
    }
)

export default api