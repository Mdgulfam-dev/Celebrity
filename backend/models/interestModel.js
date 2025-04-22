
import mongoose from "mongoose";

const interestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign", default: null },
  celebrityName: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Interest", interestSchema);
