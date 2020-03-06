import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { token$, updateToken } from '../store.js';

export class Auth extends Component {
  componentDidMount(){
    if(token$.value === null) {
      const string = window.location.hash;

      let array = string.split('=');
      let newString = array[1];
      let newArray = newString.split('&')
      let token = newArray[0]

      updateToken(token);
      this.forceUpdate();
    }
  }

  render() {
    if(token$.value) {
      return <Redirect to='/main'/>
    }

    return null;
  }
}

export default Auth;
