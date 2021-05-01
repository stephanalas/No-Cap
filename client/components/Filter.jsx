import React from 'react';
import { connect } from 'react-redux';

class Filter extends React.Component {
  constructor() {
    super();
    this.state = {
      filterOptions: {},
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(ev) {
    const prevOptions = this.state.filterOptions;
    if (!prevOptions[ev.target.name]) {
      this.setState({
        filterOptions: { ...prevOptions, [ev.target.name]: true },
      });
    } else {
      this.setState({
        filterOptions: {
          ...prevOptions,
          [ev.target.name]: !prevOptions[ev.target.name],
        },
      });
    }
    console.log(this.state);
  }
  handleClick(ev) {}
  render() {
    const onChange = this.onChange;
    return (
      <section>
        <ul>
          <label>Category</label>
          <li>
            {' '}
            Beanie
            <input type="checkbox" onChange={onChange} name="beanie"></input>
          </li>
          <li>
            {' '}
            Beret
            <input type="checkbox" onChange={onChange} name="beret"></input>
          </li>
          <li>
            {' '}
            Baseball Hat
            <input
              type="checkbox"
              onChange={onChange}
              name="baseballHat"
            ></input>
          </li>
          <li>
            {' '}
            Fedora
            <input type="checkbox" onChange={onChange} name="fedora"></input>
          </li>
          <li>
            {' '}
            Cowboy Hat
            <input type="checkbox" onChange={onChange} name="cowboyHat"></input>
          </li>
          <li>
            {' '}
            Fez
            <input type="checkbox" onChange={onChange} name="fez"></input>
          </li>
          <li>
            {' '}
            Top Hat
            <input type="checkbox" onChange={onChange} name="topHat"></input>
          </li>
          <li>
            {' '}
            other
            <input type="checkbox" onChange={onChange} name="other"></input>
          </li>
        </ul>
        <ul>
          <label htmlFor="">Color</label>
          <li>
            {' '}
            Black
            <input type="checkbox" onChange={onChange} name="black"></input>
          </li>
          <li>
            {' '}
            Brown
            <input type="checkbox" onChange={onChange} name="brown"></input>
          </li>
          <li>
            {' '}
            Red
            <input type="checkbox" onChange={onChange} name="red"></input>
          </li>
          <li>
            {' '}
            Green
            <input type="checkbox" onChange={onChange} name="green"></input>
          </li>
          <li>
            {' '}
            Blue
            <input type="checkbox" onChange={onChange} name="blue"></input>
          </li>
          <li>
            {' '}
            Other
            <input type="checkbox" onChange={onChange} name="other"></input>
          </li>
        </ul>
        <button>Apply Filter</button>
      </section>
    );
  }
}

export default connect(null)(Filter);
