import axios from 'axios'

const api = axios.create({
	//baseURL: 'https://mycloud-backend.herokuapp.com'
	baseURL : process.env.REACT_APP_BASE_URL || 'http://localhost:3001'
})

api.interceptors.request.use(async config =>{
	const token = localStorage.getItem('auth-token')
	if(token){
		config.headers.authorization = `Bearer ${token}`
	}
	return config
})
export default api;