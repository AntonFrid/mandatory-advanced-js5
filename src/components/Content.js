import React from 'react';
import { Dropbox } from 'dropbox';
import { Router } from 'react-router-dom';

class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({ userFiles: [] });

    this.renderTableData = this.renderTableData.bind(this);
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

  componentDidMount() {
    let dbx = new Dropbox({ accessToken: 'bwP84gjlqOAAAAAAAAAAE1VcL8524F1y2jDhuCBb-pKbaqfpYD2OQMVfGLby6pS1' });

    dbx.filesListFolder({ path: '' })
      .then(response => {
        console.log(response.entries);
        this.setState({ userFiles: response.entries })
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
