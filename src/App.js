import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import Landing from './components/Landing';
import { isAuthenticated } from './services/Firebase';
import { Navigate } from 'react-router-dom';
function App() {
  useEffect(() => {
    console.log("Testing auth");
    console.log(isAuthenticated());
  });
  return (
    <div className="App">
      <Landing />
      {isAuthenticated()
        ? <Navigate to="/main" />
        : <div></div>
      }
    </div>
  );
}

export default App;
