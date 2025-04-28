
import express from "express";
import User from "../models/userModel.js"; 
import Campaign from "../models/campaignModel.js"; 
import Interest from "../models/interestModel.js";
import RecommendProfile from "../models/RecommendProfileModel.js"; // ✅ FIXED


const analytics_router = express.Router();

//  Track a new campaign
analytics_router.post("/track-campaign", async (req, res) => {
  try {
    const { campaignName } = req.body;

    if (!campaignName) {
      return res.status(400).json({ error: "Campaign name is required" });
    }

    const campaign = await Campaign.create({ name: campaignName });

    res.json({ message: "Campaign tracked successfully", campaign });
  } catch (error) {
    console.error("Error tracking campaign:", error);
    res.status(500).json({ error: "Failed to track campaign" });
  }
});

// Track interest in a celebrity (by name)
analytics_router.post("/track-interest", async (req, res) => {
  try {
    const { name, userId , campaignId = null } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Celebrity name is required" });
    }

    // Step 1: Find the profile
    const profile = await RecommendProfile.findOne({ name });
    if (!profile) {
      return res.status(404).json({ error: "Celebrity not found" });
    }

    // Step 2: Increment interest count
    profile.interestCount = (profile.interestCount || 0) + 1;
    await profile.save();

    // Step 3: Store in Interest collection (log)
    const newInterest = new Interest({
      userId,
      campaignId,
      celebrityName: name,
    });
    await newInterest.save();

    // Step 4: Respond to client
    res.json({ message: "Interest tracked successfully", profile });
  } catch (error) {
    console.error("Error tracking interest:", error);
    res.status(500).json({ error: "Failed to track interest" });
  }
});



//  Fetch analytics data
analytics_router.get("/analytics", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCampaigns = await Campaign.countDocuments();
    const totalInterests = await Interest.countDocuments();

    //  Conversion rate: (Total Interests / Total Campaigns) * 100
    const conversionRate = totalCampaigns
      ? ((totalInterests / totalCampaigns) * 100).toFixed(2)
      : 0;

    res.json({
      totalUsers,
      totalCampaigns,
      totalInterests,
      conversionRate: `${conversionRate}%`,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ message: "Failed to fetch analytics", error });
  }
});

export default analytics_router;
