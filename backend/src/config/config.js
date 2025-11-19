import assert from "assert";

export const validateEnv = () => {
  try {
    assert(process.env.JWT_SECRET, "JWT_SECRET is required");
    // PISTON_API_URL is optional; default is handled in pistonClient
  } catch (err) {
    console.error("Environment validation failed:", err.message);
    if (process.env.NODE_ENV === "production") process.exit(1);
  }
};
