import axios from 'axios'

const API_URL = '/api/code'

export const executeCode = async (payload) => {
  try {
    // Get JWT token from localStorage
    const token = localStorage.getItem('token')
    
    if (!token) {
      return {
        success: false,
        error: "Unauthorized",
        output: "Please login to execute code",
        raw: null
      }
    }

    // Send request with JWT token in Authorization header
    const response = await axios.post(`${API_URL}/execute`, payload, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    
    console.log("Backend response:", response.data)
    console.log("Output field:", response.data.output)
    
    // Handle response from backend
    if (response.data.success) {
      const result = {
        success: true,
        output: response.data.output,  // Return actual output, even if empty
        error: null,
        raw: response.data.raw
      }
      console.log("Returning result:", result)
      return result
    } else {
      // Error response from backend
      const errorType = response.data.error || "Execution Error"
      const errorOutput = response.data.output || ""
      
      return {
        success: false,
        error: errorType,
        output: errorOutput,
        raw: response.data.raw
      }
    }
  } catch (error) {
    // Handle network or server errors
    console.error("Network/Server error:", error)
    
    let errorMessage = "Failed to execute code"
    let errorOutput = ""
    
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message
      errorOutput = error.response.data.message
    } else if (error.response?.data?.error) {
      errorMessage = error.response.data.error
      errorOutput = error.response.data.output || ""
    } else if (error.message) {
      errorMessage = error.message
    }
    
    return {
      success: false,
      error: errorMessage,
      output: errorOutput,
      raw: error.response?.data
    }
  }
}

export const getSupportedLanguages = async () => {
  try {
    const response = await axios.get(`${API_URL}/languages`)
    return response.data || []
  } catch (error) {
    console.error('Failed to fetch languages:', error)
    return []
  }
}
