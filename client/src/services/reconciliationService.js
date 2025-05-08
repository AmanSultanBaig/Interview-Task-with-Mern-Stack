import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const uploadCSV = (formData) => {
  return axios.post(`${API}/reconciliation/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};