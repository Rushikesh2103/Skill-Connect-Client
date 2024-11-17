import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getReviews, deleteReview } from '../services/api';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews().then((response) => setReviews(response.data));
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteReview(id);
      setReviews(reviews.filter((review) => review.id !== id));
    } catch (error) {
      alert('Delete failed: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Reviews</h1>
      <Link to="/reviews/new">Add New Review</Link>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <Link to={`/reviews/${review.id}`}>{review.comment}</Link>
            <button onClick={() => handleDelete(review.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;
