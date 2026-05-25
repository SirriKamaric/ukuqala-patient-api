import axios from "axios";

const API = "http://localhost:3000/api/v4/appointments";

export const getAppointments = () => axios.get(API);

export const createAppointment = (data) => axios.post(API, data);

export const deleteAppointment = (id) =>
  axios.delete(`${API}/${id}`);

export const updateAppointment = (id, data) =>
  axios.put(`${API}/${id}`, data);