// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Verification.css';

const Verification = () => {
  const [code, setCode] = useState(new Array(6).fill(''));
  const [status, setStatus] = useState(''); // '', 'success', 'error'
  const navigate = useNavigate();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newCode = [...code];
    newCode[index] = element.value;
    setCode(newCode);

    if (element.nextSibling && element.value !== '') {
      element.nextSibling.focus();
    }

    setStatus('');
  };

  const handleVerify = () => {
    const userCode = code.join('');
    console.log('Verifying code:', userCode);

    if (userCode === '123456') {
      setStatus('success');
      setTimeout(() => navigate('/new-password'), 1000);
    } else {
      setStatus('error');
    }
  };

  const isCodeComplete = code.every((char) => char !== '');

  return (
    <div className="verification-container">
      <div className="verification-box">
        <h2>Enter Verification Code</h2>
        <p>We&apos;ve sent a 6-digit code to your email or phone number.</p>

        <div className="code-inputs">
          {code.map((val, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={val}
              className={`code-box ${
                status === 'success' ? 'success' : ''
              } ${status === 'error' ? 'error' : ''}`}
              onChange={(e) => handleChange(e.target, index)}
              onFocus={(e) => e.target.select()}
            />
          ))}
        </div>

        <p className="resend-text">
          Didn&apos;t get the code? <Link to="/resend-code">Resend Code</Link>
        </p>

        <button
          className="verify-button"
          onClick={handleVerify}
          disabled={!isCodeComplete}
        >
          Verify Code
        </button>

        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>

        {status === 'error' && (
          <div className="popup error-popup">
            ❌ Wrong Code. Please try again.
          </div>
        )}
        {status === 'success' && (
          <div className="popup success-popup">✅ Code Verified Successfully!</div>
        )}
      </div>
    </div>
  );
};

export default Verification;
