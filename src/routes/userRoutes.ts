// src/routes/userRoutes.ts
import express from "express";
import * as userController from "../controllers/user";

const router = express.Router();

router.post("/create", userController.createUser);
router.post("/reset-password", userController.resetPassword);
router.delete("/:userId", userController.deleteUser);

export default router;
