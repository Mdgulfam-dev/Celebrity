import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Profile from "../models/Profile.js";
import mongoose from "mongoose"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a New Profile (Secure)
export const createProfile = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);
    console.log("User from JWT:", req.user); //  Debugging User ID

    const {
      name,
      age,
      location,
      instagramFollowers,
      engagementPercentage,
      height,
      weight,
      gender,
      averageROI,
    } = req.body;
    
    const image = req.file ? req.file.filename : null;

    
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized. No user ID found." });
    }

    
    if (
      !name ||
      !age ||
      !location ||
      !instagramFollowers ||
      !engagementPercentage ||
      !averageROI
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    //correct data types (convert numbers if needed)
    const newProfile = new Profile({
      user: req.user.id,
      name,
      age: Number(age),
      gender,
      height: Number(height) || null,
      weight: Number(weight) || null,
      location,
      instagramFollowers: Number(instagramFollowers),
      engagementPercentage: Number(engagementPercentage),
      averageROI: Number(averageROI),
      image,
    });

    console.log("Profile to be saved:", newProfile); //Debug Profile Object

    await newProfile.save();
    res.status(201).json({ message: "Profile created successfully", profile: newProfile });
  } catch (error) {
    console.error("Error saving profile:", error);
    res.status(500).json({ error: "Error saving profile" });
  }
};


//  Get Logged-In User's Profile 
export const getUserProfile = async (req, res) => {
  try {
    console.log("User ID from JWT:", req.user.id); // Debug

    // Convert `req.user.id` to a valid ObjectId
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const profile = await Profile.findOne({ user: userId }).populate(
      "user",
      "name email"
    );

    if (!profile) {
      console.log("Profile not found for user ID:", req.user.id); //  Debug
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Error fetching profile" });
  }
};


//  Update Profile (Secure)

export const updateProfile = async (req, res) => {
  try {
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: req.body },
      { new: true } // Ensures fresh data is returned
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json({ message: "Profile updated successfully", profile: updatedProfile });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Error updating profile" });
  }
};



//  Delete Profile (Secure)
export const deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    console.log("User ID from request:", req.body.userId); //for debug

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    //Delete associated image file
    if (profile.image) {
      const imagePath = path.join(__dirname, "../uploads", profile.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Profile.deleteOne({ user: req.user.id }); // Ensure only logged-in user can delete their profile
    res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting profile" });
  }
};
