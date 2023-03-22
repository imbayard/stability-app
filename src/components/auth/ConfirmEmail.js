import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { Navigate } from 'react-router-dom'
import './ConfirmEmail.css'

const ConfirmEmail = ({ email }) => {
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [redirect, setRedirect] = useState(false)

  const handleConfirmEmail = async (e) => {
    e.preventDefault();

    try {
      await Auth.confirmSignUp(email, code);
      setSuccessMessage('Email successfully confirmed. You can now sign in.');
      setErrorMessage('');
      setRedirect(true)
    } catch (error) {
      console.error('Error confirming email: ', error);
      setErrorMessage(error.message);
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h2>Confirm Email</h2>
      <form onSubmit={handleConfirmEmail}>
        <label htmlFor="email">
          Email: {email}
        </label>
        <label htmlFor="code">
          Confirmation Code:
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </label>
        <button type="submit">Confirm Email</button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      {redirect && (
        <Navigate
            to='/'
        />
      )}
    </div>
  );
};

export default ConfirmEmail;