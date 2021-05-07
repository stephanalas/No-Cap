import React from 'react';
import './styles/InputCounter.css';
import './styles/ProductCard.css';
class InputCounter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="number input-counter">
        <span className="minus" onClick={this.props.decrement}>
          -
        </span>
        <input
          // defaultValue={this.props.quantity}
          readOnly
          className="inputCounter"
          type="text"
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
