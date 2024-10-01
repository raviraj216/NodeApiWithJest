// src/routes/customer.ts
import { Router } from "express";
import * as customerController from "../controllers/customer";
import { authenticateToken } from "../middleware/auth";

const router = Router();

// Use the authenticateToken middleware for routes that require authentication
router.use(authenticateToken as any);

router.post("/", customerController.createCustomer);
router.get("/", customerController.getCustomers);
router.get("/:id", customerController.getCustomerById);
router.put("/:id", customerController.updateCustomer);
router.delete("/:id", customerController.deleteCustomer);

export default router;
