import express from "express";
import {
  runCode,
  getLanguages,
} from "../controllers/codeExecutionController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: "Too many requests",
});

router.get("/languages", getLanguages);
router.post("/execute", authenticateToken, limiter, runCode);

export default router;
