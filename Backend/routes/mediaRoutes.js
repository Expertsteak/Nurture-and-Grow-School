import express from "express";
import cloudinary from "../config/cloudinary.js";
import Media from "../models/Media.js";
import upload from "../middleware/uploadMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Upload image (Admin only)
router.post(
  "/upload",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, category } = req.body;

      if (!title || !category || !req.file) {
        return res.status(400).json({
          message: "Title, category and image are required"
        });
      }

      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "nurture-and-grow/gallery",
            resource_type: "image"
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        stream.end(req.file.buffer);
      });

      const media = await Media.create({
        title,
        category,
        imageUrl: result.secure_url,
        publicId: result.public_id
      });

      res.status(201).json({
        message: "Image uploaded successfully",
        media
      });

    } catch (error) {
  console.error("UPLOAD ERROR:", error);

  res.status(500).json({
    message: "Image upload failed",
    error: error.message
  });
}
}  
);

// Get all gallery images (Public)
router.get("/", async (req, res) => {
  try {
    const media = await Media.find().sort({ createdAt: -1 });

    res.status(200).json(media);

  } catch (error) {
    res.status(500).json({
      message: "Could not fetch gallery images"
    });
  }
});

// Delete image (Admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);

    if (!media) {
      return res.status(404).json({
        message: "Image not found"
      });
    }

    // Delete image from Cloudinary
    const result = await cloudinary.uploader.destroy(
      media.publicId,
      { resource_type: "image" }
    );

    if (result.result !== "ok" && result.result !== "not found") {
      throw new Error("Cloudinary image deletion failed");
    }

    // Delete image details from MongoDB
    await Media.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Image deleted successfully"
    });

  } catch (error) {
    console.error("Delete error:", error.message);

    res.status(500).json({
      message: "Image deletion failed"
    });
  }
});


export default router;
