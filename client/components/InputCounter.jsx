
import React from "react";
import "./styles/InputCounter.css";
import { Button } from '@material-ui/core';

class InputCounter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="number">
        <Button
            variant='contained'
            type='submit'
            color='primary'
            style={{ height: '1.5rem' }}
            onClick={this.props.decrement}
          >
            -
          </Button>
        <input
          // defaultValue={this.props.quantity}
          readOnly
          className="inputCounter"
          type="text"
          value={this.props.quantity}
        />
        <Button
            variant='contained'
            type='submit'
            color='primary'
            style={{ height: '1.5rem'}}
            onClick={this.props.increment}
          >
            +
          </Button>
      </div>
    );
  }
  
}

export default InputCounter;
