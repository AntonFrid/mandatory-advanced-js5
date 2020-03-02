import React from 'react';
import { Dropbox } from 'dropbox';
import { token$ } from '../store.js';

import FolderPicker from './FolderPicker.js';

class MovePopUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = { token: token$.value, pathTo: null };

    this.confirmMove = this.confirmMove.bind(this);
    this.setPathTo = this.setPathTo.bind(this);
  }

  componentDidMount() {
    this.sub = token$.subscribe((token) => this.setState({ token }));
  }

  componentWillUnmount() {
    this.sub.unsubscribe();
  }

  setPathTo(path) {
    this.setState({ pathTo: path })
  }

  confirmMove(e) {
    e.preventDefault();

    let dbx = new Dropbox({ fetch, accessToken: this.state.token });

    dbx.filesMoveV2({
      from_path: this.props.fileToMove.path,
      to_path: this.state.pathTo + '/' + this.props.fileToMove.name
    })
      .then(() => {
        this.props.onMove();
      })
  }

  render() {
    return (
      <div className='popUpBackground'>
        <div className='popUpBoxMove'>
          <form onSubmit={ this.confirmMove }>
            <label>Where do you want to move:</label>
            <h2>{ this.props.fileToMove.name }</h2>
            { console.log(this.state.pathTo) }
            <label>Destination: { this.state.pathTo !== null
              ? (this.state.pathTo === '' ? '/home': this.state.pathTo)
              : null
              }
            </label>
            <div className='folderPickerBox'>
              <label>Choose destination folder</label>
              <FolderPicker sendPathTo={ this.setPathTo }/>
            </div>
            <div className='formButtonsBox'>
              <input type='submit' value='Proceed'/>
              <button onClick={ this.props.closePopUp }>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
}

export default MovePopUp;
