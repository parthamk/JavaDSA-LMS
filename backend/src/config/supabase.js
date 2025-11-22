import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

let supabase = null;

// Only initialize Supabase if credentials are provided
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
} else if (process.env.NODE_ENV === "production") {
  throw new Error("Missing Supabase environment variables in production");
} else {
  console.warn("⚠️  Supabase not configured. Running in development mode without database.");
}

export { supabase };

// Test connection
export const testConnection = async () => {
  if (!supabase) {
    console.log("⚠️  Supabase not configured. Skipping connection test.");
    return false;
  }

  try {
    const { data, error } = await supabase
      .from("users")
      .select("count()", { count: "exact" });
    if (error) throw error;
    console.log("✓ Supabase connection successful");
    return true;
  } catch (err) {
    console.error("✗ Supabase connection failed:", err.message);
    return false;
  }
};
