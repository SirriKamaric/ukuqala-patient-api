import apiClient from './apiClient';

/* =========================
   GET ALL PATIENTS
========================= */
export const getPatients = async () => {
  try {
    const response = await apiClient.get('/patients');
    return Array.isArray(response.data) ? response.data : [];
  } catch {
    return [];
  }
};

/* =========================
   CREATE PATIENT
========================= */
export const createPatient = async (data) => {
  try {
    const response = await apiClient.post('/patients', data);
    return response.data;
  } catch {
    return { error: true, message: "Creation failed." };
  }
};

/* =========================
   GET SINGLE PATIENT
========================= */
export const getPatientById = async (id) => {
  try {
    const response = await apiClient.get(`/patients/${id}`);
    return response.data || null;
  } catch {
    return null;
  }
};

/* =========================
   UPDATE PATIENT (FIX ADDED)
========================= */
export const updatePatient = async (id, data) => {
  try {
    const response = await apiClient.put(`/patients/${id}`, data);
    return response.data;
  } catch {
    return { error: true, message: "Update failed." };
  }
};

/* =========================
   DELETE PATIENT
========================= */
export const deletePatient = async (id) => {
  try {
    const response = await apiClient.delete(`/patients/${id}`);
    return response.data;
  } catch {
    return { error: true, message: "Deletion failed." };
  }
};