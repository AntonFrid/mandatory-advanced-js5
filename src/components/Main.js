import React from 'react';
import { Dropbox } from 'dropbox';
import { Router, Redirect } from 'react-router-dom';
import { token$ } from '../store.js';

//Components.
import Content from './Content.js';
import Header from './Header.js';
import Filepanel from './Filepanel.js';
import Menupanel from './Menupanel.js';


class Main extends React.Component {
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

    if(!this.state.token) {
      return <Redirect to='/'/>
    }

    return (
      <div className="Main">
        <Menupanel/>
        <div className='main-div'>
          <Header/>
          <div className='inner-main-div'>
            <Content/>
            <Filepanel/>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
