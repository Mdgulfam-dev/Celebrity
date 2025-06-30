import axios from "axios";
import { config } from "../../config";

const API_URL = `${config.API_URL}/api/kyc`;

export const getUsers = async () => axios.get(`${API_URL}/all`);

// Corrected Approve API Call
export const approveKYC = async (userId) =>
  axios.put(`${API_URL}/verify/${userId}`, { status: "approved" });

// Corrected Reject API Call
export const rejectKYC = async (userId, rejectionReason = "No reason provided") =>
  axios.put(`${API_URL}/verify/${userId}`, { status: "rejected", rejectionReason });