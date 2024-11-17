import React, { useState, useEffect } from 'react';
import { fetchBidsForProject } from '../services/api'; // Assumed API service

const ViewBids = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBids = async () => {
      try {
        const response = await fetchBidsForProject(); // Fetch bids for the client's projects
        setBids(response.data);
      } catch (error) {
        setError('Failed to load bids.');
      } finally {
        setLoading(false);
      }
    };
    loadBids();
  }, []);

  if (loading) return <p>Loading bids...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Bids on Your Projects</h1>
      <ul>
        {bids.map(bid => (
          <li key={bid.id}>
            <p>Freelancer: {bid.freelancerName}</p>
            <p>Bid Amount: {bid.amount}</p>
            <p>Status: {bid.status}</p>
            {/* Add actions like Accept or Reject here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewBids;
