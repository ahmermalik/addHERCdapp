import React, { Component } from 'react';
import downloadButton from './img/download-metamask.png';

class DownloadMetaMaskButton extends Component {
  render() {
    return (
      <div>
          <div className="App-title"></div>
          <div className="spacer">You need Metamask installed</div>
      <a href="https://herc.one/metamask">
        <img className="downloadButton" src={downloadButton} alt="Download MetaMask"/>
      </a>
      <div className="App-footer"></div>
      </div>
    )
  }
}

export default DownloadMetaMaskButton

