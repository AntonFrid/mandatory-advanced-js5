import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { token$ } from './store.js';

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
  constructor(props) {
    super(props);

    this.state = ({ token: token$.value });
  }

  componentDidMount() {
    this.sub = token$.subscribe((token) => this.setState({ token }));
  }

  componentWillUnmount() {
    this.sub.unsubscribe();
  }

  render() {
    return (
      <Router>
        <Route exact path='/'>
          { this.state.token ? <Main/>: <Login/> }
        </Route>
        <Route path='/auth'>
          <Auth />
        </Route>
        <Route exact path='/main'>
          <Main/>
        </Route>
      </Router>
    );
  }
}

export default App;
