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
    let dbx = new Dropbox({ accessToken: 'bwP84gjlqOAAAAAAAAAAEK3IB_EBa0AGZq5VdP0BN5rifT3WKboTpWsN84c4VQBW' })

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
