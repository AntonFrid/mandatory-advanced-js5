import React, { Component } from 'react'
import './CSS/Login.css';

export class Login extends Component {
    render() {
        return (
            <div className = 'loginContainer'>
                <div className = 'card'>
                    <h1>Login</h1>
                    <form>
                        <input  type = 'text' placeholder= 'username'></input>
                        <input  type = 'password' placeholder = 'password'></input>
                    </form>
                </div>
            </div>
        )
    }
}



export default Login
