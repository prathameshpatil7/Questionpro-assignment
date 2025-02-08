import express from "express";
import {
  addGroceryItem,
  getGroceryItems,
  updateGroceryItem,
  deleteGroceryItem,
  getAllOrders,
} from "../controllers/admin.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/grocery", authMiddleware("ADMIN"), addGroceryItem);
router.get("/grocery", authMiddleware("ADMIN"), getGroceryItems);
router.put("/grocery/:id", authMiddleware("ADMIN"), updateGroceryItem);
router.delete("/grocery/:id", authMiddleware("ADMIN"), deleteGroceryItem);
router.get("/orders", authMiddleware("ADMIN"), getAllOrders);

export default router;
