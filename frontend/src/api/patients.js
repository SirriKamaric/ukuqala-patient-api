// src/api/patients.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const deletePatient = async (id) => {
  const token = localStorage.getItem('token');
  const response = await axios.delete(`${API_URL}/api/patients/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};