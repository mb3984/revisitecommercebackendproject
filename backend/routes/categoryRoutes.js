import express from "express";
import Category from "../models/Category.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/", async (req, res) => {
  const categories = await Category.find();
  console.log("categories:", categories);
  res.json(categories);
});
router.post("/", protect, async (req, res) => {
  const { name, itemCount, imageUrl } = req.body;
  console.log("Add item request body:", req.body);
  const category = new Category({ name, itemCount, imageUrl });
  await category.save();
  res.json({ message: "item added succesfully", category });
});
// GET category by ID
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.put("/:id", protect, async (req, res) => {
  const { name, itemCount, imageUrl } = req.body;
  console.log("Updated request body:", req.body);
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name, itemCount, imageUrl },
    { new: true }
  );
  res.json({ message: "item updated succesfully", category });
});
export default router;
