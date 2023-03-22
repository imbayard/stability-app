import React, { useState } from 'react';
import './LogIn.css';
import { Navigate } from 'react-router-dom';
import { notification, Spin } from 'antd';
import { PauseCircleOutlined } from '@ant-design/icons';
import { container } from '../../lib/container';

export default function LogIn({ handleGlobalUserInfoChange }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [signUpInstead, setSignUpInstead] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);

    container.auth
      .signIn(email, password)
      .then((response) => {
        handleGlobalUserInfoChange({
          userId: response.attributes.sub,
          email: response.attributes.email,
        });
      })
      .then(() => {
        notification.success({
          message: 'Successfully logged in!',
          description: 'Redirecting you in a few moments.',
          placement: 'topRight',
          duration: 1.5,
          onClose: () => {
            setRedirect(true);
          },
        });
      })
      .catch(() => {
        notification.error({
          message: 'Error',
          description: 'Error logging in user',
          placement: 'topRight',
          duration: 1.5,
        });
        setLoading(false);
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Log In</h1>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <p
          onClick={() => setSignUpInstead(true)}
          style={{
            cursor: 'pointer',
            textDecoration: 'underline',
            fontSize: 'small',
          }}
        >
          Sign up instead
        </p>
        {password && email ? (
          <button
            type="submit"
            value="Log In"
            onClick={(event) => handleSubmit(event)}
          >
            {loading ? (
              <Spin indicator={<PauseCircleOutlined spin />} />
            ) : (
              'Log In'
            )}
          </button>
        ) : (
          <></>
        )}
      </form>
      {redirect && <Navigate to="/" />}
      {signUpInstead && <Navigate to="/signup" />}
    </div>
  );
}