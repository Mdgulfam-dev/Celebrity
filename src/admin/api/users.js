import axios from "axios";

const API_URL = "http://localhost:4000/api/kyc";

export const getUsers = async () => axios.get(`${API_URL}/all`);

// Corrected Approve API Call
export const approveKYC = async (userId) =>
  axios.put(`${API_URL}/verify/${userId}`, { status: "approved" });

// Corrected Reject API Call
export const rejectKYC = async (userId, rejectionReason = "No reason provided") =>
  axios.put(`${API_URL}/verify/${userId}`, { status: "rejected", rejectionReason });