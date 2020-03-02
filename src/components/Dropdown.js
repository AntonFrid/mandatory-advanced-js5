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
    this.onClickMove = this.onClickMove.bind(this);
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
        this.refs.dropBtn.blur();
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
      this.refs.dropBtn.blur();
      document.removeEventListener('click', this.closeMenu);
    });
  }

  onClickDownload() {
    let dbx = new Dropbox({ fetch, accessToken: this.state.token });

    dbx.filesGetTemporaryLink({ path: this.props.fileAtt.path })
      .then((res) => {
        window.location.href = res.link;
      })

    this.refs.dropBtn.blur();
  }

  onClickDelete() {
    this.props.onDelete();
    this.refs.dropBtn.blur();
  }

  onClickMove() {
    this.props.onMove();
    this.refs.dropBtn.blur();
  }

  render() {
    return (
      <div className='dropdown'>
        <button ref='dropBtn' onClick={ this.showMenu }><p>...</p></button>
        { this.state.showMenu ? (
          <div className='dropdown-menu'>
            <button onClick={ this.onClickDownload }>Download</button>
            <button onClick={ this.onClickDelete }>Delete</button>
            <button onClick={ this.onClickMove }>Move</button>
          </div>
          ): null
        }
      </div>
    );
  }
}

export default Dropdown;
