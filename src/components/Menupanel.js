import React from 'react';
import { Dropbox } from 'dropbox';
import { updateToken, token$, clearStorage } from '../store.js';

class Menupanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({ username: null, token: token$.value });
  }

  componentDidMount() {
    this.sub = token$.subscribe((token) => this.setState({ token }));

    const dbx = new Dropbox({ fetch, accessToken: this.state.token });

    dbx.usersGetCurrentAccount()
      .then(res => {
        this.setState({ username: res.name.display_name});
      });
  }

  componentWillUnmount() {
    this.sub.unsubscribe();
  }

  logOut(){
    updateToken(null);
    clearStorage()
  }

  render() {
    return (
      <div className='menupanel'>
        <img src="/media/icon_text.png" alt="logo" className="logo"/>
        <div className="menupanelBottom">
          <h3 className="mpUserName">{ this.state.username }</h3>
          <button className="logout-btn" onClick={ this.logOut }>Logout</button>
        </div>
      </div>
    );
  }
}

export default Menupanel;
