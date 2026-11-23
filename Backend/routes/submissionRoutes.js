import express from "express";
import mongoose from "mongoose";

import AdmissionEnquiry from "../models/AdmissionEnquiry.js";
import ContactMessage from "../models/ContactMessage.js";
import CareerApplication from "../models/CareerApplication.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// FORM CONFIGURATION
const resources = {
  admissions: {
    model: AdmissionEnquiry,
    fields: [
      "parentName",
      "studentName",
      "email",
      "phone",
      "class",
      "message",
    ],
    required: [
      "parentName",
      "studentName",
      "email",
      "phone",
      "class",
    ],
  },

  contacts: {
    model: ContactMessage,
    fields: ["name", "email", "phone", "message"],
    required: ["name", "email", "message"],
  },

  careers: {
    model: CareerApplication,
    fields: [
      "fullName",
      "email",
      "phone",
      "qualification",
      "experience",
      "position",
    ],
    required: [
      "fullName",
      "email",
      "phone",
      "qualification",
      "experience",
      "position",
    ],
  },
};

// FRONTEND URLS
const endpoints = {
  admissions: "admission-enquiries",
  contacts: "contact-messages",
  careers: "career-applications",
};

// PUBLIC: SUBMIT FORMS
Object.entries(resources).forEach(([type, config]) => {
  const endpoint = endpoints[type];

  router.post(`/${endpoint}`, async (req, res) => {
    try {
      const missing = config.required.some(
        (field) =>
          typeof req.body[field] !== "string" ||
          !req.body[field].trim()
      );

      if (missing) {
        return res.status(400).json({
          message: "Please fill in all required fields.",
        });
      }

      const submission = {};

      config.fields.forEach((field) => {
        submission[field] =
          typeof req.body[field] === "string"
            ? req.body[field].trim()
            : "";
      });

      const saved = await config.model.create(submission);

      return res.status(201).json({
        message: "Submission saved successfully!",
        id: saved._id,
      });

    } catch (error) {
      console.error(`${type} submission error:`, error);

      return res.status(500).json({
        message: "Failed to save submission.",
      });
    }
  });

  // ADMIN: FETCH SUBMISSIONS
  router.get(`/${endpoint}`, authMiddleware, async (req, res) => {
    try {
      const submissions = await config.model
        .find()
        .sort({ createdAt: -1 });

      return res.status(200).json(submissions);

    } catch (error) {
      console.error(`${type} fetch error:`, error);

      return res.status(500).json({
        message: "Failed to fetch submissions.",
      });
    }
  });

  // ADMIN: MARK AS READ / UNREAD
  router.patch(
    `/${endpoint}/:id/read`,
    authMiddleware,
    async (req, res) => {
      try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({
            message: "Invalid submission ID.",
          });
        }

        if (typeof req.body.isRead !== "boolean") {
          return res.status(400).json({
            message: "isRead must be true or false.",
          });
        }

        const submission = await config.model.findByIdAndUpdate(
          id,
          { isRead: req.body.isRead },
          { new: true, runValidators: true }
        );

        if (!submission) {
          return res.status(404).json({
            message: "Submission not found.",
          });
        }

        return res.status(200).json({
          message: "Read status updated.",
          submission,
        });

      } catch (error) {
        console.error(`${type} update error:`, error);

        return res.status(500).json({
          message: "Could not update submission.",
        });
      }
    }
  );

  // ADMIN: DELETE SUBMISSION
  router.delete(
    `/${endpoint}/:id`,
    authMiddleware,
    async (req, res) => {
      try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({
            message: "Invalid submission ID.",
          });
        }

        const submission = await config.model.findByIdAndDelete(id);

        if (!submission) {
          return res.status(404).json({
            message: "Submission not found.",
          });
        }

        return res.status(200).json({
          message: "Submission deleted successfully.",
        });

      } catch (error) {
        console.error(`${type} delete error:`, error);

        return res.status(500).json({
          message: "Could not delete submission.",
        });
      }
    }
  );
});

export default router;
