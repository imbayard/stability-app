import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import NewActionPage from './components/NewAction';

ReactDOM.render(
  <React.StrictMode>
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/new-action" element={<NewActionPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);