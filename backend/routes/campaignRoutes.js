//Campaign create in campaign form------------
import express from "express";
import Campaign from "../models/campaignModel.js";
// import generateRecommendation from "../utils/generateRecommendation.js";
const campaignRoutes = express.Router();

campaignRoutes.post("/generate", async (req, res) => {
  try {
    const { brand, persona, involvementType, audience, budget } = req.body;
    const name = brand;

    const now = new Date();

    // Create a time window to match existing campaigns (e.g., within 1 hour)
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

    const existingCampaign = await Campaign.findOne({
      name,
      createdAt: { $gte: oneHourAgo, $lte: oneHourLater },
    });

    if (existingCampaign) {
      return res.status(200).json({
        message: "Campaign already exists with same name and time",
        campaign: existingCampaign,
      });
    }

    const newCampaign = new Campaign({
      name,
      persona,
      involvementType,
      audience,
      budget,
    });

    await newCampaign.save();

    res.status(201).json({
      message: "New campaign stored",
      campaign: newCampaign,
      // recommendation, // add this back if needed
    });
  } catch (err) {
    console.error("Error storing campaign:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default campaignRoutes;
