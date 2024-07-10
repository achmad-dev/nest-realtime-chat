import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile';
import Chat from './components/Chat';
import Signup from './components/Signup';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const setAndStoreToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <Navigate to="/chat" />
            ) : (
              <Login setToken={setAndStoreToken} />
            )
          }
        />
        <Route
          path="/profile"
          element={token ? <Profile token={token} /> : <Navigate to="/" />}
        />
        <Route
          path="/chat"
          element={token ? <Chat token={token} /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={
            token ? (
              <Navigate to="/chat" />
            ) : (
              <Signup setToken={setAndStoreToken} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
