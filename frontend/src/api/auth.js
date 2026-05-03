import apiClient from './apiClient';

/**
 * Requirement 4.0: User Registration
 * POST /api/v4/auth/register
 */
export const registerUser = async (userData) => {
  const response = await apiClient.post('/auth/register', userData);
  return response.data;
};

/**
 * Requirement 4.1: User Login
 * POST /api/v4/auth/login
 */
export const loginUser = async (credentials) => {
  const response = await apiClient.post('/auth/login', credentials);
  
  // We return the raw data here. 
  // The AuthContext 'login' function we wrote will handle the localStorage 
  // and state updates to ensure everything stays in sync.
  return response.data;
};

/**
 * Fetch All Patients
 * GET /api/v4/patients
 */
export const getPatients = async () => {
  const response = await apiClient.get('/patients');
  return response.data;
};

/**
 * Fetch Single Patient Details
 * GET /api/v4/patients/:id
 */
export const getPatientById = async (id) => {
  const response = await apiClient.get(`/patients/${id}`);
  return response.data;
};