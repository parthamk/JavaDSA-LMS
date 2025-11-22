import path from "path";
import { fileURLToPath } from "url";
import { readJSON, writeJSON } from "../utils/fileHandler.js";
import {
  extractTableOfContents,
  extractSection,
  parseCodeBlocks,
} from "../utils/markdownParser.js";
import { readFile } from "fs/promises";
import { supabase } from "../config/supabase.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const COURSES_DIR = path.join(__dirname, "../data/courses");
const PROGRESS_FILE = path.join(__dirname, "../data/progress.json");

export const getCourseList = async (req, res, next) => {
  try {
    const courseIds = ["java", "dsa", "javascript", "js-dsa"];
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
          language: courseData.language || "unknown",
          languageLabel: courseData.languageLabel || "Unknown",
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

// Get courses grouped by programming language
export const getGroupedCourses = async (req, res, next) => {
  try {
    const courseIds = ["java", "dsa", "javascript", "js-dsa"];
    const grouped = {};

    for (const courseId of courseIds) {
      try {
        const file = path.join(COURSES_DIR, `${courseId}.json`);
        const courseData = await readJSON(file);
        const language = courseData.language || "unknown";
        const languageLabel = courseData.languageLabel || "Unknown";

        if (!grouped[language]) {
          grouped[language] = {
            language,
            languageLabel,
            courses: [],
          };
        }

        grouped[language].courses.push({
          id: courseData.id,
          title: courseData.title,
          description: courseData.description,
          difficulty: courseData.difficulty,
          duration: courseData.duration,
          totalSections: courseData.sections.length,
          estimatedHours: courseData.duration
            ? parseInt(courseData.duration)
            : 0,
        });
      } catch (err) {
        console.error(`Failed to load course ${courseId}:`, err);
      }
    }

    // Convert to array and sort by language
    const result = Object.values(grouped).sort((a, b) =>
      a.language.localeCompare(b.language)
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
};

// Get courses filtered by language
export const getCoursesByLanguage = async (req, res, next) => {
  try {
    const { lang } = req.params;
    const courseIds = ["java", "dsa", "javascript", "js-dsa"];
    const courses = [];

    for (const courseId of courseIds) {
      try {
        const file = path.join(COURSES_DIR, `${courseId}.json`);
        const courseData = await readJSON(file);

        if (
          (courseData.language || "unknown").toLowerCase() ===
          lang.toLowerCase()
        ) {
          courses.push({
            id: courseData.id,
            title: courseData.title,
            description: courseData.description,
            difficulty: courseData.difficulty,
            duration: courseData.duration,
            language: courseData.language || "unknown",
            languageLabel: courseData.languageLabel || "Unknown",
            totalSections: courseData.sections.length,
            estimatedHours: courseData.duration
              ? parseInt(courseData.duration)
              : 0,
          });
        }
      } catch (err) {
        console.error(`Failed to load course ${courseId}:`, err);
      }
    }

    if (courses.length === 0) {
      return res
        .status(404)
        .json({ message: `No courses found for language: ${lang}` });
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
      let userProgress = {};

      if (req.user) {
        const { data: progressData } = await supabase
          .from("progress")
          .select("*")
          .eq("user_id", req.user.id)
          .eq("course_id", courseId)
          .single();

        if (progressData) {
          userProgress = {
            sectionsCompleted: progressData.sections_completed || [],
            bookmarks: progressData.bookmarks || [],
            notes: progressData.notes || {},
            progress: progressData.progress_percentage || 0,
          };
        }
      }

      // Extract table of contents from sections
      res.json({
        id: courseId,
        title: courseData.title,
        description: courseData.description,
        difficulty: courseData.difficulty,
        duration: courseData.duration,
        language: courseData.language,
        languageLabel: courseData.languageLabel,
        sections: courseData.sections,
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
    const { courseId, sectionId: sectionIdParam } = req.params;
    const sectionId = String(sectionIdParam); // Ensure sectionId is a string for consistent comparison
    const file = path.join(COURSES_DIR, `${courseId}.json`);
    const courseData = await readJSON(file);

    // Find section and subsection
    let foundContent = null;
    for (const section of courseData.sections) {
      for (const subsection of section.subsections) {
        console.log(
          `Comparing: ${
            subsection.id
          } (type: ${typeof subsection.id}) with ${sectionId} (type: ${typeof sectionId})`
        );
        if (String(subsection.id) === sectionId) {
          // Ensure both are strings for comparison
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

    // Get existing progress
    const { data: existingProgress } = await supabase
      .from("progress")
      .select("*")
      .eq("user_id", req.user.id)
      .eq("course_id", courseId)
      .single();

    let sectionsCompleted = existingProgress?.sections_completed || [];
    if (!sectionsCompleted.includes(sectionId)) {
      sectionsCompleted.push(sectionId);
    }

    const progressPercentage = Math.min(
      100,
      Math.round((sectionsCompleted.length / 50) * 100)
    );

    const { data, error } = existingProgress
      ? await supabase
          .from("progress")
          .update({
            sections_completed: sectionsCompleted,
            last_accessed: new Date().toISOString(),
            progress_percentage: progressPercentage,
          })
          .eq("user_id", req.user.id)
          .eq("course_id", courseId)
          .select()
          .single()
      : await supabase
          .from("progress")
          .insert({
            user_id: req.user.id,
            course_id: courseId,
            sections_completed: sectionsCompleted,
            bookmarks: [],
            notes: {},
            progress_percentage: progressPercentage,
            last_accessed: new Date().toISOString(),
          })
          .select()
          .single();

    if (error) throw error;

    res.json({
      sectionsCompleted: data.sections_completed,
      progress: data.progress_percentage,
      lastAccessed: data.last_accessed,
    });
  } catch (err) {
    next(err);
  }
};

export const toggleBookmark = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const { sectionId } = req.body;
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    // Get existing progress
    const { data: existingProgress } = await supabase
      .from("progress")
      .select("*")
      .eq("user_id", req.user.id)
      .eq("course_id", courseId)
      .single();

    let bookmarks = existingProgress?.bookmarks || [];
    const idx = bookmarks.indexOf(sectionId);
    if (idx === -1) {
      bookmarks.push(sectionId);
    } else {
      bookmarks.splice(idx, 1);
    }

    const { data, error } = existingProgress
      ? await supabase
          .from("progress")
          .update({ bookmarks })
          .eq("user_id", req.user.id)
          .eq("course_id", courseId)
          .select()
          .single()
      : await supabase
          .from("progress")
          .insert({
            user_id: req.user.id,
            course_id: courseId,
            sections_completed: [],
            bookmarks,
            notes: {},
            progress_percentage: 0,
            last_accessed: new Date().toISOString(),
          })
          .select()
          .single();

    if (error) throw error;

    res.json(data.bookmarks);
  } catch (err) {
    next(err);
  }
};

export const saveNote = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const { sectionId, note } = req.body;
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    // Get existing progress
    const { data: existingProgress } = await supabase
      .from("progress")
      .select("*")
      .eq("user_id", req.user.id)
      .eq("course_id", courseId)
      .single();

    let notes = existingProgress?.notes || {};
    notes[sectionId] = note;

    const { data, error } = existingProgress
      ? await supabase
          .from("progress")
          .update({ notes })
          .eq("user_id", req.user.id)
          .eq("course_id", courseId)
          .select()
          .single()
      : await supabase
          .from("progress")
          .insert({
            user_id: req.user.id,
            course_id: courseId,
            sections_completed: [],
            bookmarks: [],
            notes,
            progress_percentage: 0,
            last_accessed: new Date().toISOString(),
          })
          .select()
          .single();

    if (error) throw error;

    res.json({ sectionId, note });
  } catch (err) {
    next(err);
  }
};

export const getUserProgress = async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const { data: progressData, error } = await supabase
      .from("progress")
      .select("*")
      .eq("user_id", req.user.id);

    if (error) throw error;

    // Format progress data
    const formattedProgress = {};
    progressData.forEach((p) => {
      formattedProgress[p.course_id] = {
        sectionsCompleted: p.sections_completed || [],
        bookmarks: p.bookmarks || [],
        notes: p.notes || {},
        progress: p.progress_percentage || 0,
        lastAccessed: p.last_accessed,
      };
    });

    res.json(formattedProgress);
  } catch (err) {
    next(err);
  }
};
