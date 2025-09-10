import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ResendCode.css';

const ResendCode = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(''); // '', 'success', 'error'
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleResendCode = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }

    if (!isValidEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setStatus('');
    setMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, always succeed
      setStatus('success');
      setMessage('Verification code has been sent to your email');
      
      // Navigate back to verification page after success
      setTimeout(() => {
        navigate('/verification');
      }, 2000);
      
    } catch (error) {
      setStatus('error');
      setMessage('Failed to send verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="resend-container">
      <div className="resend-box">
        <h2>Resend Verification Code</h2>
        <p>Enter your email address and we'll send you a new verification code.</p>

        <form onSubmit={handleResendCode}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`email-input ${status === 'error' ? 'error' : ''}`}
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className="resend-button"
            disabled={isLoading || !email.trim()}
          >
            {isLoading ? 'Sending...' : 'Resend Code'}
          </button>
        </form>

        <div className="back-link">
          <Link to="/verification">← Back to Verification</Link>
        </div>

        {status === 'error' && (
          <div className="popup error-popup">
            ❌ {message}
          </div>
        )}
        {status === 'success' && (
          <div className="popup success-popup">
            ✅ {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResendCode;
