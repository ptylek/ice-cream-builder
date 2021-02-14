import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://react-complete-guide-8d83b-default-rtdb.firebaseio.com/'
});

export default instance;