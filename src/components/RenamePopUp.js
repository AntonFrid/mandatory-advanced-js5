import React from 'react';
import { Dropbox } from 'dropbox';
import { token$ } from '../store.js';

class RenamePopUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: token$.value,
      newName: "",
      fileExt: ""
    };

    this.confirmRename = this.confirmRename.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.sub = token$.subscribe((token) => this.setState({ token }));
  }

  componentWillUnmount() {
    this.sub.unsubscribe();
  }

  onChange(e){
    let value = e.target.value;
    this.setState({
      ...this.state,
      [e.target.name]: value
    })
  }

  confirmRename(e) {
    e.preventDefault();
    let newPath = "";
    let newPathArr = this.props.fileToRename.path.split("/");
    newPathArr.pop();
    for (var i = 0; i < newPathArr.length; i++) {
      newPath += newPathArr[i];
      newPath += "/";
    }
    console.log(newPath);
    let dbx = new Dropbox({ fetch, accessToken: this.state.token });

    dbx.filesMoveV2({ from_path: this.props.fileToRename.path, to_path: newPath + this.state.newName })
      .then(() => {
        this.props.onRename(this.props.fileToRename.id);
      })
  }

  render() {
    return (
      <div className='popUpBackground'>
        <div className='popUpBox'>
          <form onSubmit={ this.confirmRename }>
            <h2>{ this.props.fileToRename.name }</h2>
            <label>New name:</label>
            <input type="text" name="newName" className="renameInput" value={ this.state.newName } onChange={ this.onChange } />
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

export default RenamePopUp;
