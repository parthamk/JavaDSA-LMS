import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap'
import coursesData from '../data/courses.json'

const Courses = () => {
  const [courses, setCourses] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    setCourses(coursesData.courses)
  }, [])

  const handleStartCourse = (courseId) => {
    navigate(`/course/${courseId}`)
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 200px)', padding: '3rem 0' }}>
      <Container>
        <h1 className="text-center fw-bold mb-2" style={{ fontSize: '2.5rem' }}>
          Our Courses
        </h1>
        <p
          className="text-center text-muted mb-5"
          style={{ fontSize: '1.1rem', color: 'var(--text-light)' }}
        >
          Choose your learning path
        </p>

        <Row
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
          }}
        >
          {courses.map((course) => (
            <div key={course.id}>
              <Card
                className="h-100 border-0"
                style={{
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)'
                  e.currentTarget.style.transform = 'translateY(-8px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    marginBottom: '1rem',
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      color: 'var(--text-dark)',
                      fontSize: '1.5rem',
                      flex: 1,
                    }}
                  >
                    {course.title}
                  </h3>
                  <Badge bg="primary" className="text-nowrap">
                    {course.totalSections} Sections
                  </Badge>
                </div>

                <p
                  style={{
                    color: 'var(--text-light)',
                    lineHeight: '1.6',
                    marginBottom: '1.5rem',
                    flex: 1,
                  }}
                >
                  {course.description}
                </p>

                <div
                  style={{
                    display: 'flex',
                    gap: '1.5rem',
                    marginBottom: '1.5rem',
                    color: 'var(--text-light)',
                    fontSize: '0.95rem',
                  }}
                >
                  <span>⏱️ {course.estimatedHours} hours</span>
                  <span>📚 {course.level}</span>
                </div>

                <Button
                  variant="primary"
                  onClick={() => handleStartCourse(course.id)}
                  style={{ marginTop: 'auto' }}
                >
                  Start Course →
                </Button>
              </Card>
            </div>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default Courses
