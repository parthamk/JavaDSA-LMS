import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Container, Button, Dropdown } from 'react-bootstrap'

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileDropdown, setProfileDropdown] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdown(false)
      }
    }

    if (profileDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [profileDropdown])

  // Close dropdown when authentication status changes
  useEffect(() => {
    if (!isAuthenticated) {
      setProfileDropdown(false)
      setMobileMenuOpen(false)
    }
  }, [isAuthenticated])

  const handleLogout = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Logout clicked')
    logout()
    setProfileDropdown(false)
    navigate('/')
  }

  return (
    <nav
      className="sticky-top"
      style={{
        background: 'white',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        zIndex: 100,
      }}
    >
      <Container>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 0',
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
            }}
          >
            <span style={{ fontSize: '1.75rem' }}>☕</span>
            JavaDSA LMS
          </Link>

          {/* Menu Links - Hidden on mobile */}
          <div
            className="d-none d-md-flex"
            style={{
              gap: '2rem',
              alignItems: 'center',
            }}
          >
            <Link
              to="/"
              style={{
                color: 'var(--text-dark)',
                fontWeight: '500',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--primary)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--text-dark)')}
            >
              Home
            </Link>
            <Link
              to="/courses"
              style={{
                color: 'var(--text-dark)',
                fontWeight: '500',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--primary)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--text-dark)')}
            >
              Courses
            </Link>
            <Link
              to="/practice"
              style={{
                color: 'var(--text-dark)',
                fontWeight: '500',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--primary)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--text-dark)')}
            >
              Practice
            </Link>
            <Link
              to="/about"
              style={{
                color: 'var(--text-dark)',
                fontWeight: '500',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--primary)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--text-dark)')}
            >
              About
            </Link>
          </div>

          {/* Auth Section */}
          <div
            className="d-none d-md-flex"
            style={{
              gap: '1rem',
              alignItems: 'center',
            }}
          >
            {isAuthenticated ? (
              <Dropdown ref={dropdownRef}>
                <Dropdown.Toggle
                  variant="light"
                  id="profile-dropdown"
                  style={{
                    background: 'var(--bg-light)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-dark)',
                    fontWeight: '500',
                  }}
                >
                  👤 {user?.username}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/dashboard">
                    Dashboard
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} style={{ color: '#ef4444' }}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Button as={Link} to="/login" variant="outline-primary" size="sm">
                  Login
                </Button>
                <Button as={Link} to="/register" variant="primary" size="sm">
                  Register
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="d-md-none"
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
            }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        </div>
      </Container>
    </nav>
  )
}

export default Navbar
