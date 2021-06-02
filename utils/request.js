import axios from './axios';

const GET = url => {
  console.log('url ' + url);
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
