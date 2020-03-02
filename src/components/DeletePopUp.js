import React from 'react';
import { Dropbox } from 'dropbox';
import { token$ } from '../store.js';

class DeletePopUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = { token: token$.value };

    this.confirmDelete = this.confirmDelete.bind(this);
  }

  componentDidMount() {
    this.sub = token$.subscribe((token) => this.setState({ token }));
  }

  componentWillUnmount() {
    this.sub.unsubscribe();
  }

  confirmDelete(e) {
    e.preventDefault();

    let dbx = new Dropbox({ fetch, accessToken: this.state.token });

    dbx.filesDeleteV2({ path: this.props.fileToDelete.path })
      .then(() => {
        this.props.onDelete(this.props.fileToDelete.id);
      })
  }

  render() {
    return (
      <div className='popUpBackground'>
        <div className='popUpBox'>
          <form onSubmit={ this.confirmDelete }>
            <label>Are you sure you want to delete:</label>
            <h2>{ this.props.fileToDelete.name }</h2>
            <div>
              <input type='submit' value='Proceed'/>
              <button onClick={ this.props.closePopUp }>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
}

export default DeletePopUp;
