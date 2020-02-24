import React, { Component } from 'react'
import {Dropbox} from 'dropbox'

export class Login extends Component {

    componentDidMount(){
      
    }

    onClick() {
        const dbx = new Dropbox ({
            clientId: 'nde773rwdsvw6mc'
        })

        const url = dbx.getAuthenticationUrl("http://localhost:3000/auth");

        window.location.href = url;
        console.log(url)
    }

    render() {

       
        return (
            <div className = 'loginContainer'>
                <div className = 'card'>
                    <h1 className = 'loginTitle'>
                        Login
                     </h1>
                    <button onClick={this.onClick} className = 'buttonStyle'>
                        </button>
                </div>
            </div>
        )
    }
}



export default Login
