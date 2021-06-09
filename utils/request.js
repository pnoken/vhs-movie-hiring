import axios from './axios';
import { localStorageToJson } from './shared';

//

const GET = url => {
  if (localStorageToJson())
    axios.defaults.headers.common['auth-token'] = localStorageToJson().token;

  return axios.get(url).catch(error => {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      console.log(`Error from Request ${error.request}`);
    } else {
      console.log(`General Error ${error.message}`);
    }
  });
};

const POST = (url, params = {}) => {
  axios.defaults.headers.common['auth-token'] = localStorageToJson().token;
  return axios.post(url, params).catch(error => {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      console.log(`Error from Request ${error.request}`);
    } else {
      console.log(`General Error ${error.message}`);
    }
  });
};

const PATCH = (url, params = {}) => {
  axios.defaults.headers.common['auth-token'] = localStorageToJson().token;
  return axios.patch(url, params).catch(error => {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      console.log(`Error from Request ${error.request}`);
    } else {
      console.log(`General Error ${error.message}`);
    }
  });
};

const PUT = (url, params = {}) => {
  axios.defaults.headers.common['auth-token'] = localStorageToJson().token;
  return axios.put(url, params).catch(error => {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      console.log(`Error from Request ${error.request}`);
    } else {
      console.log(`General Error ${error.message}`);
    }
  });
};

const DELETE = url => {
  axios.defaults.headers.common['auth-token'] = localStorageToJson().token;
  return axios.delete(url).catch(error => {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      console.log(`Error from Request ${error.request}`);
    } else {
      console.log(`General Error ${error.message}`);
    }
  });
};

export { GET, POST, PATCH, PUT, DELETE };
