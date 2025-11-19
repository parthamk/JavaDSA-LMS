import express from "express";
import {
  getCourseList,
  getCourseContent,
  getSectionContent,
  updateProgress,
  toggleBookmark,
  saveNote,
  getUserProgress,
} from "../controllers/courseController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getCourseList);
router.get("/:courseId", getCourseContent);
router.get("/:courseId/section/:sectionId", getSectionContent);

router.post("/:courseId/progress", authenticateToken, updateProgress);
router.post("/:courseId/bookmark", authenticateToken, toggleBookmark);
router.post("/:courseId/notes", authenticateToken, saveNote);

router.get("/progress/me", authenticateToken, getUserProgress);

export default router;
