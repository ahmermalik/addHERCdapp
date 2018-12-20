import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import queryString from 'querystringify'
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";


const schema = {
  title: "Address Details",
  properties: {
    tokenName: {type: "string", title: "Token Name", default: "My Token", required: true},
    tokenAddress: {type: "string", title: "Token Address", required: true},
    tokenSymbol: {type: "string", title: "Token Symbol", default: "TKN", required: true},
    tokenDecimals: {type: "number", title: "Token Decimals", default: 18, required: true},
    tokenNet: {type: "number", title: "Token Network ID", default: 1, required: true},

  }
};

const styles = theme => ({
  input: {
    color: "grey"
  }
});

class EditTokenPanel extends Component {

  constructor () {
    super()
    this.state = {}
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="my-form">
        <div className="App-title">Enter Address</div>

        <div className="form-content">
          { Object.keys(schema.properties).map((key) => {
            return (
              <div key={key}>
                <TextField
                  id={key}
                  required={schema.properties[key].required}
                  errormessage={this.state[key + 'Error']}
                  label={schema.properties[key].title}
                  margin="normal"
                  fullWidth
                  InputProps={{
                    className: classes.input
                  }}
                />
              </div>
            )
          }) }

          <Button onClick={this.visitForm}>
            Add Address To Watch List
          </Button>
        </div>
        <div className="App-footer"></div>
      </div>
    )
  }

  visitForm () {

    const opts = {}
    const keys = ['tokenName', 'tokenAddress', 'tokenNet', 'tokenSymbol', 'tokenDecimals']

    keys.forEach((key) => {
      const el = document.querySelector('#' + key)
      if (!el) return
      opts[key] = el.value
    })

    window.location.href = '/add?' + queryString.stringify(opts)
  }
}


export default withStyles(styles)(EditTokenPanel);

