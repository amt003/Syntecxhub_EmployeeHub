import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Employee API calls
export const employeeAPI = {
  // Get all employees
  getAll: async () => {
    try {
      const response = await api.get("/employees");
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Error fetching employees" };
    }
  },

  // Get single employee
  getById: async (id) => {
    try {
      const response = await api.get(`/employees/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Error fetching employee" };
    }
  },

  // Create new employee
  create: async (data) => {
    try {
      const response = await api.post("/employees", data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Error creating employee" };
    }
  },

  // Update employee
  update: async (id, data) => {
    try {
      const response = await api.put(`/employees/${id}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Error updating employee" };
    }
  },

  // Delete employee
  delete: async (id) => {
    try {
      const response = await api.delete(`/employees/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Error deleting employee" };
    }
  },
};

export default api;
