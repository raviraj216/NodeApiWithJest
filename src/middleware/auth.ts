// src/middleware/authRoutes.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
//import "dotenv/config";

import dotenv from "dotenv";

//configure env;
dotenv.config();

const secretKey = process.env.SCRETKEY || "";

interface AuthRequest extends Request {
  user?: any;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  // const token = req.header('Authorization');
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  try {
    // Debugging: Log the token to see its format
    // console.log('Received token:', token);

    // Verify the token and extract the user
    // eslint-disable-next-line consistent-return
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        console.error("Token verification error:", err);
        return res.status(401).json({ message: "Invalid token" });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    console.error("Error in authMiddleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


