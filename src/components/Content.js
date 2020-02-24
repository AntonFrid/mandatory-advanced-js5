import React from 'react';
import { Dropbox } from 'dropbox';
import { Router } from 'react-router-dom';
import { token$ } from '../store.js';

class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({ userFiles: [], token: token$.value });

    this.renderTableData = this.renderTableData.bind(this);
  }

  componentDidMount() {
    let dbx = new Dropbox({ accessToken: this.state.token });

    this.sub = token$.subscribe((token) => this.setState({ token }));

    dbx.filesListFolder({ path: this.props.path })
      .then(response => {
        this.setState({ userFiles: response.entries })
      });
  }

  componentDidUpdate(prevProps) {
    if(prevProps.path !== this.props.path){
      let dbx = new Dropbox({ accessToken: this.state.token });

      dbx.filesListFolder({ path: this.props.path })
        .then(response => {
          this.setState({ userFiles: response.entries })
        });
    }
  }

  componentWillUnmount() {
    this.sub.unsubscribe();
  }

  renderTableData() {
    return this.state.userFiles.map((object , index) => {
      const { id, name, path_lower } = object;
      const tag = object[".tag"];

      return (
        <tr key={ id } onClick={ () => this.props.rowOnClick(path_lower, tag) }>
          <td>{ tag }</td>
          <td>{ name }</td>
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
