// src/routes/authRoutes.ts
import express from "express";
import * as authController from "../controllers/auth";

const router = express.Router();

// Login route
router.post("/login", authController.login);

export default router;
