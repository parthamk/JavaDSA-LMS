import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Container, Row, Col, Button, ProgressBar, ListGroup, Form, Badge } from 'react-bootstrap'
import coursesData from '../data/courses.json'

// Custom renderers for ReactMarkdown
const markdownComponents = {
  // Code block styling
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '')
    const language = match ? match[1] : 'text'

    if (inline) {
      return (
        <code
          className="section-content"
          style={{
            background: 'var(--bg-light)',
            padding: '0.2rem 0.4rem',
            borderRadius: '0.25rem',
            fontFamily: "'Monaco', 'Courier New', monospace",
            color: 'var(--secondary)',
            fontSize: '0.9em',
          }}
          {...props}
        >
          {children}
        </code>
      )
    }

    return (
      <div
        style={{
          background: '#1e1e1e',
          color: '#d4d4d4',
          padding: '1rem',
          borderRadius: '0.5rem',
          overflow: 'auto',
          margin: '1rem 0',
          borderLeft: '4px solid var(--primary)',
          position: 'relative',
        }}
      >
        <Badge
          bg="secondary"
          style={{
            position: 'absolute',
            top: '0.5rem',
            right: '0.5rem',
            fontSize: '0.75rem',
          }}
        >
          {language}
        </Badge>
        <pre
          style={{
            margin: 0,
            fontFamily: "'Monaco', 'Courier New', monospace",
            fontSize: '0.9rem',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
          }}
        >
          <code>{children}</code>
        </pre>
      </div>
    )
  },

  // Table styling
  table({ children, ...props }) {
    return (
      <div
        style={{
          overflowX: 'auto',
          margin: '1rem 0',
          borderRadius: '0.5rem',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.95rem',
          }}
          {...props}
        >
          {children}
        </table>
      </div>
    )
  },

  thead({ children, ...props }) {
    return (
      <thead
        style={{
          background: 'var(--bg-light)',
          borderBottom: '2px solid var(--border)',
        }}
        {...props}
      >
        {children}
      </thead>
    )
  },

  th({ children, ...props }) {
    return (
      <th
        style={{
          padding: '0.75rem',
          textAlign: 'left',
          fontWeight: '600',
          color: 'var(--text-dark)',
        }}
        {...props}
      >
        {children}
      </th>
    )
  },

  td({ children, ...props }) {
    return (
      <td
        style={{
          padding: '0.75rem',
          borderBottom: '1px solid var(--border)',
          color: 'var(--text-light)',
        }}
        {...props}
      >
        {children}
      </td>
    )
  },

  tbody({ children, ...props }) {
    return (
      <tbody {...props}>
        {children}
      </tbody>
    )
  },

  tr({ children, ...props }) {
    return (
      <tr
        style={{
          transition: 'background-color 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--bg-light)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent'
        }}
        {...props}
      >
        {children}
      </tr>
    )
  },

  // Heading styling
  h1({ children, ...props }) {
    return (
      <h1
        style={{
          color: 'var(--primary)',
          marginTop: '1.5rem',
          marginBottom: '1rem',
          fontSize: '2rem',
          fontWeight: '700',
        }}
        {...props}
      >
        {children}
      </h1>
    )
  },

  h2({ children, ...props }) {
    return (
      <h2
        style={{
          color: 'var(--primary)',
          marginTop: '1.5rem',
          marginBottom: '1rem',
          fontSize: '1.75rem',
          fontWeight: '600',
        }}
        {...props}
      >
        {children}
      </h2>
    )
  },

  h3({ children, ...props }) {
    return (
      <h3
        style={{
          color: 'var(--primary)',
          marginTop: '1.5rem',
          marginBottom: '1rem',
          fontSize: '1.5rem',
          fontWeight: '600',
        }}
        {...props}
      >
        {children}
      </h3>
    )
  },

  h4({ children, ...props }) {
    return (
      <h4
        style={{
          color: 'var(--text-dark)',
          marginTop: '1rem',
          marginBottom: '0.75rem',
          fontSize: '1.25rem',
          fontWeight: '600',
        }}
        {...props}
      >
        {children}
      </h4>
    )
  },

  // List styling
  ul({ children, ...props }) {
    return (
      <ul
        style={{
          margin: '1rem 0',
          paddingLeft: '2rem',
          listStyle: 'disc',
        }}
        {...props}
      >
        {children}
      </ul>
    )
  },

  ol({ children, ...props }) {
    return (
      <ol
        style={{
          margin: '1rem 0',
          paddingLeft: '2rem',
          listStyle: 'decimal',
        }}
        {...props}
      >
        {children}
      </ol>
    )
  },

  li({ children, ...props }) {
    return (
      <li
        style={{
          margin: '0.5rem 0',
          color: 'var(--text-light)',
          lineHeight: '1.6',
        }}
        {...props}
      >
        {children}
      </li>
    )
  },

  // Blockquote styling
  blockquote({ children, ...props }) {
    return (
      <blockquote
        style={{
          borderLeft: '4px solid var(--primary)',
          paddingLeft: '1rem',
          margin: '1rem 0',
          color: 'var(--text-light)',
          fontStyle: 'italic',
          background: 'rgba(59, 130, 246, 0.05)',
          padding: '1rem',
          borderRadius: '0.5rem',
        }}
        {...props}
      >
        {children}
      </blockquote>
    )
  },

  // Paragraph styling
  p({ children, ...props }) {
    return (
      <p
        style={{
          color: 'var(--text-light)',
          lineHeight: '1.8',
          marginBottom: '1rem',
        }}
        {...props}
      >
        {children}
      </p>
    )
  },

  // Link styling
  a({ children, href, ...props }) {
    return (
      <a
        href={href}
        style={{
          color: 'var(--primary)',
          textDecoration: 'none',
          fontWeight: '500',
          borderBottom: '2px solid transparent',
          transition: 'border-color 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderBottomColor = 'var(--primary)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderBottomColor = 'transparent'
        }}
        {...props}
      >
        {children}
      </a>
    )
  },

  // Strong/Bold styling
  strong({ children, ...props }) {
    return (
      <strong
        style={{
          fontWeight: '700',
          color: 'var(--text-dark)',
        }}
        {...props}
      >
        {children}
      </strong>
    )
  },

  // Emphasis/Italic styling
  em({ children, ...props }) {
    return (
      <em
        style={{
          fontStyle: 'italic',
          color: 'var(--text-dark)',
        }}
        {...props}
      >
        {children}
      </em>
    )
  },

  // Horizontal rule styling
  hr({ ...props }) {
    return (
      <hr
        style={{
          margin: '2rem 0',
          border: 'none',
          borderTop: '2px solid var(--border)',
        }}
        {...props}
      />
    )
  },
}

const CourseViewer = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [bookmarks, setBookmarks] = useState([])
  const [notes, setNotes] = useState({})
  const [showNotes, setShowNotes] = useState(false)
  const [currentNote, setCurrentNote] = useState('')

  useEffect(() => {
    const foundCourse = coursesData.courses.find((c) => c.id === courseId)
    if (foundCourse) {
      setCourse(foundCourse)
      const savedBookmarks = JSON.parse(localStorage.getItem(`bookmarks-${courseId}`) || '[]')
      const savedNotes = JSON.parse(localStorage.getItem(`notes-${courseId}`) || '{}')
      setBookmarks(savedBookmarks)
      setNotes(savedNotes)
    } else {
      navigate('/courses')
    }
  }, [courseId, navigate])

  if (!course) return <div className="text-center py-5">Loading...</div>

  const currentSection = course.sections[currentSectionIndex]

  const toggleBookmark = () => {
    const sectionId = currentSection.id
    if (bookmarks.includes(sectionId)) {
      setBookmarks(bookmarks.filter((id) => id !== sectionId))
    } else {
      setBookmarks([...bookmarks, sectionId])
    }
    localStorage.setItem(`bookmarks-${courseId}`, JSON.stringify(bookmarks))
  }

  const saveNote = () => {
    const sectionId = currentSection.id
    const updatedNotes = { ...notes, [sectionId]: currentNote }
    setNotes(updatedNotes)
    localStorage.setItem(`notes-${courseId}`, JSON.stringify(updatedNotes))
  }

  const handleNext = () => {
    if (currentSectionIndex < course.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1)
      setShowNotes(false)
    }
  }

  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1)
      setShowNotes(false)
    }
  }

  const progress = ((currentSectionIndex + 1) / course.sections.length) * 100

  return (
    <div className="d-flex" style={{ minHeight: 'calc(100vh - 80px)', backgroundColor: '#f9fafb' }}>
      {/* Sidebar */}
      <div
        className="d-none d-md-flex flex-column border-end"
        style={{
          width: '300px',
          backgroundColor: 'white',
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 80px)',
          padding: '1.5rem',
        }}
      >
        <div className="mb-4">
          <h5 className="fw-bold mb-3">{course.title}</h5>
          <ProgressBar now={progress} className="mb-2" style={{ height: '4px' }} />
          <small className="text-muted">
            {currentSectionIndex + 1} / {course.sections.length}
          </small>
        </div>

        <ListGroup className="list-unstyled">
          {course.sections.map((section, index) => (
            <div
              key={section.id}
              onClick={() => setCurrentSectionIndex(index)}
              className={`p-2 mb-2 rounded cursor-pointer d-flex align-items-center gap-2 ${
                index === currentSectionIndex
                  ? 'bg-primary text-white'
                  : 'bg-light text-muted'
              }`}
              style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
            >
              {bookmarks.includes(section.id) && <span>⭐</span>}
              <span className="text-truncate small">{section.title}</span>
            </div>
          ))}
        </ListGroup>
      </div>

      {/* Main Content */}
      <div
        className="flex-grow-1 d-flex flex-column"
        style={{
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 80px)',
          padding: '2rem 1rem',
        }}
      >
        <Container>
          {/* Section Header */}
          <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
            <h2 className="mb-0">{currentSection.title}</h2>
            <div className="d-flex gap-2">
              <Button
                variant="light"
                size="sm"
                onClick={toggleBookmark}
                title="Bookmark"
                className={bookmarks.includes(currentSection.id) ? 'bg-primary text-white' : ''}
              >
                {bookmarks.includes(currentSection.id) ? '⭐' : '☆'}
              </Button>
              <Button
                variant="light"
                size="sm"
                onClick={() => setShowNotes(!showNotes)}
                title="Add Note"
              >
                📝
              </Button>
            </div>
          </div>

          {/* Section Content */}
          <div className="bg-white p-4 rounded mb-4 shadow-sm">
            <div style={{ lineHeight: '1.8' }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {currentSection.content}
              </ReactMarkdown>
            </div>
          </div>

          {/* Notes Section */}
          {showNotes && (
            <div className="bg-white p-4 rounded mb-4 shadow-sm border-start border-5 border-secondary">
              <h5 className="mb-3">Your Notes</h5>
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={currentNote}
                  onChange={(e) => setCurrentNote(e.target.value)}
                  placeholder="Add your notes here..."
                />
              </Form.Group>
              <Button variant="primary" size="sm" onClick={saveNote}>
                Save Note
              </Button>
            </div>
          )}

          {/* Navigation */}
          <div className="d-flex gap-3 justify-content-between">
            <Button
              variant="outline-primary"
              onClick={handlePrevious}
              disabled={currentSectionIndex === 0}
              className="flex-grow-1"
            >
              ← Previous
            </Button>
            <Button
              variant="outline-primary"
              onClick={handleNext}
              disabled={currentSectionIndex === course.sections.length - 1}
              className="flex-grow-1"
            >
              Next →
            </Button>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default CourseViewer
