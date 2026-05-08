import apiClient from './apiClient';

// 1. Existing function to get all patients
export const getPatients = async () => {
  const response = await apiClient.get('/patients');
  return response.data || [];
};

// 2. MISSING FUNCTION: Add this to fix the error
export const getPatientById = async (id) => {
  const response = await apiClient.get(`/patients/${id}`);
  return response.data;
};

// 3. Existing function to delete a patient
export const deletePatient = async (id) => {
  return await apiClient.delete(`/patients/${id}`);
};