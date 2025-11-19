import {
  readJSON,
  writeJSON,
  appendToJSON,
  updateJSON,
} from "../utils/fileHandler.js";
import {
  isValidEmail,
  isValidUsername,
  isValidPassword,
} from "../utils/validator.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const USERS_FILE = path.join(__dirname, "../data/users.json");
const SALT_ROUNDS = 10;

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ message: "Missing fields" });
    if (!isValidEmail(email))
      return res.status(400).json({ message: "Invalid email" });
    if (!isValidUsername(username))
      return res.status(400).json({ message: "Invalid username" });
    if (!isValidPassword(password))
      return res.status(400).json({ message: "Invalid password" });

    const users = (await readJSON(USERS_FILE)) || [];
    if (users.find((u) => u.email === email || u.username === username)) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const user = {
      id: crypto.randomUUID(),
      username,
      email,
      password: hashed,
      createdAt: new Date().toISOString(),
      lastLogin: null,
    };

    await appendToJSON(USERS_FILE, user);

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    const { password: _p, ...safe } = user;
    return res.status(201).json({ token, user: safe });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Missing credentials" });
    const users = (await readJSON(USERS_FILE)) || [];
    const user = users.find((u) => u.email === email);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    user.lastLogin = new Date().toISOString();
    await writeJSON(USERS_FILE, users);

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    const { password: _p, ...safe } = user;
    return res.json({ token, user: safe });
  } catch (err) {
    next(err);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    const users = (await readJSON(USERS_FILE)) || [];
    const user = users.find((u) => u.id === userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Optionally read progress
    const progress =
      (await readJSON(path.join(__dirname, "../data/progress.json"))) || {};
    const { password: _p, ...safe } = user;
    return res.json({ user: safe, progress: progress[userId] || {} });
  } catch (err) {
    next(err);
  }
};
