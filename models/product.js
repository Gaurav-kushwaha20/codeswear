/**
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  desc: { type: String, required: true },
  img: { type: String, required: true },
  category: { type: String, required: true },
  size: { type: String },
  color: { type: String },
  price: { type: Number, required: true },
  availableQty: { type: Number, required: true },
}, { timestamps: true });

// Prevent model overwrite in development (specific to Next.js)
export default mongoose.models.Product || mongoose.model("Product", productSchema);
 */

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // Mark as unique
  desc: { type: String, required: true },
  img: { type: String, required: true },
  category: { type: String, required: true },
  size: { type: String },
  color: { type: String },
  price: { type: Number, required: true },
  availableQty: { type: Number, required: true },
}, { timestamps: true });

// Force MongoDB to create the index
productSchema.index({ slug: 1 }, { unique: true });
mongoose.models = {}
export default mongoose.model.Product || mongoose.model("Product", productSchema);
