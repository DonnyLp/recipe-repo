import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

const VerifiedApplication = () => {
  const [applicationText, setApplicationText] = useState('');
  const navigate = useNavigate();
  const username = 'currentUsername'; 

  const handleSubmit = async () => {
    try {
      await axios.post('/VerificationApplication', {
        username,
        application_text: applicationText
      });
      alert('Application submitted successfully!');
      navigate('/home');
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application.');
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Please review verification guidelines before submitting application.</h1>
      <textarea
        value={applicationText}
        onChange={(e) => setApplicationText(e.target.value)}
        placeholder="Please state any addional information that you would like to add to your application..."
        rows="10"
        cols="50"
        style={{ width: '100%', margin: '20px 0' }}
      />
      <div>
        <button onClick={() => navigate('/home')}>Back</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default VerifiedApplication;