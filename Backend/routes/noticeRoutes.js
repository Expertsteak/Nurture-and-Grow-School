import express from "express";
import Notice from "../models/Notice.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET - Public: fetch notices
router.get("/", async (req, res) => {
  try {
    const notices = await Notice.find({
      $or: [
        { expiryDate: null },
        { expiryDate: { $gte: new Date() } },
      ],
    }).sort({ noticeDate: -1 });

    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notices" });
  }
});

// POST - Admin: create notice
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, category, description, noticeDate, expiryDate } = req.body;

    if (!title || !category || !description || !noticeDate) {
      return res.status(400).json({
        message: "Please fill in all required fields.",
      });
    }

    if (
      expiryDate &&
      new Date(expiryDate) < new Date(noticeDate)
    ) {
      return res.status(400).json({
        message: "Expiry date cannot be earlier than notice date.",
      });
    }

    const notice = await Notice.create({
      title,
      category,
      description,
      noticeDate,
      expiryDate: expiryDate || null,
    });

    res.status(201).json({
      message: "Notice created successfully!",
      notice,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create notice" });
  }
});

// PUT - Admin: update notice
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, category, description, noticeDate, expiryDate } = req.body;

    if (!title || !category || !description || !noticeDate) {
      return res.status(400).json({
        message: "Please fill in all required fields.",
      });
    }

    if (
      expiryDate &&
      new Date(expiryDate) < new Date(noticeDate)
    ) {
      return res.status(400).json({
        message: "Expiry date cannot be earlier than notice date.",
      });
    }

    const notice = await Notice.findByIdAndUpdate(
      req.params.id,
      {
        title,
        category,
        description,
        noticeDate,
        expiryDate: expiryDate || null,
      },
      { new: true, runValidators: true }
    );

    if (!notice) {
      return res.status(404).json({ message: "Notice not found" });
    }

    res.status(200).json({
      message: "Notice updated successfully!",
      notice,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update notice" });
  }
});

// DELETE - Admin: delete notice
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);

    if (!notice) {
      return res.status(404).json({ message: "Notice not found" });
    }

    res.status(200).json({
      message: "Notice deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete notice" });
  }
});

export default router;