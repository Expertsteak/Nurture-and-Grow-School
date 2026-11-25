
import express from "express";
import StudentFee from "../models/StudentFee.js";
import Student from "../models/Student.js";
import ReceiptCounter from "../models/ReceiptCounter.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Generate sequential receipt number
const generateReceiptNumber = async (year) => {
  const counterId = `fee-receipt-${year}`;

  try {
    const counter = await ReceiptCounter.findByIdAndUpdate(
      counterId,
      {
        $inc: { sequence: 1 }
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true
      }
    );

    return `NGP-${year}-${String(counter.sequence).padStart(4, "0")}`;
  } catch (error) {
    // Handle simultaneous first-time counter creation
    if (error.code === 11000) {
      const counter = await ReceiptCounter.findByIdAndUpdate(
        counterId,
        {
          $inc: { sequence: 1 }
        },
        { new: true }
      );

      return `NGP-${year}-${String(counter.sequence).padStart(4, "0")}`;
    }

    throw error;
  }
};

// GET dashboard student and fee summary
router.get("/dashboard/summary", authMiddleware, async (req, res) => {
  try {
    const [
      totalStudents,
      activeStudents,
      inactiveStudents,
      feeSummary
    ] = await Promise.all([
      Student.countDocuments(),

      Student.countDocuments({ status: "Active" }),

      Student.countDocuments({ status: "Inactive" }),

      StudentFee.aggregate([
        {
          $group: {
            _id: null,
            totalFees: { $sum: "$totalFees" },
            totalCollected: {
              $sum: {
                $sum: "$payments.amount"
              }
            }
          }
        }
      ])
    ]);

    const totalFees = feeSummary[0]?.totalFees || 0;
    const totalCollected = feeSummary[0]?.totalCollected || 0;
    const pendingFees = totalFees - totalCollected;

    res.status(200).json({
      totalStudents,
      activeStudents,
      inactiveStudents,
      totalFees,
      totalCollected,
      pendingFees
    });
  } catch (error) {
    console.error("Dashboard summary error:", error);

    res.status(500).json({
      message: "Could not fetch dashboard summary"
    });
  }
});

// GET fee details
router.get("/:studentId", authMiddleware, async (req, res) => {
  try {
    const feeRecord = await StudentFee.findOne({
      student: req.params.studentId
    }).populate("student");

    if (!feeRecord) {
      return res.status(404).json({ message: "Fee record not found" });
    }

    const totalPaid = feeRecord.payments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );

    res.json({
      feeRecord,
      totalPaid,
      balance: feeRecord.totalFees - totalPaid
    });
  } catch (error) {
    console.error("Fetch fee error:", error);
    res.status(500).json({ message: "Could not fetch fee details" });
  }
});

// SET BASE FEE AND DISCOUNT
router.post("/:studentId", authMiddleware, async (req, res) => {
  try {
    const { baseFee, discount } = req.body;

    const numericBaseFee = Number(baseFee);
    const numericDiscount = Number(discount ?? 0);

    if (
      baseFee === undefined ||
      !Number.isFinite(numericBaseFee) ||
      !Number.isFinite(numericDiscount) ||
      numericBaseFee < 0 ||
      numericDiscount < 0 ||
      numericDiscount > numericBaseFee
    ) {
      return res.status(400).json({
        message: "Invalid base fee or discount"
      });
    }

    const student = await Student.findById(req.params.studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const totalFees = numericBaseFee - numericDiscount;

    const existingRecord = await StudentFee.findOne({
      student: req.params.studentId
    });

    if (existingRecord) {
      const totalPaid = existingRecord.payments.reduce(
        (sum, payment) => sum + payment.amount,
        0
      );

      if (totalFees < totalPaid) {
        return res.status(400).json({
          message: "Final fees cannot be less than payments already recorded",
          totalPaid
        });
      }
    }

    const feeRecord = await StudentFee.findOneAndUpdate(
      { student: req.params.studentId },
      {
        $set: {
          baseFee: numericBaseFee,
          discount: numericDiscount,
          totalFees
        }
      },
      {
        new: true,
        upsert: true,
        runValidators: true
      }
    );

    const totalPaid = feeRecord.payments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );

    res.status(200).json({
      message: "Fees updated successfully",
      feeRecord,
      totalPaid,
      balance: totalFees - totalPaid
    });
  } catch (error) {
    console.error("Save fees error:", error);
    res.status(500).json({ message: "Could not save fees" });
  }
});

// ADD PAYMENT WITH SEQUENTIAL RECEIPT NUMBER
router.post("/:studentId/payment", authMiddleware, async (req, res) => {
  try {
    const { amount, paymentDate, paymentMode, note } = req.body;

    const numericAmount = Number(amount);

    if (
      amount === undefined ||
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0
    ) {
      return res.status(400).json({
        message: "Valid payment amount required"
      });
    }

    const actualPaymentDate = paymentDate
      ? new Date(paymentDate)
      : new Date();

    if (Number.isNaN(actualPaymentDate.getTime())) {
      return res.status(400).json({
        message: "Invalid payment date"
      });
    }

    const feeRecord = await StudentFee.findOne({
      student: req.params.studentId
    });

    if (!feeRecord) {
      return res.status(404).json({
        message: "Set student fees before recording payment"
      });
    }

    const totalPaid = feeRecord.payments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );

    const balance = feeRecord.totalFees - totalPaid;

    if (numericAmount > balance) {
      return res.status(400).json({
        message: "Payment exceeds remaining balance",
        balance
      });
    }

    const year = actualPaymentDate.getFullYear();

    const receiptNumber = await generateReceiptNumber(year);

    feeRecord.payments.push({
      amount: numericAmount,
      paymentDate: actualPaymentDate,
      paymentMode: paymentMode || "Cash",
      note: note || "",
      receiptNumber
    });

    await feeRecord.save();

    const updatedPaid = feeRecord.payments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );

    res.status(201).json({
      message: "Payment recorded successfully",
      receiptNumber,
      feeRecord,
      totalPaid: updatedPaid,
      balance: feeRecord.totalFees - updatedPaid
    });
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({
      message: "Could not record payment"
    });
  }
});

export default router;
