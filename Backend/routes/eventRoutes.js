import express from "express";
import Event from "../models/Event.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET - Public: fetch events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch events" });
  }
});

// POST - Admin: create event
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, date, time, location, imageUrl } = req.body;

    if (!title || !description || !date || !time || !location) {
      return res.status(400).json({
        message: "Please fill in all required fields.",
      });
    }

    const event = await Event.create({
      title,
      description,
      date,
      time,
      location,
      imageUrl: imageUrl || "",
    });

    res.status(201).json({
      message: "Event created successfully!",
      event,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create event" });
  }
});

// PUT - Admin: update event
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({
      message: "Event updated successfully!",
      event,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update event" });
  }
});

// DELETE - Admin: delete event
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete event" });
  }
});

export default router;