// src/models/customer.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ICustomer extends Document {
  name: string;
  email: string;
  phoneNumber: string;
}

const CustomerSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
},{ timestamps: true });

export default mongoose.model<ICustomer>("Customer", CustomerSchema);
