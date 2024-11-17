import React, { useState, useEffect } from 'react';
import { fetchBids, withdrawBid } from '../services/api'; // Assumed API service

const ManageBids = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBids = async () => {
      try {
        const response = await fetchBids(); // Fetch bids from the API
        setBids(response.data);
      } catch (error) {
        setError('Failed to load bids.');
      } finally {
        setLoading(false);
      }
    };
    loadBids();
  }, []);

  const handleWithdraw = async (bidId) => {
    try {
      await withdrawBid(bidId); // API call to withdraw the bid
      setBids(bids.filter(bid => bid.id !== bidId)); // Remove bid from UI
    } catch (error) {
      alert('Failed to withdraw bid.');
    }
  };

  if (loading) return <p>Loading bids...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Manage Your Bids</h1>
      <ul>
        {bids.map(bid => (
          <li key={bid.id}>
            <p>Project: {bid.projectTitle}</p>
            <p>Bid Amount: {bid.amount}</p>
            <p>Status: {bid.status}</p>
            <button onClick={() => handleWithdraw(bid.id)}>Withdraw Bid</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageBids;
