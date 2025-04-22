import mongoose from "mongoose";

const STATUS_ENUM = ["pending", "approved", "rejected"];

const kycSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    
    documentType: { type: String, required: true, trim: true },
    documentNumber: { type: String, required: true, trim: true, unique: true },

    documentImage: { 
      type: String, 
      required: [true, "Document image is required"], 
      trim: true 
    },

    status: { 
      type: String, 
      enum: STATUS_ENUM, 
      default: "pending"
    },

    rejectionReason: { type: String, default: "", trim: true },

    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Prevent `submittedAt` from being modified
kycSchema.pre("save", function (next) {
  if (!this.isNew) {
    this.submittedAt = this.get("submittedAt");
  }
  next();
});

// Ensure unique KYC submission per user + documentNumber
kycSchema.index({ userId: 1, documentNumber: 1 }, { unique: true });

export default mongoose.model("KYC", kycSchema);
