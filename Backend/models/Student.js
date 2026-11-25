import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    admissionNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    className: {
      type: String,
      required: true,
      trim: true
    },

    section: {
      type: String,
      default: "",
      trim: true
    },

    dateOfBirth: {
      type: Date,
      default: null
    },

    gender: {
      type: String,
      default: ""
    },

    parentName: {
      type: String,
      required: true,
      trim: true
    },

    phone: {
      type: String,
      required: true,
      trim: true
    },

    address: {
      type: String,
      default: ""
    },

    admissionDate: {
      type: Date,
      default: Date.now
    },

    academicYear: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Student", studentSchema);