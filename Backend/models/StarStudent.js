
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      enum: ["Primary", "Pre-Primary"],
      required: true
    },

    category: {
      type: String,
      enum: ["Discipline", "Smart", "Obedient"],
      required: true
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

    imageUrl: {
      type: String,
      default: ""
    },

    publicId: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

export default mongoose.model("StarStudent", studentSchema);
