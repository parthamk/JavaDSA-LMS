import path from "path";
import { fileURLToPath } from "url";
import { readJSON, writeJSON } from "../utils/fileHandler.js";
import {
  extractTableOfContents,
  extractSection,
  parseCodeBlocks,
} from "../utils/markdownParser.js";
import { readFile } from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const COURSES_DIR = path.join(__dirname, "../data/courses");
const PROGRESS_FILE = path.join(__dirname, "../data/progress.json");

export const getCourseList = async (req, res, next) => {
  try {
    const courseIds = ["java", "dsa"];
    const courses = [];

    for (const courseId of courseIds) {
      try {
        const file = path.join(COURSES_DIR, `${courseId}.json`);
        const courseData = await readJSON(file);
        courses.push({
          id: courseData.id,
          title: courseData.title,
          description: courseData.description,
          difficulty: courseData.difficulty,
          duration: courseData.duration,
          totalSections: courseData.sections.length,
          estimatedHours: courseData.duration
            ? parseInt(courseData.duration)
            : 0,
          sections: courseData.sections,
        });
      } catch (err) {
        console.error(`Failed to load course ${courseId}:`, err);
      }
    }

    res.json(courses);
  } catch (err) {
    next(err);
  }
};

export const getCourseContent = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const file = path.join(COURSES_DIR, `${courseId}.json`);
    try {
      const courseData = await readJSON(file);
      const progress = (await readJSON(PROGRESS_FILE)) || {};
      const userProgress = req.user
        ? progress[req.user.id]?.[courseId] || {}
        : {};

      // Extract table of contents from sections
      const toc = courseData.sections.map((section, idx) => ({
        id: section.id,
        number: section.number,
        title: section.title,
        subsections: section.subsections.map((sub) => ({
          id: sub.id,
          title: sub.title,
        })),
      }));

      res.json({
        id: courseId,
        title: courseData.title,
        toc,
        progress: userProgress,
      });
    } catch (err) {
      if (err.code === "ENOENT" || err.code === "MODULE_NOT_FOUND")
        return res.status(404).json({ message: "Course not found" });
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

export const getSectionContent = async (req, res, next) => {
  try {
    const { courseId, sectionId } = req.params;
    const file = path.join(COURSES_DIR, `${courseId}.json`);
    const courseData = await readJSON(file);

    // Find section and subsection
    let foundContent = null;
    for (const section of courseData.sections) {
      for (const subsection of section.subsections) {
        if (subsection.id === sectionId) {
          foundContent = {
            ...subsection,
            sectionNumber: section.number,
            sectionTitle: section.title,
          };
          break;
        }
      }
      if (foundContent) break;
    }

    if (!foundContent) {
      return res.status(404).json({ message: "Section not found" });
    }

    res.json(foundContent);
  } catch (err) {
    if (err.code === "ENOENT" || err.code === "MODULE_NOT_FOUND")
      return res.status(404).json({ message: "Course not found" });
    next(err);
  }
};

export const updateProgress = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const { sectionId } = req.body;
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const progress = (await readJSON(PROGRESS_FILE)) || {};
    if (!progress[req.user.id]) progress[req.user.id] = {};
    if (!progress[req.user.id][courseId])
      progress[req.user.id][courseId] = {
        sectionsCompleted: [],
        lastAccessed: null,
        progress: 0,
        bookmarks: [],
        notes: {},
      };
    const p = progress[req.user.id][courseId];
    if (!p.sectionsCompleted.includes(sectionId))
      p.sectionsCompleted.push(sectionId);
    p.lastAccessed = new Date().toISOString();
    // naive progress calc
    p.progress = Math.min(
      100,
      Math.round((p.sectionsCompleted.length / 50) * 100)
    );
    await writeJSON(PROGRESS_FILE, progress);
    res.json(p);
  } catch (err) {
    next(err);
  }
};

export const toggleBookmark = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const { sectionId } = req.body;
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const progress = (await readJSON(PROGRESS_FILE)) || {};
    if (!progress[req.user.id]) progress[req.user.id] = {};
    if (!progress[req.user.id][courseId])
      progress[req.user.id][courseId] = {
        sectionsCompleted: [],
        lastAccessed: null,
        progress: 0,
        bookmarks: [],
        notes: {},
      };
    const p = progress[req.user.id][courseId];
    const idx = p.bookmarks.indexOf(sectionId);
    if (idx === -1) p.bookmarks.push(sectionId);
    else p.bookmarks.splice(idx, 1);
    await writeJSON(PROGRESS_FILE, progress);
    res.json(p.bookmarks);
  } catch (err) {
    next(err);
  }
};

export const saveNote = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const { sectionId, note } = req.body;
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const progress = (await readJSON(PROGRESS_FILE)) || {};
    if (!progress[req.user.id]) progress[req.user.id] = {};
    if (!progress[req.user.id][courseId])
      progress[req.user.id][courseId] = {
        sectionsCompleted: [],
        lastAccessed: null,
        progress: 0,
        bookmarks: [],
        notes: {},
      };
    const p = progress[req.user.id][courseId];
    p.notes[sectionId] = note;
    await writeJSON(PROGRESS_FILE, progress);
    res.json({ sectionId, note });
  } catch (err) {
    next(err);
  }
};

export const getUserProgress = async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const progress = (await readJSON(PROGRESS_FILE)) || {};
    const userProgress = progress[req.user.id] || {};
    res.json(userProgress);
  } catch (err) {
    next(err);
  }
};
