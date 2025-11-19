// Lightweight markdown parser utilities for extracting headers and sections
export const extractTableOfContents = (markdown) => {
  const lines = markdown.split("\n");
  const toc = [];
  for (const line of lines) {
    const h2 = line.match(/^##\s+(.*)/);
    const h3 = line.match(/^###\s+(.*)/);
    if (h2)
      toc.push({ level: 2, title: h2[1].trim(), id: generateSectionId(h2[1]) });
    else if (h3)
      toc.push({ level: 3, title: h3[1].trim(), id: generateSectionId(h3[1]) });
  }
  return toc;
};

export const generateSectionId = (heading) => {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
};

export const extractSection = (markdown, sectionId) => {
  const lines = markdown.split("\n");
  const sections = [];
  let current = null;
  for (const line of lines) {
    const h2 = line.match(/^##\s+(.*)/);
    const h3 = line.match(/^###\s+(.*)/);
    if (h2 || h3) {
      if (current) sections.push(current);
      const title = (h2 || h3)[1].trim();
      current = { id: generateSectionId(title), title, content: "" };
      continue;
    }
    if (current) current.content += line + "\n";
  }
  if (current) sections.push(current);
  return sections.find((s) => s.id === sectionId) || null;
};

export const parseCodeBlocks = (content) => {
  // returns array of {lang, code}
  const re = /```(\w+)?\n([\s\S]*?)```/g;
  const blocks = [];
  let m;
  while ((m = re.exec(content))) {
    blocks.push({ language: m[1] || "text", code: m[2] });
  }
  return blocks;
};
