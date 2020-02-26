import React from 'react';
import { Dropbox } from 'dropbox';
import { token$ } from '../store.js';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showMenu: false, token: token$.value };

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.onClickDownload = this.onClickDownload.bind(this);
  }

  componentDidMount() {
    this.sub = token$.subscribe((token) => this.setState({ token }));
  }

  componentWillUnmount() {
    this.sub.unsubscribe();
  }

  showMenu(e) {
    e.preventDefault();

    if(this.state.showMenu) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });
    }else{
      this.setState({ showMenu: true }, () => {
        document.addEventListener('click', this.closeMenu);
      });
    }
  }

  closeMenu() {
    this.setState({ showMenu: false }, () => {
    document.removeEventListener('click', this.closeMenu);
    });
  }

  onClickDownload() {
    let dbx = new Dropbox({ accessToken: this.state.token });

    dbx.filesDownload({ path: this.props.fileAtt.path });
  }

  onClickDelete() {
    let dbx = new Dropbox({ accessToken: this.state.token });

    dbx.filesDeleteV2({ path: this.props.fileAtt.path })
      .then(() => {
        this.props.onDelete(this.props.fileAtt.id);
      })
  }

  render() {
    return (
      <div className='dropdown'>
        <button onClick={ this.showMenu }>Show menu</button>
        { this.state.showMenu ? (
          <div className='dropdown-menu'>
            <button onClick={ this.onClickDownload }>Download</button>
            <button onClick={ this.onClickDelete }>Delete</button>
          </div>
          ): null
        }
      </div>
    );
  }
}

export default Dropdown;
