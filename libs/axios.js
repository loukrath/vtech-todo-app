// Import axios
import Axios from 'axios';

const axios = Axios.create({
  baseURL: process.env.NEXT_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default axios;
