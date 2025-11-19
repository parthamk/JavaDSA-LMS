import axios from "axios";

const PISTON_API_URL =
  process.env.PISTON_API_URL || "https://emkc.org/api/v2/piston";

let runtimesCache = { data: null, ts: 0 };

export const getRuntimes = async () => {
  const now = Date.now();
  if (runtimesCache.data && now - runtimesCache.ts < 24 * 60 * 60 * 1000) {
    return runtimesCache.data;
  }

  const res = await axios.get(`${PISTON_API_URL}/runtimes`, { timeout: 15000 });
  runtimesCache = { data: res.data, ts: Date.now() };
  return res.data;
};

export const executeCode = async (payload) => {
  // Basic wrapper with timeout
  try {
    const res = await axios.post(`${PISTON_API_URL}/execute`, payload, {
      timeout: 20000,
    });
    return res.data;
  } catch (err) {
    if (err.response) {
      return { error: err.response.data, success: false };
    }
    throw err;
  }
};
