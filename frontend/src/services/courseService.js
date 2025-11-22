import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api/courses",
});

export const getCourses = async () => {
  const response = await api.get("/");
  return response.data;
};

export const getCourseContent = async (courseId) => {
  const response = await api.get(`/${courseId}`);
  return response.data;
};

export const getSectionContent = async (courseId, sectionId) => {
  const response = await api.get(`/${courseId}/section/${sectionId}`);
  return response.data;
};

export const updateProgress = async (courseId, sectionId) => {
  const response = await api.post(`/${courseId}/progress`, { sectionId });
  return response.data;
};

export const toggleBookmark = async (courseId, sectionId) => {
  const response = await api.post(`/${courseId}/bookmark`, { sectionId });
  return response.data;
};

export const saveNote = async (courseId, sectionId, note) => {
  const response = await api.post(`/${courseId}/notes`, { sectionId, note });
  return response.data;
};
