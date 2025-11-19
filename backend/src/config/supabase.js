import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Test connection
export const testConnection = async () => {
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
