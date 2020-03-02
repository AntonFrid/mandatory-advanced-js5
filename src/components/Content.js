import React from 'react';
import { Dropbox } from 'dropbox';
import { token$ } from '../store.js';

import DeletePopUp from './DeletePopUp.js';
import Dropdown from './Dropdown.js';

class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({ userFiles: [], token: token$.value, thumbnails: {}, fileToDelete: null });

    this.renderTableData = this.renderTableData.bind(this);
    this.onDeletePop = this.onDeletePop.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.closePopUp = this.closePopUp.bind(this);
  }

  componentDidMount() {
    let dbx = new Dropbox({ fetch, accessToken: this.state.token });

    this.sub = token$.subscribe((token) => this.setState({ token }));

    dbx.filesListFolder({ path: window.location.pathname.replace('/main', '') })
      .then(response => {
        this.getThumb(response.entries);
        this.setState({ userFiles: response.entries })
      });
  }

  componentDidUpdate(prevProps) {
    if(this.props.shouldIUpdate){
      let dbx = new Dropbox({ fetch, accessToken: this.state.token });

      dbx.filesListFolder({ path: window.location.pathname.replace('/main', '') })
        .then(response => {
          this.getThumb(response.entries);
          this.props.unUpdateContent();
          this.setState({ userFiles: response.entries })
        });
    }

    if(prevProps.path !== this.props.path){
      let dbx = new Dropbox({ fetch, accessToken: this.state.token });

      dbx.filesListFolder({ path: window.location.pathname.replace('/main', '') })
        .then(response => {
          this.getThumb(response.entries);
          this.setState({ userFiles: response.entries })
        });
    }
  }

  componentWillUnmount() {
    this.sub.unsubscribe();
  }

  onDeletePop(id, name, path) {
    this.setState({ fileToDelete: { id: id, name: name, path: path } });
  }

  onDelete(id) {
    this.setState({
      userFiles: this.state.userFiles.filter((file) => {
        return file.id !== id;
      }),
      fileToDelete: null
    })
  }

  closePopUp() {
    this.setState({ fileToDelete: null });
  }

  getThumb(files) {
    let dbx = new Dropbox({ fetch, accessToken: this.state.token });

    let pathArr = [];

    for (let i = 0; i < files.length; i++) {
      pathArr.push({ path: files[i].path_lower });
    }

    dbx.filesGetThumbnailBatch({ entries: pathArr })
      .then(res => {

        const th = {};

        res.entries
          .filter(x => x[".tag"] === "success")
          .forEach((entry) => {
            th[entry.metadata.id] = entry.thumbnail;
          });

        this.setState({ thumbnails: th });
      })
  }

  bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    if (bytes === 0) return '0 Byte';

    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
 }

  renderTableData() {
    return this.state.userFiles.map((object , index) => {
      const {
        id,
        name,
        path_lower,
        server_modified,
        size
      } = object;

      const tag = object[".tag"];

      return (
        <tr key={ id }>
          <td>{ this.state.thumbnails[id]
            ? <img alt='file' src={ 'data:image/jpg;base64,' + this.state.thumbnails[id] }/>
            : (tag !== 'folder' ? "file" : 'folder') }</td>
          <td onClick={ () => this.props.rowOnClick(path_lower, tag) }>{ name }</td>
          <td>{ server_modified ? server_modified.replace('T', ' ').replace('Z', ''): null }</td>
          <td>{ tag !== 'folder' ? this.bytesToSize(size): null }</td>
          <td><Dropdown
            fileAtt={ {
              id: id,
              path: path_lower,
              name: name
            } }
            onDelete={ () => this.onDeletePop(id, name, path_lower) }
          /></td>
        </tr>
      );
    });
  }


  render() {
    return (
      <div className='content'>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Modified</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            { this.renderTableData() }
          </tbody>
        </table>
        { this.state.fileToDelete !== null
          ? <DeletePopUp
              onDelete={ this.onDelete }
              fileToDelete={ this.state.fileToDelete }
              closePopUp={ this.closePopUp }/>
          : null
        }
      </div>
    );
  }
}

export default Content;
