import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  itemCount: { type: Number, default: 0 },
  imageUrl: { type: String },
});
export default mongoose.model("Category", categorySchema);
