// src/controllers/user.ts
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";
import transporter from "../config/email"; // Import the configured transporter
import "dotenv/config";

const secretKey = process.env.SCRETKEY || "";
const emailSender = process.env.EMAILSENDER || "email@sample.com";

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({status: false, message: "Email already in use" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();

    res.status(201).json({status: true, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({status: false, message: "Internal server error" });
  }
};

// export const resetPassword = async (req: Request, res: Response): Promise<void> => {
//     // Implement reset password logic here
// };

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({status: false, message: "User not found" });
      return;
    }

    // Generate a reset token (usually a JWT token with a short expiration time)
    const resetToken = jwt.sign({ userId: user._id }, secretKey, { expiresIn: "15m" });

    // // Send an email to the user with the resetToken (implement nodemailer or another email library)
    // const transporter = nodemailer.createTransport({
    //     // Configure your email service here
    // });

    const mailOptions = {
      from: emailSender,
      to: user.email,
      subject: "Password Reset Request",
      text: `Please click the following link to reset your password: ${resetToken}`,
    };

    // await transporter.sendMail(mailOptions);
    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     console.error("Error sending email:", error);
    //     res.status(500).json({ message: "Failed to send reset email" });
    //   } else {
    //     console.log("Email sent:", info.response);
    //     res.status(200).json({ message: "Password reset email sent" });
    //   }
    // });

    res.status(200).json({status: true, message: "Password reset email sent" });
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
// export const deleteUser = async (req: Request, res: Response): Promise<void> => {
//     // Implement delete user logic here
// };

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      res.status(404).json({status: false, message: "User not found" });
      return;
    }

    res.status(200).json({status: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({status: false, message: "Internal server error" });
  }
};
