// src/config/email.ts
import nodemailer from "nodemailer";
import "dotenv/config";

const email = process.env.EMAILSENDER || undefined;
const emailPassword = process.env.EMAILPASSWORD || undefined; //
// Create a transporter with Gmail as the service provider
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email, // Your Gmail email address
    pass: emailPassword, // Your Gmail password or an app-specific password
  },
});

export default transporter;
