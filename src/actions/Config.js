import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

export default axios
