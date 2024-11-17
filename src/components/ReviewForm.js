import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getReview, createReview, updateReview } from '../services/api';

const ReviewForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reviewData, setReviewData] = useState({
    comment: '',
    rating: 0,
    projectId: '',
  });

  useEffect(() => {
    if (id) {
      getReview(id).then((response) => setReviewData(response.data));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateReview(id, reviewData);
      } else {
        await createReview(reviewData);
      }
      navigate('/reviews');
    } catch (error) {
      alert('Save failed: ' + error.message);
    }
  };

  return (
    <div>
      <h1>{id ? 'Edit Review' : 'New Review'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Comment:</label>
          <input type="text" name="comment" onChange={handleChange} value={reviewData.comment} required />
        </div>
        <div>
          <label>Rating:</label>
          <input type="number" name="rating" onChange={handleChange} value={reviewData.rating} required />
        </div>
        <div>
          <label>Project ID:</label>
          <input type="text" name="projectId" onChange={handleChange} value={reviewData.projectId} required />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ReviewForm;
