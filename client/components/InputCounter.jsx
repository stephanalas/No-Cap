import React from 'react';
import './styles/InputCounter.css';

class InputCounter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="number">
        <span className="minus" onClick={this.props.decrement}>
          -
        </span>
        <input
          className="inputCounter"
          type="text"
          readOnly
          value={this.props.quantity}
        />
        <span className="plus" onClick={this.props.increment}>
          +
        </span>
      </div>
    );
  }
}

export default InputCounter;
