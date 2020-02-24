import React, { Component } from 'react'

export class Auth extends Component {

   getToken = () => {
    const string = window.location.hash;
        let array = string.split('=');
        let newString = array[1];
        let newArray = newString.split('&')
        let token = newArray[0]
        
        console.log(array)
        console.log(newArray)
        console.log(token)
   }

   componentDidMount(){
       this.getToken()
   }

    render() {
        
        return (
            <div>
                <p>auth site</p>
            </div>
        )
    }
}

export default Auth
