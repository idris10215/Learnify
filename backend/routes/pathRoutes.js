import express from "express";
import Path from "../models/Path.js";

const router = express.Router();

// Create a new path
router.post("/createPath", async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const newPath = new Path({
      title,
      description,
      teacherId: 123,
    });

    await newPath.save();

    res
      .status(201)
      .json({ message: "Path created successfully", path: newPath });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/getAllPaths", async (req, res) => {
  try {
    const paths = await Path.find({});
    res.status(200).json(paths);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
