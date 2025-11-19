import { executeCode, getRuntimes } from "../utils/pistonClient.js";

// Language mapping for Piston API
const languageMap = {
  java: "java",
  python: "python3",
  python3: "python3",
  javascript: "javascript",
  js: "javascript",
  cpp: "cpp",
  c: "c",
  csharp: "csharp",
  go: "go",
  rust: "rust",
};

export const runCode = async (req, res, next) => {
  try {
    const payload = req.body;
    if (!payload || !payload.files)
      return res.status(400).json({ message: "Invalid payload" });
    const totalLen = payload.files.reduce(
      (s, f) => s + (f.content?.length || 0),
      0
    );
    if (totalLen > 50 * 1024)
      return res.status(400).json({ message: "Code too large" });

    // Map language name to Piston API language
    const pistonLanguage = languageMap[payload.language] || payload.language;
    
    // Create payload for Piston API
    const pistonPayload = {
      ...payload,
      language: pistonLanguage,
    };

    console.log("Executing code with language:", pistonLanguage);
    console.log("Payload:", pistonPayload);

    // sanitize minimal: remove any shell-like inputs (Piston handles sandboxes)
    const result = await executeCode(pistonPayload);
    
    // Parse Piston API response and format for frontend
    console.log("Raw Piston response:", JSON.stringify(result, null, 2));

    if (result.error) {
      console.error("Piston API error:", result.error);
      return res.json({ 
        success: false, 
        error: result.error.message || "Execution failed",
        output: "",
        raw: result.error
      });
    }

    // Check for compilation errors
    const compileStdout = result.compile?.stdout || "";
    const compileStderr = result.compile?.stderr || "";
    const compileCode = result.compile?.code;

    if (compileCode !== 0 && compileStderr) {
      console.error("Compilation error:", compileStderr);
      return res.json({
        success: false,
        error: "Compilation Error",
        output: compileStderr,
        raw: result
      });
    }

    // Check for runtime errors
    const runStdout = result.run?.stdout || "";
    const runStderr = result.run?.stderr || "";
    const runCode = result.run?.code;
    const runSignal = result.run?.signal;

    // Detect infinite loop or timeout (signal 9 = SIGKILL, signal 15 = SIGTERM)
    if (runSignal === 9 || runSignal === 15) {
      console.error("Infinite loop or timeout detected. Signal:", runSignal);
      return res.json({
        success: false,
        error: "Timeout or Infinite Loop Detected",
        output: runStdout + "\n[Process killed due to timeout]",
        raw: result
      });
    }

    // Check for runtime exceptions
    if (runCode !== 0 && runStderr) {
      console.error("Runtime error:", runStderr);
      return res.json({
        success: false,
        error: "Runtime Error",
        output: runStderr,
        raw: result
      });
    }

    // Extract successful output
    const output = runStdout || "";

    console.log("Execution successful. Output:", output);
    console.log("Full result:", result);
    
    const responseData = {
      success: true,
      output: output,  // Return actual output, even if empty
      raw: result
    };
    
    console.log("Sending response:", JSON.stringify(responseData, null, 2));

    return res.json(responseData);
  } catch (err) {
    console.error("Code execution error:", err);
    if (err.code === "ECONNABORTED") {
      return res.status(504).json({ 
        success: false,
        error: "Execution Timeout",
        message: "Code execution took too long (exceeded 20 seconds)"
      });
    }
    next(err);
  }
};

export const getLanguages = async (req, res, next) => {
  try {
    const runtimes = await getRuntimes();
    // Map to simple structure
    const list = (runtimes || []).map((r) => ({
      language: r.language,
      version: r.version,
      aliases: r.aliases || [],
    }));
    res.json(list);
  } catch (err) {
    next(err);
  }
};
