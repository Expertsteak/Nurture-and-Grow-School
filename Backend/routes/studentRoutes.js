import express from "express";
import Student from "../models/Student.js";
import authMiddleware from "../middleware/authMiddleware.js";
import StudentFee from "../models/StudentFee.js";

const router = express.Router();

// GET all students / search students
router.get("/", authMiddleware, async (req, res) => {
  try {
    const search = req.query.search || "";

    const students = await Student.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { admissionNumber: { $regex: search, $options: "i" } }
      ]
    }).sort({ name: 1 });

    res.status(200).json(students);
  } catch (error) {
    console.error("Fetch students error:", error);
    res.status(500).json({ message: "Could not fetch students" });
  }
});

// ADD student
// ADD student
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      name,
      admissionNumber,
      className,
      section,
      dateOfBirth,
      parentName,
      phone,
      address,
      admissionDate,
      academicYear
    } = req.body;

    if (
      !name?.trim() ||
      !admissionNumber?.trim() ||
      !className?.trim() ||
      !parentName?.trim() ||
      !phone?.trim() ||
      !academicYear?.trim()
    ) {
      return res.status(400).json({
        message: "Please fill all required fields"
      });
    }

    const existingStudent = await Student.findOne({
      admissionNumber: admissionNumber.trim()
    });

    if (existingStudent) {
      return res.status(409).json({
        message: "Admission number already exists"
      });
    }

    const student = await Student.create({
      name: name.trim(),
      admissionNumber: admissionNumber.trim(),
      className: className.trim(),
      section,
      dateOfBirth: dateOfBirth || null,
      parentName: parentName.trim(),
      phone: phone.trim(),
      address,
      admissionDate: admissionDate || undefined,
      academicYear: academicYear.trim()
    });

    res.status(201).json({
      message: "Student added successfully",
      student
    });

  } catch (error) {
    console.error("Add student error:", error);

    res.status(500).json({
      message: "Could not add student",
      error: error.message
    });
  }
});
// GET one student by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error("Fetch student error:", error);
    res.status(500).json({ message: "Could not fetch student" });
  }
});

// UPDATE student
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const allowedFields = [
      "name",
      "admissionNumber",
      "className",
      "section",
      "dateOfBirth",
      "gender",
      "parentName",
      "phone",
      "address",
      "admissionDate",
      "academicYear",
      "status"
    ];

    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    if (
      updates.name !== undefined ||
      updates.admissionNumber !== undefined ||
      updates.className !== undefined ||
      updates.parentName !== undefined ||
      updates.phone !== undefined ||
      updates.academicYear !== undefined
    ) {
      const requiredFields = [
        "name",
        "admissionNumber",
        "className",
        "parentName",
        "phone",
        "academicYear"
      ];

      for (const field of requiredFields) {
        if (
          updates[field] !== undefined &&
          (typeof updates[field] !== "string" ||
            !updates[field].trim())
        ) {
          return res.status(400).json({
            message: `${field} is required`
          });
        }
      }
    }

    if (updates.admissionNumber) {
      const existing = await Student.findOne({
        admissionNumber: updates.admissionNumber.trim(),
        _id: { $ne: req.params.id }
      });

      if (existing) {
        return res.status(409).json({
          message: "Admission number already exists"
        });
      }

      updates.admissionNumber = updates.admissionNumber.trim();
    }

    if (updates.name) updates.name = updates.name.trim();
    if (updates.className) updates.className = updates.className.trim();
    if (updates.parentName) updates.parentName = updates.parentName.trim();
    if (updates.phone) updates.phone = updates.phone.trim();
    if (updates.academicYear) updates.academicYear = updates.academicYear.trim();

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.status(200).json({
      message: "Student updated successfully",
      student
    });

  } catch (error) {
    console.error("Update student error:", error);
    res.status(500).json({
      message: "Could not update student"
    });
  }
});

// DELETE student safely
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    // Check whether student exists
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    // Check whether student has a fee record
    const feeRecord = await StudentFee.findOne({
      student: req.params.id
    });

    if (feeRecord) {
      return res.status(409).json({
        message:
          "This student has fee records. Deletion is not allowed to protect payment history."
      });
    }

    // Delete only if no fee record exists
    await Student.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Student deleted successfully"
    });

  } catch (error) {
    console.error("Delete student error:", error);

    res.status(500).json({
      message: "Could not delete student"
    });
  }
});

export default router;
