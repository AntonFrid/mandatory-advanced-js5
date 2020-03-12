import React, { Component } from 'react';
import { Dropbox } from 'dropbox';
//https://dellgang-dropbox.surge.sh/auth
export class Login extends Component {

  onClick() {
    const dbx = new Dropbox ({ fetch, clientId: 'nde773rwdsvw6mc' });

    const url = dbx.getAuthenticationUrl("https://dellgang-dropbox.surge.sh/auth");

    window.location.href = url;
  }

  render() {
    return (
      <div className='loginContainer'>
        <div className='card'>
          <h1 className='loginTitle'>Login</h1>
          <button onClick={ this.onClick } className='buttonStyle'></button>
        </div>
      </div>
    );
  }
}



export default Login
