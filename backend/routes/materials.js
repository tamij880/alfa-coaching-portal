const express = require("express");
const router = express.Router();
const Material = require("../models/Material");
const authMiddleware = require("../middleware/auth");

// GET all materials
router.get("/", authMiddleware, async (req, res) => {
  try {
    const materials = await Material.find();
    res.json(materials);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST new material (admin only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, subject, fileUrl } = req.body;

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const material = new Material({ title, description, subject, fileUrl });
    await material.save();
    res.json(material);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// PUT update material (admin only)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, description, subject, fileUrl } = req.body;

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const updated = await Material.findByIdAndUpdate(
      req.params.id,
      { title, description, subject, fileUrl },
      { new: true } // ✅ return updated document
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

// DELETE material (admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    await Material.findByIdAndDelete(req.params.id);
    res.json({ message: "Material deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;