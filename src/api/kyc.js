import axios from "axios";
import { config } from "../config";

const API_BASE_URL = `${config.API_URL}/api/kyc`;

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
