import React from 'react';
import { Dropbox } from 'dropbox';
import { token$, toggleFavorite, removeFavorite, updateFavorite, starredArray$ } from '../store.js';

import DeletePopUp from './DeletePopUp.js';
import Dropdown from './Dropdown.js';
import MovePopUp from './MovePopUp.js';
import RenamePopUp from './RenamePopUp.js';
import CopyPopUp from './CopyPopUp.js';

class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      userFiles: [],
      token: token$.value,
      thumbnails: {},
      fileToDelete: null,
      fileToMove: null,
      fileToRename: null,
      fileToCopy: null,
      starredArray: starredArray$.value,
    });

    this.renderTableData = this.renderTableData.bind(this);
    this.onDeletePop = this.onDeletePop.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.closePopUp = this.closePopUp.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onRenamePop = this.onRenamePop.bind(this);
    this.onRename = this.onRename.bind(this);
    this.onCopyPop = this.onCopyPop.bind(this);
    this.onCopy = this.onCopy.bind(this);
  }

  componentDidMount() {

    this.subscriptions = [
      token$.subscribe((token) => this.setState({ token })),
      starredArray$.subscribe((starredArray) => this.setState({ starredArray })),
    ];

    this.getThumb(this.state.starredArray);

  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.starredArray !== prevState.starredArray){
      this.getThumb(this.state.starredArray);
    }

    if(prevProps.path !== this.props.path){
      this.getThumb(this.state.starredArray);
    }
  }

  componentWillUnmount() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
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

    removeFavorite(id);
    this.props.unUpdateContent(true);
    this.props.updateSearch(true);
  }

  onMove(id, file) {
    this.setState({ fileToMove: null });
    this.props.unUpdateContent(true);
    this.props.updateSearch(true);
    updateFavorite(file.metadata);
    this.props.checkIfUpdateStar(file.metadata);
  }

  onMovePop(id, name, path) {
    this.setState({ fileToMove: { id: id, name: name, path: path } });
  }

  onCopy() {
    this.setState({ fileToCopy: null });
    this.props.unUpdateContent(true);
    this.props.updateSearch(true);
  }

  onCopyPop(id, name, path) {
    this.setState({ fileToCopy: { id: id, name: name,  path: path } })
  }

  onRenamePop(id, name, path, tag) {
    this.setState({ fileToRename: {
      id: id,
      name: name,
      path: path,
      tag: tag
    } })
  }

  onRename(id, file) {
    this.setState({ fileToRename: null });
    this.props.unUpdateContent(true);
    this.props.updateSearch(true);
    updateFavorite(file.metadata);
    this.props.checkIfUpdateStar(file.metadata);
  }

  closePopUp() {
    this.setState({
      fileToDelete: null,
      fileToMove: null,
      fileToRename: null,
      fileToCopy: null
    });
  }

  getThumb(files) {
    let dbx = new Dropbox({ fetch, accessToken: this.state.token });

    let pathArr = [];

    for (let i = 0; i < files.length; i++) {
      pathArr.push({ path: files[i].path_lower, size: 'w32h32' });
    }

    dbx.filesGetThumbnailBatch({ entries: pathArr,  })
      .then(res => {
        const th = {};

        res.entries.filter(x => x[".tag"] === "success")
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
    return this.state.starredArray.map((object , index) => {
      const {
        id,
        name,
        path_lower,
        path_display
      } = object;

      const tag = object[".tag"];

      return (
        <tr key={ id }>
          <td onClick = {() => toggleFavorite(object)} style = {{fontSize: '18px', color: '#7289da'}}>
            {this.state.starredArray.find(x => x.id === object.id) ? "★" : "✩"}
          </td>
          <td>{ this.state.thumbnails[id]
            ? <img alt='file' src={ 'data:image/jpg;base64,' + this.state.thumbnails[id] }/>
            : (
                tag !== 'folder'
                ? <img src="/media/file-icon.svg" alt="icon" className="icon"/>
                : <img src="/media/folder-icon.svg" alt="icon" className="icon"/>
              )
          }</td>
          <td className='ellipsis' onClick={ () => this.props.rowOnClick(path_display, tag) }>{ name }</td>
          <td><Dropdown
            fileAtt={ {
              id: id,
              path: path_lower,
              name: name
            } }
            onDelete={ () => this.onDeletePop(id, name, path_lower) }
            onMove={ () => this.onMovePop(id, name, path_lower) }
            onRename={ () => this.onRenamePop(id, name, path_lower, tag) }
            onCopy={ () => this.onCopyPop(id, name, path_lower) }
          /></td>
        </tr>
      );
    });
  }


  render() {
    return (
      <div className='starredContent'>
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
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
        { this.state.fileToMove !== null
          ? <MovePopUp
              onMove={ this.onMove }
              fileToMove={ this.state.fileToMove }
              closePopUp={ this.closePopUp }/>
          : null
        }
        { this.state.fileToRename !== null
          ? <RenamePopUp
              onRename={ this.onRename }
              fileToRename={ this.state.fileToRename }
              closePopUp={ this.closePopUp }/>
          : null
        }
        { this.state.fileToCopy !== null
          ? <CopyPopUp
              onCopy={ this.onCopy }
              fileToCopy={ this.state.fileToCopy }
              closePopUp={ this.closePopUp }/>
          : null
        }
      </div>
    );
  }
}

export default Content;
