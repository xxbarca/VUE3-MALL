import axios from 'axios'
const instance = axios.create({
	baseURL: '',
	timeout: 1000
})

instance.interceptors.request.use(config => {
	
	return config
})

instance.interceptors.response.use(response => {
	return response.data
})

export default instance
