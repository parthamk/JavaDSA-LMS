import './Reviews.css'

const Reviews = () => {
  const reviews = [
    {
      name: 'Priya Sharma',
      role: 'Computer Science Student',
      avatar: 'PS',
      rating: 5,
      text: 'The DSA module helped me crack my placement interviews. Excellent explanations and practice problems!',
    },
    {
      name: 'Rahul Verma',
      role: 'Junior Developer',
      avatar: 'RV',
      rating: 5,
      text: 'Best free resource for learning Java. The structured approach makes complex concepts easy to understand.',
    },
    {
      name: 'Anita Desai',
      role: 'Self-Taught Developer',
      avatar: 'AD',
      rating: 5,
      text: 'The code playground is a game-changer. Being able to practice immediately after learning is invaluable.',
    },
  ]

  return (
    <section className="reviews">
      <div className="container">
        <h2>What Learners Say</h2>
        <p className="section-subtitle">Join thousands of satisfied learners</p>

        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <div key={index} className="review-card">
              <div className="review-header">
                <div className="avatar">{review.avatar}</div>
                <div className="reviewer-info">
                  <h4>{review.name}</h4>
                  <p className="role">{review.role}</p>
                </div>
              </div>
              <div className="rating">
                {'⭐'.repeat(review.rating)}
              </div>
              <p className="review-text">"{review.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Reviews
