import mongoose from "mongoose";
import User from "./userModel.js";  //  Ensure the correct import path

const ProfileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: {type: String},
    weight: {type: Number},
    height: {type: Number},
    location: { type: String, required: true },
    instagramFollowers: { type: Number, default: 0 },
    engagementPercentage: { type: Number, default: 0 },
    averageROI: { type: Number, default: 0 },
    image: { type: String },  // Store image filename
}, { timestamps: true });

// Use existing model if available or create a new one
const Profile = mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);
export default Profile;
