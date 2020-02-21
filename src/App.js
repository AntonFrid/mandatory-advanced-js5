import React from 'react';
import { Router, Link } from 'react-router-dom';
import './App.css';
import './CSS/Main.css';
import './CSS/Header.css';
import './CSS/Filepanel.css';
import './CSS/Menupanel.css';

import Main from './components/Main.js';
import Login from './components/Login.js';
import Header from './components/Header.js';
import Filepanel from './components/Filepanel.js';
import Menupanel from './components/Menupanel.js';

function App() {
  return (
    <Router>
    <div className="App">
    <Route path='/login' exact >
          <Login />
        </Route>
        <Route path='/main'>
          <Main />
        </Route>
    </div>
    </Router>
  );
}

export default App;
