// This line fixes the 'apiClient is not defined' error
import apiClient from './apiClient'; 

/**
 * Requirement 4.1: User Login
 */
export const loginUser = async (credentials) => {
  // Uses the imported apiClient to talk to http://localhost:3000/api/v4
  const response = await apiClient.post('/auth/login', credentials); 
  return response.data;
};

/**
 * Requirement 4.0: User Registration
 */
export const registerUser = async (userData) => {
  const response = await apiClient.post('/auth/register', userData);
  return response.data;
};