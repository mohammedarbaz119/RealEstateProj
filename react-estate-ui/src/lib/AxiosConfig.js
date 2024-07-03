import Axios from 'axios';


const ApiRequest = Axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true,
});
export default ApiRequest ;