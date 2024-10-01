// src/routes/customer.ts
import { Router } from "express";
import * as productController from "../controllers/product";
import { authenticateToken } from "../middleware/auth";

const router = Router();

// Use the authenticateToken middleware for routes that require authentication
router.use(authenticateToken as any);

router.post("/", productController.createProduct);
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

export default router;
