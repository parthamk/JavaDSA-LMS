import './Services.css'

const Services = () => {
  const services = [
    {
      icon: '📚',
      title: 'Comprehensive Courses',
      description: 'Structured learning paths for Java and DSA',
    },
    {
      icon: '💻',
      title: 'Interactive Code Playground',
      description: 'Practice coding with real-time execution',
    },
    {
      icon: '📊',
      title: 'Progress Tracking',
      description: 'Track your learning journey',
    },
    {
      icon: '🎯',
      title: 'Beginner to Advanced',
      description: 'Content suitable for all skill levels',
    },
    {
      icon: '⚡',
      title: 'Code Examples',
      description: 'Real-world examples with detailed explanations',
    },
    {
      icon: '🌟',
      title: 'Free & Open Source',
      description: '100% free educational platform',
    },
  ]

  return (
    <section id="services" className="services">
      <div className="container">
        <h2>Why Choose JavaDSA Learn?</h2>
        <p className="section-subtitle">Everything you need to master Java and DSA</p>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
