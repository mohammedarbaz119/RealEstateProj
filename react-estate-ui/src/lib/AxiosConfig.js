import Axios from 'axios';


const ApiRequest = Axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`||'http://localhost:3000/api',
    withCredentials: true,
});
export default ApiRequest;