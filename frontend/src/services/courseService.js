import axios from 'axios'

const API_URL = '/api/courses'

export const getCourses = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

export const getCourseContent = async (courseId) => {
  const response = await axios.get(`${API_URL}/${courseId}`)
  return response.data
}

export const getSectionContent = async (courseId, sectionId) => {
  const response = await axios.get(`${API_URL}/${courseId}/section/${sectionId}`)
  return response.data
}

export const updateProgress = async (courseId, sectionId) => {
  const response = await axios.post(`${API_URL}/${courseId}/progress`, { sectionId })
  return response.data
}

export const toggleBookmark = async (courseId, sectionId) => {
  const response = await axios.post(`${API_URL}/${courseId}/bookmark`, { sectionId })
  return response.data
}

export const saveNote = async (courseId, sectionId, note) => {
  const response = await axios.post(`${API_URL}/${courseId}/notes`, { sectionId, note })
  return response.data
}
