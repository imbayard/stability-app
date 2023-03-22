import React, { useState } from 'react'
import './SignUp.css'
import { Navigate } from 'react-router-dom'
import { notification, Spin } from 'antd'
import { PauseCircleOutlined } from '@ant-design/icons'
import { container } from '../../lib/container' 
import { createNewUser } from '../../lib/page-calls/sign-up-api'

export default function SignUp({
  handleGlobalUserInfoChange
}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [loading, setLoading] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [loginInstead, setLoginInstead] = useState(false)
  
    const schema = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/;

    const handlePasswordChange = (newPassword) => {
      setPassword(newPassword);
  
      if (!schema.test(newPassword)) {
        setPasswordError(
          <>
            <p>Password must be at least 8 characters long, contains at least one lowercase letter, at least one uppercase letter, at least one digit, at least one symbol, and has no spaces.</p>
          </>
        );
      } else {
        setPasswordError('');
      }
    };
  
    const handleConfirmPasswordChange = (newConfirmPassword) => {
      setConfirmPassword(newConfirmPassword);
  
      if (newConfirmPassword !== password) {
        setConfirmPasswordError(
          <>
            <p>Passwords do not match.</p>
          </>
        );
      } else {
        setConfirmPasswordError('');
      }
    };

    async function handleSubmit(event) {
        event.preventDefault()

        setLoading(true)

        if(passwordError || confirmPasswordError) {
          setLoading(false)
          notification.error({
            message: 'Error',
            description: 'Not meeting password requirements.',
            placement: 'topRight',
            duration: 5
          });
          return
        }

        container.auth.signUp({
          username: email,
          password
        }).then(async (response) => {
          const userId = response.userSub
          await createNewUser(email, userId)
          try {
            handleGlobalUserInfoChange({userId, email})
          } catch (e) {
            console.log(e)
          }

        }).then(async () => {
          console.log("Signed Up User!")
          notification.success({
            message: 'Succesfully signed up user!',
            description: 'Account created successfully, Redirecting you in a few!',
            placement: 'topRight',
            duration: 1.5,
            onClose: () => {
              setRedirect(true)
            }
          })
        })
        .catch(() => {
          notification.error({
            message: 'Error',
            description: 'Error signing up user',
            placement: 'topRight',
            duration: 1.5
          });
          setLoading(false)
        });
    }
  
    return (
        <div>        
            <form onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={(event) => handlePasswordChange(event.target.value)} required />
                {passwordError}
                <label htmlFor="confirm-password">Confirm Password</label>
                {confirmPasswordError}
                <input type="password" id="confirm-password" value={confirmPassword} onChange={(event) => handleConfirmPasswordChange(event.target.value)} required />
                <p onClick={() => setLoginInstead(true)} style={{cursor: 'pointer', textDecoration: 'underline', fontSize: 'small'}}>Log in instead</p>
                {password && confirmPassword && email ?
                    <button type="submit" value="Sign Up" onClick={(event) => handleSubmit(event)}>
                        {loading ? <Spin indicator={<PauseCircleOutlined spin />} /> : 'Register'}
                    </button>
                : <></> }

            </form>
            {redirect && (<Navigate to='/confirm-email' />)}
            {loginInstead && (<Navigate to='/login' />)}
        </div>
    );
}