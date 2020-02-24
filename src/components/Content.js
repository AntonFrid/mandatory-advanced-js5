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

    dbx.filesListFolder({ path: '' })
      .then(response => {
        console.log(response.entries);
        this.setState({ userFiles: response.entries })
      });
  }

  componentWillUnmount() {
    this.sub.unsubscribe();
  }

  renderTableData() {
    return this.state.userFiles.map((object , index) => {
      const { id, name } = object;
      const tag = object[".tag"];

      return (
        <tr key={ id }>
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
