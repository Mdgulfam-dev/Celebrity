import React, { useState, useEffect, useCallback } from "react";
import { uploadKYC, getKYCStatus } from "../api/kyc";

const KYCForm = ({ userId: propUserId }) => {
  // Retrieve userId from props or localStorage
  const storedUserId = localStorage.getItem("userId")?.trim();
  const userId = propUserId || storedUserId || null;

  const [isFillingKYC, setIsFillingKYC] = useState(false);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("Pending");
  const [documentType, setDocumentType] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [message, setMessage] = useState("");

  
  // Validate userId format
  useEffect(() => {
    if (!userId || userId.length !== 24) {
      console.error("Invalid User ID:", userId);
      setMessage("Error: Please log in to submit KYC.");
    }
  }, [userId]);

  
  const fetchKYCStatus = useCallback(async () => {
  if (!userId || userId.length !== 24) {
    console.error("Invalid userId:", userId);
    return;
  }

  try {
    const response = await getKYCStatus(userId); 
    console.log("KYC API Response:", response); // Debugging log
    setStatus(response.status);
    localStorage.setItem(`kycStatus_${userId}`, response.status);
  } catch (error) {
    console.error("Error fetching KYC status:", error);
  }
}, [userId]);

  useEffect(() => {
  if (userId) fetchKYCStatus();
  const interval = setInterval(fetchKYCStatus, 10000); 
  return () => clearInterval(interval); 
}, [fetchKYCStatus, userId]);


  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!userId || userId.length !== 24) return setMessage("Error: Invalid user ID format. Please log in again.");
    if (!file || !documentType || !documentNumber.trim()) return setMessage("Please fill in all details and upload a document.");

    try {
      const formData = new FormData();
      formData.append("documentImage", file);
      formData.append("userId", userId);
      formData.append("documentType", documentType);
      formData.append("documentNumber", documentNumber.trim());

      console.log("Submitting KYC Data:", { userId, documentType, documentNumber: documentNumber.trim(), fileName: file.name });

      await uploadKYC(formData);
      setMessage("KYC document submitted successfully!");
      setStatus("Pending");
      localStorage.setItem(`kycStatus_${userId}`, "Pending");
      setIsFillingKYC(false);
    } catch (error) {
      console.error("Failed to submit KYC:", error.response?.data || error.message);
      setMessage("Failed to submit KYC.");
    }
  };

  return (
    <div className="box">
      <h2 className="title is-4">KYC Verification</h2>
      <p><strong>Status:</strong> {status}</p>

      {!isFillingKYC ? (
        <button onClick={() => setIsFillingKYC(true)} className="button is-primary mt-3">
          Complete KYC
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="field">
            <label className="label">Document Type</label>
            <div className="control">
              <div className="select">
                <select value={documentType} onChange={(e) => setDocumentType(e.target.value)} required>
                  <option value="">Select</option>
                  {["Aadhaar", "PAN Card", "Passport"].map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">Document Number</label>
            <div className="control">
              <input type="text" className="input" value={documentNumber} onChange={(e) => setDocumentNumber(e.target.value.trim())} required />
            </div>
          </div>

          <div className="field">
            <label className="label">Upload Document</label>
            <div className="control">
              <input type="file" accept=".pdf,.jpg,.png" onChange={(e) => setFile(e.target.files[0])} required />
            </div>
          </div>

          <button type="submit" className="button is-success">Submit KYC</button>
          {message && <p className="help is-danger mt-2">{message}</p>}
        </form>
      )}
    </div>
  );
};

export default KYCForm;
