import React from 'react';

class Filepanel extends React.Component {
  render() {
    return (
      <div className='filepanel'>
        <div className='preview-box'>
          <p>Preview</p>
        </div>
        <ul>
          <li>Upload files</li>
          <li>Upload folder</li>
          <li>Create new folder</li>
          <li>Create new file</li>
        </ul>
      </div>
    );
  }
}

export default Filepanel;
