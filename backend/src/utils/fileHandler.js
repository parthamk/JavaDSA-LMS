import fs from "fs/promises";

export const readJSON = async (filePath) => {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw || "{}");
  } catch (err) {
    if (err.code === "ENOENT") return null;
    throw err;
  }
};

export const writeJSON = async (filePath, data) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    throw err;
  }
};

export const appendToJSON = async (filePath, entry) => {
  const arr = (await readJSON(filePath)) || [];
  if (!Array.isArray(arr)) throw new Error("Target JSON is not an array");
  arr.push(entry);
  await writeJSON(filePath, arr);
  return entry;
};

export const updateJSON = async (filePath, id, updateData) => {
  const arr = (await readJSON(filePath)) || [];
  if (!Array.isArray(arr)) throw new Error("Target JSON is not an array");
  const idx = arr.findIndex((it) => it.id === id);
  if (idx === -1) throw new Error("Item not found");
  arr[idx] = { ...arr[idx], ...updateData };
  await writeJSON(filePath, arr);
  return arr[idx];
};
