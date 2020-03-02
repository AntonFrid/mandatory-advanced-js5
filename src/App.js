import React from 'react';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { token$ } from './store.js';

//CSS.
import './App.css';
import './CSS/Main.css';
import './CSS/Login.css';
import './CSS/Content.css';
import './CSS/Header.css';
import './CSS/Menupanel.css';
import './CSS/Filepanel.css';
import './CSS/Dropdown.css';
import './CSS/DeletePopUp.css';

//Components.
import Main from './components/Main.js';
import Login from './components/Login.js';
import Auth from './components/Auth.js'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({ token: token$.value, path: window.location.pathname.replace('/main', '') });

    this.changePath = this.changePath.bind(this);
  }

  componentDidMount() {
    this.sub = token$.subscribe((token) => this.setState({ token }));
  }

  componentWillUnmount() {
    this.sub.unsubscribe();
  }

  changePath(path) {
    this.setState({ path: path });
  }

  render() {
    return (
      <Router>
        { this.state.path !== '/auth' ? this.state.path !== '' ? <Redirect to={ '/main' + this.state.path }/>:
          <Redirect to='/main'/>: null }
        <Route exact path='/'>
          { this.state.token ? <Redirect to='/main'/>: <Login/> }
        </Route>
        <Route path='/auth'>
          <Auth />
        </Route>
        <Route path='/main'>
          <Main changePath={ this.changePath }/>
        </Route>
      </Router>
    );
  }
}

export default App;
