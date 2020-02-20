import React from 'react';
import './App.css';

import Main from './components/Main.js';
import Header from './components/Header.js';
import Filepanel from './components/Filepanel.js';
import Menupanel from './components/Menupanel.js';

function App() {
  return (
    <div className="App">
      <Menupanel/>
      <div className='main-div'>
        <Header/>
        <div className='inner-main-div'>
          <Main/>
          <Filepanel/>
        </div>
      </div>
    </div>
  );
}

export default App;
