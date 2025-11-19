import { Link } from 'react-router-dom'
import './Hero.css'

const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <h1>Master Java & Data Structures</h1>
          <p className="hero-subtitle">
            From basics to advanced - Your journey to becoming a skilled developer
          </p>
          <div className="hero-buttons">
            <Link to="/courses" className="btn btn-primary">
              Start Learning
            </Link>
            <a href="#services" className="btn btn-outline">
              Learn More
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="code-snippet">
            <div className="code-header">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <pre>{`public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}`}</pre>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
