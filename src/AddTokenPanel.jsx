import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SwitchNetworkNotice from './SwitchNetworkNotice'
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import DownloadMetaMaskButton from './DownloadMetaMaskButton';
import Eth from 'ethjs-query';
import etherscanLink from 'etherscan-link';
import { Link } from 'react-router-dom'
import logo from './img/coin.jpg';
import queryString from 'querystringify'

const hercAddress = '0x6251583e7d997df3604bc73b9779196e94a090ce';

class AddTokenPanel extends Component {

  constructor (props) {
    const {
      tokenName = 'Hercules',
        tokenSymbol = 'HERC',
        tokenDecimals = 18,
        tokenAddress = hercAddress,
        tokenNet = '1',
        message = '',
        errorMessage = '',
        net = '1',
    } = props

    super()
    this.state = {
      tokenName,
      tokenSymbol,
      tokenDecimals,
      tokenAddress,
      tokenNet,
      message,
      errorMessage,
      net,
    }

    this.updateNet()
  }

  componentDidMount() {
    const search = this.props.location.search
    const params = queryString.parse(search)
    this.setState(params)
  }

  async updateNet () {
    const provider = window.web3.currentProvider
    const eth = new Eth(provider)
    const realNet = await eth.net_version()
    this.setState({ net: realNet })
  }

  render (props, context) {
    const {
      tokenName,
      tokenSymbol,
      tokenDecimals,
      tokenNet,
      net,
      tokenAddress,
      message,
      errorMessage,
    } = this.state

    let error
    if (errorMessage !== '') {
      error = <p className="errorMessage">
        There was a problem adding this token to your wallet. Make sure you have the latest version of MetaMask installed!
        <DownloadMetaMaskButton/>
      </p>
    }

    if (tokenNet !== net) {
      return <SwitchNetworkNotice net={net} tokenNet={tokenNet}/>
    }

    return (
      <div>
          <div className="App-title">Watch {tokenName}</div>
          <img className="hercImg" src={logo} alt="Download MetaMask"/>
      <div className="CoinInfoContainer"> 
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Symbol</TableCell>
              <TableCell>{tokenSymbol}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Decimals</TableCell>
              <TableCell>{tokenDecimals}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        </div>
        <div className="buttonRow">
        <div className="buttonPadding">
          <Button
            onClick={() => {
              const { tokenAddress, net } = this.state
              window.location.href = etherscanLink.createAccountLink(tokenAddress, net)
            }}
            href={etherscanLink.createAccountLink(tokenAddress, net)}
          >View on Etherscan</Button>
</div>
          <Button
            onClick = {async (event) => {
              const provider = window.web3.currentProvider
              provider.sendAsync({
                method: 'metamask_watchAsset',
                params: {
                  "type":"ERC20",
                  "options":{
                    "address": tokenAddress,
                    "symbol": tokenSymbol,
                    "decimals": tokenDecimals,
                  },
                },
                id: Math.round(Math.random() * 100000),
              }, (err, added) => {
                console.log('provider returned', err, added)
                if (err || 'error' in added) {
                  this.setState({
                    errorMessage: 'There was a problem adding the token.',
                    message: '',
                  })
                  return
                }
                this.setState({
                  message: 'Token added!',
                  errorMessage: '',
                })
              })
            }}
          >Watch in Wallet</Button>
         
         </div>
     

        <p>{message}</p>
        {error}
<div className="buttonStyling">
        <Link to="/edit">
          <Button>
            Add a new Address
          </Button>
        </Link>
        </div>
        <div className="App-footer"></div>
      </div>
    )
  }
}

AddTokenPanel.contextTypes = {
  web3: PropTypes.object,
}

export default AddTokenPanel;