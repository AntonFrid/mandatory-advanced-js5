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

    this.state = ({ token: token$.value, path: '' });

    this.changePath = this.changePath.bind(this);
  }

  componentDidMount() {
    this.sub = token$.subscribe((token) => this.setState({ token }));
  }

  componentWillUnmount() {
    this.sub.unsubscribe();
  }

  changePath(path, tag) {
    console.log(path, tag);
    if(tag === 'folder') {
      this.setState({ path: path });
    }
  }

  render() {

    if(!this.state.token) {
      return <Redirect to='/'/>
    }

    return (
      <div className="Main">
        <Menupanel/>
        <div className='main-div'>
          <Header path={ this.state.path } homeOnClick={ this.changePath }/>
          <div className='inner-main-div'>
            <Content path={ this.state.path } rowOnClick={ this.changePath }/>
            <Filepanel/>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
