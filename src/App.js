import React, { useState, createContext, useEffect } from 'react';
import Header from './subComponents/Header';
import SignUp from './components/auth/SignUp';
import ConfirmEmail from './components/auth/ConfirmEmail';
import HomePage from './components/HomePage';
import NewActionPage from './components/NewAction';
import LogIn from './components/auth/LogIn';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import './index.css';

export const UserInfoContext = createContext({});

export default function App() {
  const [userInfo, setGlobalUserInfo] = useState({
    userId: '',
    email: '',
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    loadUserInfoFromLocalStorage();
  }, []);

  function saveUserInfoToLocalStorage(info) {
    localStorage.setItem('userInfo', JSON.stringify(info));
  }

  function loadUserInfoFromLocalStorage() {
    const savedUserInfo = localStorage.getItem('userInfo');
    if (savedUserInfo) {
      const userInfo = JSON.parse(savedUserInfo);
      setGlobalUserInfo(userInfo);
      setIsAuthenticated(true);
    }
  }

  function handleGlobalUserInfoChange(info) {
    setGlobalUserInfo(info);
    setIsAuthenticated(true);
    saveUserInfoToLocalStorage(info);
  }

  const SignUpRoute = (path) => {
    return (
      <Route
        path={path}
        element={<SignUp handleGlobalUserInfoChange={handleGlobalUserInfoChange} />}
      />
    );
  };

  return (
    <UserInfoContext.Provider value={userInfo}>
      <div>
        <Header />
        <BrowserRouter>
          <Routes>
            {isAuthenticated ? (
              <>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/new-action" element={<NewActionPage />} />
              </>
            ) : (
              SignUpRoute('/')
            )}
            {SignUpRoute('/signup')}
            <Route
              path="/login"
              element={<LogIn handleGlobalUserInfoChange={handleGlobalUserInfoChange} />}
            />
            <Route path="/confirm-email" element={<ConfirmEmail email={userInfo.email} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserInfoContext.Provider>
  );
}