import React, { Component } from 'react'

export class Login extends Component {
  render() {
    return (
      <div className='loginContainer'>
        <div className='card'>
          <h1>Login</h1>
          <form>
            <input type='text' placeholder='username'/>
            <input type='password' placeholder='password'/>
            <input type='submit' value='login'/>
          </form>
        </div>
      </div>
    )
  }
}



export default Login
