
import express from "express";
import cloudinary from "../config/cloudinary.js";
import StarStudent from "../models/StarStudent.js";
import upload from "../middleware/uploadMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

const validSections = ["Primary", "Pre-Primary"];
const validCategories = ["Discipline", "Smart", "Obedient"];

// Upload buffer to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "nurture-and-grow/stars",
        resource_type: "image"
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    stream.end(buffer);
  });
};

// GET all star students (Public)
router.get("/", async (req, res) => {
  try {
    const students = await StarStudent.find().sort({
      section: 1,
      category: 1
    });

    res.status(200).json(students);
  } catch (error) {
    console.error("Fetch star students error:", error);

    res.status(500).json({
      message: "Could not fetch star students"
    });
  }
});

// ADD or UPDATE a star student (Admin only)
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    let uploadedImage = null;

    try {
      const { section, category, name, className } = req.body;

      if (
        !validSections.includes(section) ||
        !validCategories.includes(category) ||
        !name?.trim() ||
        !className?.trim()
      ) {
        return res.status(400).json({
          message: "Section, category, name and class are required"
        });
      }

      // Find the existing student in this category
      let student = await StarStudent.findOne({ section, category });

      // Upload new photo only if provided
      if (req.file) {
        uploadedImage = await uploadToCloudinary(req.file.buffer);
      }

      if (!student) {
        student = new StarStudent({
          section,
          category,
          name: name.trim(),
          className: className.trim(),
          imageUrl: uploadedImage?.secure_url || "",
          publicId: uploadedImage?.public_id || ""
        });
      } else {
        // Keep old photo if no new photo is uploaded
        const oldPublicId = student.publicId;

        student.name = name.trim();
        student.className = className.trim();

        if (uploadedImage) {
          student.imageUrl = uploadedImage.secure_url;
          student.publicId = uploadedImage.public_id;
        }

        await student.save();

        // Delete old photo after successful database update
        if (uploadedImage && oldPublicId) {
          try {
            await cloudinary.uploader.destroy(oldPublicId);
          } catch (deleteError) {
            console.error("Old image deletion error:", deleteError);
          }
        }

        return res.status(200).json({
          message: "Star student updated successfully",
          student
        });
      }

      await student.save();

      res.status(201).json({
        message: "Star student saved successfully",
        student
      });
    } catch (error) {
      // Remove newly uploaded photo if saving failed
      if (uploadedImage?.public_id) {
        try {
          await cloudinary.uploader.destroy(uploadedImage.public_id);
        } catch (cleanupError) {
          console.error("Image cleanup error:", cleanupError);
        }
      }

      console.error("Save star student error:", error);

      res.status(500).json({
        message: "Could not save star student"
      });
    }
  }
);

// DELETE a star student (Admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const student = await StarStudent.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Star student not found"
      });
    }

    // Delete photo from Cloudinary if present
    if (student.publicId) {
      const result = await cloudinary.uploader.destroy(student.publicId);

      if (result.result !== "ok" && result.result !== "not found") {
        throw new Error("Cloudinary image deletion failed");
      }
    }

    await StarStudent.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Star student deleted successfully"
    });
  } catch (error) {
    console.error("Delete star student error:", error);

    res.status(500).json({
      message: "Could not delete star student"
    });
  }
});

export default router;
