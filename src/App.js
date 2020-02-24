import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

//CSS.
import './App.css';
import './CSS/Main.css';
import './CSS/Login.css';
import './CSS/Content.css';
import './CSS/Header.css';
import './CSS/Menupanel.css';
import './CSS/Filepanel.css';

//Components.
import Main from './components/Main.js';
import Login from './components/Login.js';
import Auth from './components/Auth.js'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path='/login'>
          <Login/>
        </Route>
        <Route path='/auth'>
          <Auth />
        </Route>
        <Route exact path='/'>
          <Main/>
        </Route>
      </Router>
    );
  }
}

export default App;
