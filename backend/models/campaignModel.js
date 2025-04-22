// import mongoose from "mongoose";

// const campaignSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now }
// });

// const CampaignModel = mongoose.models.Campaign || mongoose.model("Campaign", campaignSchema);
// export default CampaignModel;



// import mongoose from "mongoose";

// const campaignSchema = new mongoose.Schema({
//   campaignName: String,
//   brandName: String,
//   productType: String,
//   targetAudience: String,
//   budget: String,
//   platform: String,
//   goal: String,
//   tone: String,
//   gender: String,
//   location: String,
//   age: String,
//   // ... Add any other fields needed
// }, { timestamps: true });

// export default mongoose.model("Campaign", campaignSchema);


// -------TESTING------

// models/campaignModel.js

import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  persona: { type: String },
  involvementType: { type: String },
  audience: { type: String },
  budget: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

const CampaignModel = mongoose.models.Campaign || mongoose.model("Campaign", campaignSchema);
export default CampaignModel;
