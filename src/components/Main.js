import React from 'react';
import { Dropbox } from 'dropbox';
import { Router } from 'react-router-dom';

//Components.
import Content from './Content.js';
import Header from './Header.js';
import Filepanel from './Filepanel.js';
import Menupanel from './Menupanel.js';


class Main extends React.Component {
  render() {
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
