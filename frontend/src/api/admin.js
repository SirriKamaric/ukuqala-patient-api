import apiClient from './apiClient';

// Doctors Section
export const getAdminDoctors = async () => {
  const response = await apiClient.get('/admin/doctors');
  return response.data || [];
};

export const getDoctorAppointments = async (doctorId) => {
  const response = await apiClient.get(`/admin/doctors/${doctorId}/appointments`);
  return response.data || [];
};

export const handleDoctorTicket = async (ticketId, action) => {
  return await apiClient.post(`/admin/tickets/${ticketId}/resolve`, { action });
};

// Patients Section
export const getAdminPatients = async () => {
  const response = await apiClient.get('/admin/patients');
  return response.data || [];
};

// Document Verification Section
export const verifyDocument = async (doctorId, docType, status) => {
  return await apiClient.put(`/admin/doctors/${doctorId}/verify-docs`, { docType, status });
};