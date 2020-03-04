import React from 'react';
import { Dropbox } from 'dropbox';
import { token$ } from '../store.js';

class Filepanel extends React.Component {
  constructor(props) {
    super(props)

    this.state = ({
      token: token$.value,
      uploadFileValue: "",
      folderForm: "none",
      folderName: "",
      fileForm: "none",
    })

    this.uploadFile = this.uploadFile.bind(this);
    this.createNewFolder = this.createNewFolder.bind(this);
    this.onChange = this.onChange.bind(this);
    this.showForm = this.showForm.bind(this);
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

  uploadFile(e) {
    let dbx = new Dropbox({ fetch, accessToken: this.state.token });

    dbx.filesUpload({ path: this.props.path + "/" + e.target.files[0].name, contents: e.target.files[0] })
     .then(() => {
       this.props.updateContent();
     })
  }

  createNewFolder(e) {
    e.preventDefault();
    console.log(this.props.path);
    let dbx = new Dropbox({ fetch, accessToken: this.state.token });

    dbx.filesCreateFolderV2({ path: this.props.path + "/" + this.state.folderName })
      .then(() => {
        this.props.updateContent();
        this.setState({
          folderForm: "none",
          folderName: "",
         });
      })
  }

  showForm(e) {
    e.preventDefault();

    if (this.state.folderForm === "none") {
      this.setState({ folderForm: "block" });
    }else{
      this.setState({ folderForm: "none" });
    }
  }

  render() {
    return (
      <div className='filepanel'>
        <div className='preview-box'>
          <p>Preview</p>
        </div>
        <ul>
          <li>
            <form>
              <label htmlFor="uploadFileValue">Upload file</label>
              <input type="file" name="uploadFileValue" id="uploadFileValue" onChange={ this.uploadFile }/>
            </form>
          </li>
          <li onClick={ this.showForm }>Create new folder</li>
          <form className={ this.state.folderForm === "block" ? "uploadFormBlock" : "uploadFormNone" } onSubmit={ this.createNewFolder }>
            <input type="text" name="folderName" className="uploadInput" placeholder="Folder name..." value={ this.state.folderName } onChange={ this.onChange }/>
            <input type="submit" className="uploadSubmit"/>
          </form>
        </ul>
      </div>
    );
  }
}

export default Filepanel;
