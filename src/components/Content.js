import React from 'react';
import { Dropbox } from 'dropbox';
import { token$ } from '../store.js';
import Dropdown from './Dropdown.js';

class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({ userFiles: [], token: token$.value });

    this.renderTableData = this.renderTableData.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    let dbx = new Dropbox({ fetch, accessToken: this.state.token });

    this.sub = token$.subscribe((token) => this.setState({ token }));

    dbx.filesListFolder({ path: window.location.pathname.replace('/main', '') })
      .then(response => {
        this.setState({ userFiles: response.entries })
      });
  }

  componentDidUpdate(prevProps) {
    if(prevProps.path !== this.props.path){
      let dbx = new Dropbox({ fetch, accessToken: this.state.token });

      dbx.filesListFolder({ path: window.location.pathname.replace('/main', '') })
        .then(response => {
          this.setState({ userFiles: response.entries })
        });
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

  renderTableData() {
    return this.state.userFiles.map((object , index) => {
      const { id, name, path_lower } = object;
      const tag = object[".tag"];
      console.log(path_lower);
      return (
        <tr key={ id }>
          <td>{ tag }</td>
          <td onClick={ () => this.props.rowOnClick(path_lower, tag) }>{ name }</td>
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

export default Content;
