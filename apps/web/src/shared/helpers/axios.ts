import axios from 'axios';

// Set config defaults when creating the instance
const reqInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:3001'
  }
});

export default reqInstance
