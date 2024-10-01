// src/controllers/authRoutes.ts
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";
import "dotenv/config";

const secretKey = process.env.SCRETKEY || "";

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ status: false, message: "Authentication failed" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({status: false, message: "Authentication failed" });
      return;
    }

    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: "1h" });

    res.status(200).json({ status: true, token : token });
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
