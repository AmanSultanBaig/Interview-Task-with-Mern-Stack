import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const uploadCSV = (formData) => {
  return axios.post(`${API}/reconciliation/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getResource = async (apiKey) => {
  try {
    const response = await axios.get(`${API}/resource`, {
      headers: {
        'apikey': apiKey,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { message: 'Network Error' };
    }
  }
};

export const getFlags = (userId, region) => {
  return axios.get(`${API}/flags`, {
    params: { user: userId, region: region }
  });
};
