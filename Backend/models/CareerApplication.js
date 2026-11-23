
import mongoose from "mongoose";

const careerApplicationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    qualification: { type: String, required: true, trim: true },
    experience: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model(
  "CareerApplication",
  careerApplicationSchema
);
