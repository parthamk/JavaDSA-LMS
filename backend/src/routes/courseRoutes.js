import express from "express";
import {
  getCourseList,
  getCourseContent,
  getSectionContent,
  updateProgress,
  toggleBookmark,
  saveNote,
  getUserProgress,
  getGroupedCourses,
  getCoursesByLanguage,
} from "../controllers/courseController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all courses (flat list)
router.get("/", getCourseList);

// Get courses grouped by language
router.get("/grouped", getGroupedCourses);

// Get courses filtered by language
router.get("/language/:lang", getCoursesByLanguage);

// Get specific course content
router.get("/:courseId", getCourseContent);

// Get specific section content
router.get("/:courseId/section/:sectionId", getSectionContent);

// Progress and bookmarks (authenticated)
router.post("/:courseId/progress", authenticateToken, updateProgress);
router.post("/:courseId/bookmark", authenticateToken, toggleBookmark);
router.post("/:courseId/notes", authenticateToken, saveNote);
router.get("/progress/me", authenticateToken, getUserProgress);

export default router;
