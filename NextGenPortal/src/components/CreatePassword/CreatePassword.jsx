import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './CreatePassword.css';

const CreatePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    if (!newPassword || !confirmPassword) {
      setError('Please fill in both fields.');
      return false;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    setError('');
    return true;
  };

  const handleConfirm = () => {
    console.log('Confirm button clicked');
    if (validate()) {
      console.log('Validation passed, navigating...');
      navigate('/password-success');
    } else {
      console.log('Validation failed');
    }
  };

  return (
    <div className="password-container">
      <div className="password-box">
        <h2>Create New Password</h2>
        <p>Set a strong password you can remember.</p>
        <input
          type="password"
          placeholder="Enter New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Re-Enter New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}

        <button
          type="button"
          className="confirm-password-button"
          onClick={handleConfirm}
        >
          Confirm Password
        </button>

        <Link to="/" className="back-button">
          ← Back
        </Link>
      </div>
    </div>
  );
};

export default CreatePassword;
