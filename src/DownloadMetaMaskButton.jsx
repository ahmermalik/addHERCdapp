import React, { Component } from 'react';
import downloadButton from './download-metamask.png';

class DownloadMetaMaskButton extends Component {
  render() {
    return (
      <a href="https://herc.one/metamask">
        <img className="downloadButton" src={downloadButton} alt="Download MetaMask"/>
      </a>
    )
  }
}

export default DownloadMetaMaskButton

