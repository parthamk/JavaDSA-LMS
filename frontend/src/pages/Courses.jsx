import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Button, Spinner, Card, Badge } from 'react-bootstrap'
import { getGroupedCourses } from '../services/courseService'

const Courses = () => {
  const [groupedCourses, setGroupedCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // Fetch grouped courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        const data = await getGroupedCourses()
        setGroupedCourses(data)
        setError(null)
      } catch (err) {
        // Log full error to console for debugging
        console.error('Error fetching courses:', err)

        // Show user-friendly message
        setError('Failed to load courses. Please try again later.')
        setGroupedCourses([])
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const handleStartCourse = (courseId) => {
    navigate(`/course/${courseId}`)
  }

  // Get language icon based on language
  const getLanguageIcon = (language) => {
    const icons = {
      java: '☕',
      javascript: '⚡',
    }
    return icons[language.toLowerCase()] || '📚'
  }

  if (loading) {
    return (
      <div style={{ minHeight: 'calc(100vh - 200px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading courses...</span>
        </Spinner>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ minHeight: 'calc(100vh - 200px)', padding: '3rem 0' }}>
        <Container>
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 200px)', padding: '3rem 0' }}>
      <Container>
        {/* Header Section */}
        <div className="text-center mb-5">
          <h1 className="fw-bold mb-2" style={{ fontSize: '2.5rem' }}>
            Our Courses
          </h1>
          <p className="text-muted" style={{ fontSize: '1.1rem', color: 'var(--text-light)' }}>
            Choose your learning path
          </p>
        </div>

        {/* Language Groups */}
        {groupedCourses.map((group) => (
          <div key={group.language} className="mb-5">
            {/* Language Header */}
            <div className="d-flex align-items-center gap-3 mb-4">
              <span style={{ fontSize: '2rem' }}>{getLanguageIcon(group.language)}</span>
              <h2 className="fw-bold mb-0" style={{ fontSize: '1.75rem' }}>
                {group.languageLabel}
              </h2>
              <hr className="flex-grow-1" style={{ borderColor: 'var(--color-primary)' }} />
            </div>

            {/* Courses Grid */}
            <Row
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '2rem',
                marginBottom: '3rem',
              }}
            >
              {group.courses.map((course, index) => (
                <div key={course.id} style={{ position: 'relative' }}>
                  {/* Number Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '20px',
                      width: '36px',
                      height: '36px',
                      background: 'var(--color-primary)',
                      color: 'white',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      zIndex: 10,
                      boxShadow: '0 4px 12px rgba(0, 86, 179, 0.3)',
                    }}
                  >
                    {index + 1}
                  </div>

                  <Card
                    className="h-100 border-0"
                    style={{
                      background: 'white',
                      borderRadius: '1rem',
                      padding: '2rem',
                      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer',
                      marginTop: '0.5rem',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.12)'
                      e.currentTarget.style.transform = 'translateY(-8px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.08)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    {/* Course Title */}
                    <h3
                      style={{
                        margin: '0 0 1.5rem 0',
                        color: 'var(--text-dark)',
                        fontSize: '1.35rem',
                        fontWeight: 700,
                        lineHeight: 1.3,
                      }}
                    >
                      {course.title}
                    </h3>

                    {/* Course Description */}
                    <p
                      style={{
                        color: 'var(--text-light)',
                        lineHeight: 1.6,
                        marginBottom: '1.5rem',
                        flex: 1,
                        fontSize: '0.95rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {course.description}
                    </p>

                    {/* Course Stats */}
                    <div
                      style={{
                        display: 'flex',
                        gap: '1.5rem',
                        marginBottom: '1.5rem',
                        padding: '1rem',
                        background: 'rgba(0, 86, 179, 0.05)',
                        borderRadius: '0.75rem',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)', fontSize: '0.9rem', flex: 1 }}>
                        <span>📚</span>
                        <span style={{ fontWeight: 500 }}>{course.totalSections} Lessons</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)', fontSize: '0.9rem', flex: 1 }}>
                        <span>⏱️</span>
                        <span style={{ fontWeight: 500 }}>{course.estimatedHours} hours</span>
                      </div>
                    </div>

                    {/* Difficulty Badge */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      <Badge
                        bg={getDifficultyBadgeColor(course.difficulty)}
                        style={{
                          padding: '0.4rem 0.9rem',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}
                      >
                        {course.difficulty}
                      </Badge>
                    </div>

                    {/* CTA Button */}
                    <Button
                      variant="primary"
                      onClick={() => handleStartCourse(course.id)}
                      style={{ marginTop: 'auto' }}
                    >
                      Start Learning →
                    </Button>
                  </Card>
                </div>
              ))}
            </Row>
          </div>
        ))}
      </Container>
    </div>
  )
}

// Helper function to determine badge color based on difficulty
const getDifficultyBadgeColor = (difficulty) => {
  if (difficulty.includes('Advanced')) return 'danger'
  if (difficulty.includes('Intermediate')) return 'warning'
  return 'success'
}

export default Courses
