import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import adminAuth from "../middleware/adminAuth.js";
import KYC from "../models/KYC.js";
import fs from "fs";
import path from "path";

// Ensure uploads/kyc directory exists
const kycDir = path.join(process.cwd(), "uploads/kyc");
if (!fs.existsSync(kycDir)) {
    fs.mkdirSync(kycDir, { recursive: true });
}

const kycRouter = express.Router();

const ALLOWED_DOCUMENT_TYPES = ["Aadhaar", "PAN Card", "Passport"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
const ALLOWED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];

// Multer Setup for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/kyc"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const fileFilter = (req, file, cb) => {
  if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
    return cb(new Error('Invalid file type. Only PDF, JPG, and PNG files are allowed.'));
  }
  cb(null, true);
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE }
});

//submit kyc form
kycRouter.post("/submit", upload.single("documentImage"), async (req, res) => {
  try {
    const { userId, documentType, documentNumber } = req.body;
    const documentImage = req.file ? req.file.path : null;

    console.log("Received userId:", userId);
    console.log("Received file:", req.file);
    console.log("Received documentType:", documentType);
    console.log("Received documentNumber:", documentNumber);

    if (!userId || userId.length !== 24) {
      return res.status(400).json({ error: "Invalid user ID format." });
    }

    if (!documentImage) {
      return res.status(400).json({ error: "Document image is required." });
    }

    if (!ALLOWED_DOCUMENT_TYPES.includes(documentType)) {
      return res.status(400).json({ error: "Invalid document type. Allowed types: Aadhaar, PAN Card, Passport" });
    }

    // Check if document number already exists
    const existingKYC = await KYC.findOne({ documentNumber });
    if (existingKYC) {
      return res.status(400).json({ error: "This document number has already been used for KYC verification." });
    }

    const kycData = new KYC({
      userId,
      documentType,
      documentNumber,
      documentImage,
      status: "pending"
    });

    await kycData.save();
    res.status(201).json({ message: "KYC submitted successfully!" });

  } catch (error) {
    console.error("KYC Submission Error:", error);
    if (error.code === 11000) { // MongoDB duplicate key error
      return res.status(400).json({ error: "This document number has already been used for KYC verification." });
    }
    if (error.message.includes('Invalid file type')) {
      return res.status(400).json({ error: error.message });
    }
    if (error.message.includes('File too large')) {
      return res.status(400).json({ error: "File size exceeds the 5MB limit." });
    }
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});




//  Get KYC Status for a User
kycRouter.get("/status/:userId", async (req, res) => {
    
    try {
        
        const { userId } = req.params;
         console.log("Fetching KYC status for userId:", req.params.userId); // Debugging line

        //  Debugging Log
        console.log("Fetching KYC status for userId:", userId);

        // Validate userId before querying
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid or missing userId" });
        }


        const kyc = await KYC.findOne({ userId: new mongoose.Types.ObjectId(userId) });

        if (!kyc) {
            return res.status(404).json({ message: "No KYC record found" });
        }

        res.json({ status: kyc.status });
    } catch (error) {
        console.error("Error fetching KYC status:", error);
        res.status(500).json({ message: "Error fetching KYC status", error: error.message });
    }
});



kycRouter.get("/all", async (req, res) => {
  try {
    const kycs = await KYC.find().populate("userId", "name email role"); // Fetch name, email, and role

    res.json(
      kycs.map(kyc => ({
        _id: kyc._id,
        name: kyc.userId?.name || "Unknown",  // Handle missing user
        email: kyc.userId?.email || "Unknown",
        role: kyc.userId?.role || "User",  // Default role if not found
        kycStatus: kyc.status,
        kycDocument: kyc.documentImage
      }))
    );
  } catch (error) {
    console.error("Error fetching KYC records:", error);
    res.status(500).json({ message: "Error fetching KYC records", error: error.message });
  }
});



//  Admin: Approve or Reject KYC

kycRouter.put("/verify/:id",  async (req, res) => {
    let { status, rejectionReason } = req.body;
    status = status.toLowerCase(); // Normalize case

    if (!["approved", "rejected"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
    }

    try {
        const kyc = await KYC.findById(req.params.id);
        if (!kyc) return res.status(404).json({ message: "KYC record not found" });

        kyc.status = status;
        
        if (status === "rejected") {
            kyc.rejectionReason = rejectionReason || "No reason provided";
        } else {
            kyc.rejectionReason = undefined; // Better than an empty string
        }

        await kyc.save();
        res.json({ message: `KYC ${status} successfully`, kyc });
    } catch (error) {
        console.error("Error updating KYC status:", error);
        res.status(500).json({ message: "Error updating KYC status", error: error.message });
    }
});


export default kycRouter;
