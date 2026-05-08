// src/utils/formatters.js

/**
 * Capitalizes the first letter of a string (e.g., 'male' -> 'Male')
 * Requirement 6.2: Centralized utility function
 */
export const formatGender = (str) => {
  if (!str) return 'N/A';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Checks if vitals are within clinical 'Normal' ranges
 * Requirement 4.4: Business logic for health monitoring
 */
export const isAbnormal = (v) => {
  const heartRateAbnormal = v.heartRate < 60 || v.heartRate > 100;
  const tempAbnormal = v.temperature < 36 || v.temperature > 37.5;
  return heartRateAbnormal || tempAbnormal;
};