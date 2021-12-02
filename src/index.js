import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MainPage from './components/MainPage';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserInfo from './components/UserInfo';
import SearchSwipe from './components/SearchSwipe';
import UserProfile from './components/UserProfile';
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="main" element={<MainPage />} />
      <Route path="profile" element={<UserInfo />} />
      <Route path="search" element={<SearchSwipe />} />
      <Route path="userProfile/:id" element={<UserProfile />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
