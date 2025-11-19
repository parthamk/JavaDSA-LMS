import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import ProtectedRoute from './components/common/ProtectedRoute'
import Home from './pages/Home'
import Courses from './pages/Courses'
import CourseViewer from './pages/CourseViewer'
import Practice from './pages/Practice'
import About from './pages/About'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route
            path="/course/:courseId"
            element={
              <ProtectedRoute>
                <CourseViewer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/practice"
            element={
              <ProtectedRoute>
                <Practice />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
        <Toaster position="top-right" />
      </AuthProvider>
    </Router>
  )
}

export default App
