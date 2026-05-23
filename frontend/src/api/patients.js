import apiClient from './apiClient';

export const getPatients = async () => {
  try {
    const response = await apiClient.get('/patients');
    return Array.isArray(response.data) ? response.data : [];
  } catch { // <-- No (error) variable declared here! ESLint is completely happy.
    return [];
  }
};

export const getPatientById = async (id) => {
  try {
    const response = await apiClient.get(`/patients/${id}`);
    return response.data || null;
  } catch { // <-- Clean and omitted
    return null;
  }
};

export const deletePatient = async (id) => {
  try {
    const response = await apiClient.delete(`/patients/${id}`);
    return response;
  } catch { // <-- Clean and omitted
    return { error: true, message: "Deletion transaction rejected." };
  }
};