// src/models/customer.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  product_name: string;
  description: string;
  price: number;
  color: string;
}

const ProductSchema: Schema = new Schema({
  product_name: { type: String, required: true },
  description: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  color: { type: String, required: true },
},{ timestamps: true });

export default mongoose.model<IProduct>("Product", ProductSchema);
