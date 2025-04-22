import express from "express";
import RecommendProfile from "../models/RecommendProfileModel.js";
import mongoose from "mongoose";

const recommendRoutes = express.Router();

// Middleware to parse JSON body
recommendRoutes.use(express.json());


// Store or Update Recommended Profiles--LATEST
// recommendRoutes.post("/store-profiles", async (req, res) => {
//   try {
//     // console.log(" Received Data:", req.body);

//     const profiles = req.body;
//     if (!Array.isArray(profiles) || profiles.length === 0) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid or empty data format" });
//     }

//     //  Convert follower count (e.g., "500K" → 500000)
//     const parseFollowers = (followers) => {
//       if (typeof followers === "string") {
//         const num = parseFloat(followers.trim().replace(/[^\d.]/g, "")); // Trim & clean
//         if (followers.includes("K")) return num * 1000;
//         if (followers.includes("M")) return num * 1000000;
//       }
//       return Number(followers) || 0;
//     };

  
//     //  Format Data Before Storing
//     const formattedProfiles = profiles.map((profile) => ({
//       ...profile,
//       followers: parseFollowers(profile.followers),
//       engagementRate: profile.fanEngagementRate || profile.engagementRate, // Handle missing engagementRate
//     }));

//     //  Bulk Insert or Update --> It involves same action multiple times for saving time like creation, updation and deletion.
//     const bulkOperations = formattedProfiles.map((profile) => ({
//       updateOne: {
//         filter: { name: new RegExp(`^${profile.name}$`, "i") }, // Case-insensitive match
//         update: { $set: profile },
//         upsert: true, // Insert if not found
//       },
//     }));

//     const result = await RecommendProfile.bulkWrite(bulkOperations, {
//       ordered: false,
//     });
//     console.log("BulkWrite Result:", result);

//     res.json({ success: true, message: "Profiles stored successfully" });
//   } catch (error) {
//     console.error(" Database Error:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });


// recommendRoutes.post("/store-profiles", async (req, res) => {
//   try {
//     console.log(" Received Data:", req.body);

//     const profiles = req.body;
//     if (!Array.isArray(profiles) || profiles.length === 0) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid or empty data format" });
//     }

//     //  Convert follower count (e.g., "500K" → 500000)
//     const parseFollowers = (followers) => {
//       if (typeof followers === "string") {
//         const num = parseFloat(followers.trim().replace(/[^\d.]/g, "")); // Trim & clean
//         if (followers.includes("K")) return num * 1000;
//         if (followers.includes("M")) return num * 1000000;
//       }
//       return Number(followers) || 0;
//     };

  
//     //  Format Data Before Storing
//     const formattedProfiles = profiles.map((profile) => ({
//       ...profile,
//       followers: parseFollowers(profile.followers),
//       engagementRate: profile.fanEngagementRate || profile.engagementRate, // Handle missing engagementRate
//     }));

//     //  Bulk Insert or Update --> It involves same action multiple times for saving time like creation, updation and deletion.
//     const bulkOperations = formattedProfiles.map((profile) => ({
//       updateOne: {
//         filter: { name: new RegExp(`^${profile.name}$`, "i") }, // Case-insensitive match
//         update: { $set: profile },
//         upsert: true, // Insert if not found
//       },
//     }));

//     const result = await RecommendProfile.bulkWrite(bulkOperations, {
//       ordered: false,
//     });
//     console.log("BulkWrite Result:", result);

//     res.json({ success: true, message: "Profiles stored successfully" });
//   } catch (error) {
//     console.error(" Database Error:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });


// Fetch Profile by Name, Location, or Category --- FOR SEARCHING


// recommendRoutes.post("/store-profiles", async (req, res) => {
//   try {
//     const profiles = req.body;
//     if (!Array.isArray(profiles) || profiles.length === 0) {
//       return res.status(400).json({ success: false, message: "Invalid or empty data format" });
//     }

//     const parseFollowers = (followers) => {
//       if (typeof followers === "string") {
//         const num = parseFloat(followers.trim().replace(/[^\d.]/g, ""));
//         if (followers.includes("K")) return num * 1000;
//         if (followers.includes("M")) return num * 1000000;
//       }
//       return Number(followers) || 0;
//     };

//     const formattedProfiles = profiles.map((profile) => ({
//       ...profile,
//       name: profile.name.trim().toLowerCase(),
//       followers: parseFollowers(profile.followers),
//       engagementRate: profile.fanEngagementRate || profile.engagementRate,
//     }));

//     const bulkOperations = formattedProfiles.map((profile) => ({
//       updateOne: {
//         filter: { name: profile.name },
//         update: { $set: profile },
//         upsert: true,
//       },
//     }));

//     const result = await RecommendProfile.bulkWrite(bulkOperations, {
//       ordered: false,
//     });

//     console.log("BulkWrite Result:", result);
//     res.json({ success: true, message: "Profiles stored/updated successfully." });
//   } catch (error) {
//     console.error("Database Error:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });



//TESTING
recommendRoutes.post("/store-profiles", async (req, res) => {
  try {
    console.log("Received Data:", req.body);

    // Check if data is coming from Gemini API
    if (req.body.source === "gemini" || req.body.suggested_actors) {
      return res.status(400).json({
        success: false,
        message: "Cannot store data generated from Gemini API"
      });
    }

    const profiles = req.body;
    if (!Array.isArray(profiles) || profiles.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or empty data format" });
    }

    // Convert follower count (e.g., "500K" → 500000)
    const parseFollowers = (followers) => {
      if (typeof followers === "string") {
        const num = parseFloat(followers.trim().replace(/[^\d.]/g, ""));
        if (followers.includes("K")) return num * 1000;
        if (followers.includes("M")) return num * 1000000;
      }
      return Number(followers) || 0;
    };

    // Format and validate profiles
    const formattedProfiles = profiles.map((profile) => {
      // Validate required fields
      if (!profile.name || !profile.age || !profile.location || !profile.gender || !profile.followers) {
        throw new Error(`Missing required fields for profile: ${JSON.stringify(profile)}`);
      }

      return {
        name: profile.name.trim(),
        age: Number(profile.age),
        location: profile.location.trim(),
        gender: profile.gender.trim(),
        followers: parseFollowers(profile.followers),
        engagementRate: profile.fanEngagementRate || profile.engagementRate || "0",
        platform: profile.platform || "",
        category: profile.category || "",
        image: profile.image || "",
        targetAudience: profile.targetAudience || "",
        brandAlignment: profile.brandAlignment || "",
        imageMatch: profile.imageMatch || "",
        contentStyle: profile.contentStyle || "",
        publicImage: profile.publicImage || "",
        totalReach: profile.totalReach || "",
        previousEndorsements: profile.previousEndorsements || "",
        averageROI: profile.averageROI || "",
        pastPartnerships: profile.pastPartnerships || "",
        endorsementFee: profile.endorsementFee || "",
        geographicLocation: profile.geographicLocation || "",
      };
    });

    // Bulk upsert (update or insert)
    const bulkOperations = formattedProfiles.map((profile) => ({
      updateOne: {
        filter: { name: new RegExp(`^${profile.name}$`, "i") },
        update: { $set: profile },
        upsert: true,
      },
    }));

    const result = await RecommendProfile.bulkWrite(bulkOperations, {
      ordered: false,
    });

    console.log("BulkWrite Result:", result);
    res.json({ 
      success: true, 
      message: "Profiles stored successfully",
      result: {
        insertedCount: result.insertedCount,
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount,
        upsertedCount: result.upsertedCount
      }
    });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      details: error.stack
    });
  }
});

 

recommendRoutes.get("/profile", async (req, res) => {
  try {
    const { name, location, category } = req.query;
    const query = {};

    if (name) query.name = new RegExp(`^${name}$`, "i"); // Case-insensitive exact match
    if (location) query.location = new RegExp(location, "i"); // Case-insensitive partial match
    if (category) query.category = new RegExp(category, "i"); // Case-insensitive partial match

    if (Object.keys(query).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Provide at least one search parameter",
      });
    }

    const profile = await RecommendProfile.findOne(query);
    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    res.json({ success: true, profile });
  } catch (error) {
    console.error(" Fetch Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// fetching data from name and id
recommendRoutes.get("/profile/:identifier", async (req, res) => {
  try {
    let identifier = req.params.identifier
      .replace(/[-_\s]+/g, " ") // Replace hyphens, underscores, and multiple spaces with a single space
      .trim(); // Trim leading/trailing spaces

    console.log("Received Identifier from URL:", identifier);

    let profile;

    //  Only check ID if it's 24 characters long
    if (mongoose.Types.ObjectId.isValid(identifier) && identifier.length === 24) {
      console.log("Searching by ID...");
      profile = await RecommendProfile.findById(identifier);
    } else {
      console.log("Searching by Name...");
      profile = await RecommendProfile.findOne({
        name: { $regex: `^${identifier}$`, $options: "i" },
      });
    }

    if (!profile) {
      console.log("Profile not found!");
      return res.status(404).json({ success: false, message: "Profile not found." });
    }

    res.json({ success: true, profile });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Fetch All Profiles from database
// recommendRoutes.get("/get-profiles", async (req, res) => {
//   try {
//     const profiles = await RecommendProfile.find();
//     if (!profiles || profiles.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "No profiles found in the database.",
//       });
//     }
//     res.json({ success: true, profiles });
//   } catch (error) {
//     console.error("Error fetching profiles:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });


export default recommendRoutes;
