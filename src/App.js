import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import SignIn from './components/SignIn';
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
      <header className="App-header">
        <Landing />
        <SignIn />
        {isAuthenticated()
          ? <Navigate to="/main" />
          : <div></div>
        }
      </header>
    </div>
  );
}

export default App;
