import { supabase } from "../config/supabase.js";
import {
  isValidEmail,
  isValidUsername,
  isValidPassword,
} from "../utils/validator.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

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

    // Check if Supabase is configured
    if (!supabase) {
      return res.status(503).json({ 
        message: "Database service is not available. Please configure Supabase credentials." 
      });
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .or(`email.eq.${email},username.eq.${username}`)
      .single();

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const userId = crypto.randomUUID();

    const { data, error } = await supabase.from("users").insert({
      id: userId,
      username,
      email,
      password: hashed,
      created_at: new Date().toISOString(),
      last_login: null,
    });

    if (error) throw error;

    const token = jwt.sign({ id: userId, email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(201).json({
      token,
      user: {
        id: userId,
        username,
        email,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Missing credentials" });

    // Check if Supabase is configured
    if (!supabase) {
      return res.status(503).json({ 
        message: "Database service is not available. Please configure Supabase credentials." 
      });
    }

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    // Update last login
    await supabase
      .from("users")
      .update({ last_login: new Date().toISOString() })
      .eq("id", user.id);

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

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error || !user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get user progress
    const { data: progressData } = await supabase
      .from("progress")
      .select("*")
      .eq("user_id", userId);

    const { password: _p, ...safe } = user;
    return res.json({
      user: safe,
      progress: progressData || [],
    });
  } catch (err) {
    next(err);
  }
};
