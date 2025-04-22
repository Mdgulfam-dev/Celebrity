import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api/kyc";

export const uploadKYC = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/submit`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getKYCStatus = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/status/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
