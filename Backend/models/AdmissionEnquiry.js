
import mongoose from "mongoose";

const admissionEnquirySchema = new mongoose.Schema(
  {
    parentName: { type: String, required: true, trim: true },
    studentName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    class: { type: String, required: true },
    message: { type: String, default: "", trim: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model(
  "AdmissionEnquiry",
  admissionEnquirySchema
);
