
import express from "express";
import AdmissionEnquiry from "../models/AdmissionEnquiry.js";
import ContactMessage from "../models/ContactMessage.js";
import CareerApplication from "../models/CareerApplication.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

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
    required: ["name", "email", "phone", "message"],
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

// PUBLIC: Submit a form
Object.entries(resources).forEach(([type, config]) => {
  router.post(`/${type}`, async (req, res) => {
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

      res.status(201).json({
        message: "Submission saved successfully!",
        id: saved._id,
      });
    } catch (error) {
      console.error(`${type} submission error:`, error);
      res.status(500).json({
        message: "Failed to save submission.",
      });
    }
  });

  // ADMIN: Fetch submissions
  router.get(`/${type}`, authMiddleware, async (req, res) => {
    try {
      const submissions = await config.model
        .find()
        .sort({ createdAt: -1 });

      res.status(200).json(submissions);
    } catch (error) {
      console.error(`${type} fetch error:`, error);
      res.status(500).json({
        message: "Failed to fetch submissions.",
      });
    }
  });

  // ADMIN: Mark as read or unread
  router.patch(
    `/${type}/:id/read`,
    authMiddleware,
    async (req, res) => {
      try {
        if (typeof req.body.isRead !== "boolean") {
          return res.status(400).json({
            message: "isRead must be true or false.",
          });
        }

        const submission = await config.model.findByIdAndUpdate(
          req.params.id,
          { isRead: req.body.isRead },
          { new: true, runValidators: true }
        );

        if (!submission) {
          return res.status(404).json({
            message: "Submission not found.",
          });
        }

        res.status(200).json({
          message: "Read status updated.",
          submission,
        });
      } catch (error) {
        console.error(`${type} update error:`, error);
        res.status(400).json({
          message: "Could not update submission.",
        });
      }
    }
  );

  // ADMIN: Delete submission
  router.delete(
    `/${type}/:id`,
    authMiddleware,
    async (req, res) => {
      try {
        const submission = await config.model.findByIdAndDelete(
          req.params.id
        );

        if (!submission) {
          return res.status(404).json({
            message: "Submission not found.",
          });
        }

        res.status(200).json({
          message: "Submission deleted successfully.",
        });
      } catch (error) {
        console.error(`${type} delete error:`, error);
        res.status(400).json({
          message: "Could not delete submission.",
        });
      }
    }
  );
});

export default router;
