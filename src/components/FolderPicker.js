import React from 'react';
import { Dropbox } from 'dropbox';
import { token$ } from '../store.js';

class FolderPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
      token: token$.value,
      folderArr: [{
        name: 'Home',
        path: '',
      }] }

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    let dbx = new Dropbox({ fetch, accessToken: this.state.token });

    this.sub = token$.subscribe((token) => this.setState({ token }));

    dbx.filesListFolder({ path: '' })
      .then(res => {
        this.getAllFolders(res.entries);
      });
  }

  componentWillUnmount() {
    this.sub.unsubscribe();
  }

  getAllFolders(entries) {
    if(entries.length === 0) return;

    for (let i = 0; i < entries.length; i++){

      if(entries[i][".tag"] === 'folder'){
        this.setState({ folderArr: this.state.folderArr.concat([{
          name: entries[i].name,
          path: entries[i].path_lower
        }]) })

        let dbx = new Dropbox({ fetch, accessToken: this.state.token });

        dbx.filesListFolder({ path: entries[i].path_lower })
          .then(res => {
            this.getAllFolders(res.entries);
          });
      }
    }
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

  onClick(path) {
    this.props.sendPathTo(path);
    this.refs.dropBtn.blur();
  }

  render() {
    return (
      <div className='dropdown'>
        <div className='drop-inner' style={{ display: "inline-block "}}>
          <button ref='dropBtn' onClick={ this.showMenu }><p>...</p></button>
          { this.state.showMenu ? (
            <div className='dropdown-menu'>
            { this.state.folderArr.map((folder, index) => {
              return <button
                onClick={ () => this.onClick(folder.path) }
                key={ 'folder-btn-' + index }>{ folder.name }</button>
            }) }
            </div>
            ): null
          }
        </div>
      </div>
    );
  }
}

export default FolderPicker;
