import React from 'react';
import { Dropbox } from 'dropbox';
import { token$ } from '../store.js';
import Dropdown from './Dropdown.js';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({ userFiles: [], token: token$.value });

    this.renderTableData = this.renderTableData.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    this.sub = token$.subscribe((token) => this.setState({ token }));

    let dbx = new Dropbox({ fetch, accessToken: this.state.token });

    dbx.filesSearch({ path: "", query: this.props.searchInput })
    .then((result) => {
      console.log(result.matches);
      this.setState({ userFiles: result.matches.map(x => x.metadata) });
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchInput !== prevProps.searchInput ) {
      let dbx = new Dropbox({ fetch, accessToken: this.state.token });

      dbx.filesSearch({ path: "", query: this.props.searchInput })
      .then((result) => {
        console.log(result.matches);
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

export default Search;
