import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer
      style={{
        background: 'var(--text-dark)',
        color: 'white',
        marginTop: '4rem',
      }}
    >
      <Container>
        <Row
          style={{
            gap: '2rem',
            padding: '3rem 0',
          }}
        >
          <Col md={6} lg={3}>
            <h5
              style={{
                marginBottom: '1rem',
                color: 'var(--primary)',
                fontWeight: '600',
              }}
            >
              About
            </h5>
            <p
              style={{
                lineHeight: '1.6',
                color: 'rgba(255, 255, 255, 0.8)',
              }}
            >
              JavaDSA LMS is a free, open-source platform for mastering Java and
              Data Structures & Algorithms.
            </p>
          </Col>

          <Col md={6} lg={3}>
            <h5
              style={{
                marginBottom: '1rem',
                color: 'var(--primary)',
                fontWeight: '600',
              }}
            >
              Quick Links
            </h5>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
              }}
            >
              <li style={{ marginBottom: '0.75rem' }}>
                <Link
                  to="/"
                  style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--primary)')}
                  onMouseLeave={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.8)')}
                >
                  Home
                </Link>
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <Link
                  to="/courses"
                  style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--primary)')}
                  onMouseLeave={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.8)')}
                >
                  Courses
                </Link>
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <Link
                  to="/practice"
                  style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--primary)')}
                  onMouseLeave={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.8)')}
                >
                  Practice
                </Link>
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <Link
                  to="/about"
                  style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--primary)')}
                  onMouseLeave={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.8)')}
                >
                  About
                </Link>
              </li>
            </ul>
          </Col>

          <Col md={6} lg={3}>
            <h5
              style={{
                marginBottom: '1rem',
                color: 'var(--primary)',
                fontWeight: '600',
              }}
            >
              Connect
            </h5>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
              }}
            >
              <li style={{ marginBottom: '0.75rem' }}>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--primary)')}
                  onMouseLeave={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.8)')}
                >
                  GitHub
                </a>
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <a
                  href="mailto:contact@javadsalearn.com"
                  style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--primary)')}
                  onMouseLeave={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.8)')}
                >
                  Email
                </a>
              </li>
            </ul>
          </Col>
        </Row>

        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '1.5rem 0',
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '0.875rem',
          }}
        >
          <p>&copy; 2025 JavaDSA Learn - Open Source Project | MIT License</p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
