import express from "express";
import { createProfile, getUserProfile, updateProfile, deleteProfile } from "../controllers/profileController.js";
import { upload } from "../middleware/upload.js";
import authMiddleware from "../middleware/auth.js"; // ✅ Apply authentication


const router = express.Router();

// Create Profile (Authenticated User)
router.post("/profile", authMiddleware, upload.single("image"), createProfile);

// Get Logged-In User's Profile
router.get("/profile", authMiddleware, getUserProfile);

// Update Logged-In User's Profile
router.put("/profile", authMiddleware, upload.single("image"), updateProfile);

// Delete Logged-In User's Profile
router.delete("/profile", authMiddleware, deleteProfile);




export default router;
