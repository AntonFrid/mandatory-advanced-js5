import React from 'react';
import { Dropbox } from 'dropbox';
import { token$ } from '../store.js';
import Dropdown from './Dropdown.js';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({ userFiles: [], token: token$.value, thumbnails: {} });

    this.renderTableData = this.renderTableData.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    this.sub = token$.subscribe((token) => this.setState({ token }));

    let dbx = new Dropbox({ fetch, accessToken: this.state.token });

    dbx.filesSearch({ path: "", query: this.props.searchInput })
    .then((result) => {
      this.getThumb(result.matches.map(x => x.metadata));
      this.setState({ userFiles: result.matches.map(x => x.metadata) });
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchInput !== prevProps.searchInput ) {
      let dbx = new Dropbox({ fetch, accessToken: this.state.token });

      dbx.filesSearch({ path: "", query: this.props.searchInput })
      .then((result) => {
        this.getThumb(result.matches.map(x => x.metadata));
        this.setState({ userFiles: result.matches.map(x => x.metadata) });
      })
    }
  }

  componentWillUnmount() {
    this.sub.unsubscribe();
  }

  onDelete(id) {
    this.setState({
      userFiles: this.state.userFiles.filter((file) => {
        return file.id !== id;
      })
    })
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
        size,
        server_modified
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
            onDelete={ this.onDelete }
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
      </div>
    );
  }
}

export default Search;
