import axios from 'axios';

import {BASE_URL} from '../utils';

export const request = async (options, isHeader = true, isFormData = false) => {

  const client = axios.create({
    baseURL: BASE_URL,
    headers: {
      accept: 'application/json',
      // Referer: BASE_URL,
    },
  });

  const onSuccess = (response) => {
    return Promise.resolve(response.data);
  };

  const onError = (error) => {
    console.debug('Request Failed:', error.config);
    if (error.response) {
      const {status, data} = error.response;
      
      console.debug('Status:', error.response.status);
      console.debug('Data:', error.response.data);
      console.debug('Headers:', error.response.headers);

    } else {
      console.debug('Error Message:', error.message);
    }

    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};
