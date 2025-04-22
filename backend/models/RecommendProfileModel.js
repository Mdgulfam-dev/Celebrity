import mongoose from "mongoose";



// const RecommendProfileSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, unique: true },
//     age: { type: Number, required: true },
//     location: { type: String, required: true },
//     gender: { type: String, required: true },
//     targetAudience: String,
//     brandAlignment: String,
//     imageMatch: String,
//     contentStyle: String,
//     publicImage: String,
//     followers: { type: Number, required: true }, // Ensure Number type
//     engagementRate: String, //  Use fanEngagementRate from JSON
//     totalReach: String,
//     previousEndorsements: String,
//     averageROI: String,
//     pastPartnerships: String,
//     endorsementFee: String,
//     geographicLocation: String,
//   },
//   { collection: "recommendProfiles" } //  Correct collection name
// );



// export default mongoose.model("RecommendProfile", RecommendProfileSchema);



const RecommendProfileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    location: { type: String, required: true },
    gender: { type: String, required: true },
    followers: { type: Number, required: true },
    engagementRate: String,
    platform: String,
    category: String,
    image: String,
    targetAudience: String,
    brandAlignment: String,
    imageMatch: String,
    contentStyle: String,
    publicImage: String,
    totalReach: String,
    previousEndorsements: String,
    averageROI: String,
    pastPartnerships: String,
    endorsementFee: String,
    geographicLocation: String,
    interestedClicks: { type: Number, default: 0 },
  },
  { collection: "recommendProfiles" }
);
export default mongoose.model("RecommendProfile", RecommendProfileSchema);