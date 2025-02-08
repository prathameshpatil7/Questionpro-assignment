import express from "express";
import { getAvailableGroceries, placeOrder } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/grocery", getAvailableGroceries);
router.post("/order", authMiddleware("USER"), placeOrder);

export default router;
