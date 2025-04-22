import "dotenv/config";
import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import twilio from "twilio";

// Initialize Twilio client using environment variables
const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

// Twilio message service logic
// export const sendMessage = async (req, res) => {
//   try {
//     const message = await client.messages.create({
//       body: req.body.message,
//       from: "whatsapp:+14155238886",
//       contentSid: "HXb5b62575e6e4ff6129ad7c8efe1f983e",
//       contentVariables: JSON.stringify({ 1: "10th March 2025", 2: "10:00 AM" }),
//       to: "whatsapp:+919001402531",
//     });
//     console.log("Message sent successfully:", message.sid);
//     return res.status(200).json({ success: true, msg: "Message sent successfully" });
//   } catch (error) {
//     console.error("Twilio error:", error);
//     return res.status(500).json({ success: false, error: error.message });
//   }
// };

export const sendMessage = async (req, res) => {
  const { name } = req.body;

  try {
    const message = await client.messages.create({
      from: "whatsapp:+14155238886",
      to: "whatsapp:+919001402531", // Replace with actual destination number
      body: `📢 *New Collaboration Opportunity for Your Talent*

Hello! A brand is interested in collaborating with your talent *${name}* for an upcoming campaign. 🚀

🎯 *Opportunity Overview:*  
• Talent Fit: ${name}  
• Usage: Digital & Print  
• Engagement Type: Photoshoots, Endorsement Content  

Kindly confirm interest to proceed further:

🔘 *Reply with:*  
1️⃣ *Interested* – to receive brand and campaign details  
2️⃣ *Not Interested* – to decline the opportunity  

We look forward to your response. Thank you for managing such incredible talent! 🙏`,
    });

    console.log("Message sent successfully:", message.sid);
    return res
      .status(200)
      .json({ success: true, msg: "Message sent successfully" });
  } catch (error) {
    console.error("Twilio error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Register User logic
export const registerUser = async (req, res) => {
  const { name, password, email, role } = req.body;
  try {
    // Normalize email (trim & lowercase) for consistent checking
    const normalizedEmail = email.trim().toLowerCase();

    // Check if user already exists
    const exists = await userModel.findOne({ email: normalizedEmail });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Validate email format and password strength
    if (!validator.isEmail(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Please enter a strong password (at least 8 characters)",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user
    const newUser = new userModel({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role: role || "User",
    });

    // Save the new user in the database
    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

//login user logic
export const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await userModel.findOne({ email: normalizedEmail });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User doesn't exist" });
    }

    if (user.role !== role) {
      return res
        .status(403)
        .json({ success: false, message: "Incorrect role selected" });
    }

    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Password is required" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Include user details in the token payload
    const token = createToken({
      id: user._id,
      name: user.name,
      role: user.role,
    });

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error", error: error.message });
  }
};

// Utility function to create JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};
