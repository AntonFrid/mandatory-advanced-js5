import React from 'react';
import { Dropbox } from 'dropbox';
import { Router, Link } from 'react-router-dom';

class Menupanel extends React.Component {
  constructor(props){
    super(props)


  }

  logOut(){
    console.log("logged out");
    
  }

  render() {
    return (
      <div className='menupanel'>
        <img src="/media/icon_text.png" alt="logo" className="logo"/>
        <div className="menupanelBottom">
          <h3 className="mpUserName">USER</h3>
          <button className="logout-btn" onClick={this.logOut}>Logout</button>
        </div>
      </div>
    );
  }
}

export default Menupanel;
