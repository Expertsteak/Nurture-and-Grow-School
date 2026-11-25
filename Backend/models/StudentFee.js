
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    min: 1
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  paymentMode: {
    type: String,
    enum: ["Cash", "Online", "Bank Transfer", "Other"],
    default: "Cash"
  },
  note: {
    type: String,
    default: ""
  },
  receiptNumber: {
    type: String,
    default: ""
  }
});

const studentFeeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      unique: true
    },

    baseFee: {
      type: Number,
      required: true,
      min: 0
    },

    discount: {
      type: Number,
      default: 0,
      min: 0
    },

    totalFees: {
      type: Number,
      required: true,
      min: 0
    },

    payments: [paymentSchema]
  },
  { timestamps: true }
);

export default mongoose.model("StudentFee", studentFeeSchema);
