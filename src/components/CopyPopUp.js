import React from 'react';
import { Dropbox } from 'dropbox';
import { token$ } from '../store.js';

import FolderPicker from './FolderPicker.js';

class CopyPopUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = { token: token$.value, pathTo: null };

    this.confirmCopy = this.confirmCopy.bind(this);
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

  confirmCopy(e) {
    e.preventDefault();

    let dbx = new Dropbox({ fetch, accessToken: this.state.token });

    dbx.filesCopyV2({
      from_path: this.props.fileToCopy.path,
      to_path: this.state.pathTo + '/' + this.props.fileToCopy.name
    })
      .then(() => {
        this.props.onCopy();
      })
  }

  render() {
    return (
      <div className='popUpBackground'>
        <div className='popUpBoxMove'>
          <form onSubmit={ this.confirmCopy }>
            <label>Where do you want to copy:</label>
            <h2>{ this.props.fileToCopy.name }</h2>
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

export default CopyPopUp;
