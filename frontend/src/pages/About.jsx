import { Container, Row, Col, Card, Button } from 'react-bootstrap'

const About = () => {
  const features = [
    {
      icon: '📚',
      title: 'Structured Learning',
      description: 'Comprehensive courses designed by professionals',
    },
    {
      icon: '💻',
      title: 'Code Playground',
      description: 'Practice coding with real-time execution',
    },
    {
      icon: '📊',
      title: 'Progress Tracking',
      description: 'Track your learning journey',
    },
    {
      icon: '🎯',
      title: 'Hands-on Learning',
      description: 'Learn by doing with practical examples',
    },
    {
      icon: '🔐',
      title: 'Secure Authentication',
      description: 'Your data is safe with JWT-based auth',
    },
    {
      icon: '🌐',
      title: 'Open Source',
      description: 'Contribute and learn from the codebase',
    },
  ]

  const technologies = [
    { name: 'React', icon: '⚛️' },
    { name: 'Vite', icon: '⚡' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Express', icon: '🚂' },
    { name: 'JWT', icon: '🔐' },
    { name: 'Supabase', icon: '🗄️' },
    { name: 'Monaco Editor', icon: '💻' },
    { name: 'Piston API', icon: '⚙️' },
  ]

  return (
    <div style={{ minHeight: 'calc(100vh - 200px)', padding: '3rem 0' }}>
      <Container>
        {/* Project Info Section */}
        <section style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 className="fw-bold mb-2" style={{ fontSize: '3rem', color: 'var(--text-dark)' }}>
            JavaDSA Learn
          </h1>
          <p
            className="fw-bold mb-4"
            style={{ fontSize: '1.25rem', color: 'var(--primary)' }}
          >
            Free, Open-Source Learning Management System for Java & Data Structures
          </p>

          <div
            style={{
              maxWidth: '800px',
              margin: '0 auto 2rem',
              lineHeight: '1.8',
              color: 'var(--text-light)',
            }}
          >
            <p style={{ marginBottom: '1rem' }}>
              JavaDSA Learn is a comprehensive educational platform designed to help
              students and professionals master Java programming and Data Structures &
              Algorithms from basic to advanced levels.
            </p>

            <p style={{ marginBottom: '1rem' }}>
              Built with modern web technologies, this platform provides structured
              learning paths, interactive code execution, and progress tracking—all
              completely free and open source.
            </p>
          </div>

          {/* Stats */}
          <Row
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '2rem',
              margin: '2rem 0',
            }}
          >
            {[
              { num: '2', label: 'Comprehensive Courses' },
              { num: '50+', label: 'Sections to Learn' },
              { num: '100%', label: 'Free Forever' },
              { num: 'Open', label: 'Source Project' },
            ].map((stat, idx) => (
              <div
                key={idx}
                style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <h3
                  style={{
                    fontSize: '2rem',
                    color: 'var(--primary)',
                    margin: '0 0 0.5rem 0',
                  }}
                >
                  {stat.num}
                </h3>
                <p style={{ margin: 0, color: 'var(--text-light)', fontSize: '0.9rem' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </Row>

          <Button
            href="https://github.com/parthamk/JavaDSA-LMS"
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
          >
            ⭐ Star on GitHub
          </Button>
        </section>

        <hr style={{ margin: '4rem 0' }} />

        {/* Features Section */}
        <section style={{ marginBottom: '4rem' }}>
          <h2
            className="fw-bold mb-4"
            style={{ fontSize: '2rem', textAlign: 'center', color: 'var(--text-dark)' }}
          >
            Why Choose JavaDSA Learn?
          </h2>
          <Row
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
            }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '0.75rem',
                  textAlign: 'center',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                  {feature.icon}
                </div>
                <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-dark)' }}>
                  {feature.title}
                </h3>
                <p style={{ margin: 0, color: 'var(--text-light)', fontSize: '0.95rem' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </Row>
        </section>

        <hr style={{ margin: '4rem 0' }} />

        {/* Tech Stack Section */}
        <section style={{ marginBottom: '4rem' }}>
          <h2
            className="fw-bold mb-4"
            style={{ fontSize: '2rem', textAlign: 'center', color: 'var(--text-dark)' }}
          >
            Built With
          </h2>
          <Row
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {technologies.map((tech, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  textAlign: 'center',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>
                  {tech.icon}
                </div>
                <p style={{ margin: 0, color: 'var(--text-dark)', fontWeight: '600', fontSize: '0.95rem' }}>
                  {tech.name}
                </p>
              </div>
            ))}
          </Row>
        </section>

        <hr style={{ margin: '4rem 0' }} />

        {/* License Section */}
        <section style={{ marginBottom: '4rem' }}>
          <h2
            className="fw-bold mb-4"
            style={{ fontSize: '2rem', textAlign: 'center', color: 'var(--text-dark)' }}
          >
            Open Source License
          </h2>
          <div
            style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '0.75rem',
              margin: '0 auto',
              textAlign: 'center',
              maxWidth: '600px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>MIT License</h3>
            <p
              style={{
                color: 'var(--text-light)',
                lineHeight: '1.8',
                marginBottom: '1.5rem',
              }}
            >
              This project is licensed under the MIT License. You are free to use,
              modify, and distribute this software for personal or commercial purposes
              with proper attribution.
            </p>
            <Button
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
            >
              View License
            </Button>
          </div>
        </section>

        <hr style={{ margin: '4rem 0' }} />

        {/* Contact Section */}
        <section style={{ textAlign: 'center' }}>
          <h2 className="fw-bold mb-4" style={{ color: 'var(--text-dark)' }}>
            Get in Touch
          </h2>
          <div
            style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '0.75rem',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            <p style={{ margin: '1rem 0', color: 'var(--text-light)', fontSize: '1.1rem' }}>
              📧 Email: contact@javadsalearn.com
            </p>
            <p style={{ margin: '1rem 0', color: 'var(--text-light)', fontSize: '1.1rem' }}>
              🐙 GitHub: github.com/yourusername/java-dsa-lms
            </p>
          </div>
        </section>
      </Container>
    </div>
  )
}

export default About
