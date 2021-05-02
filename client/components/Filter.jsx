import React from 'react';
import { connect } from 'react-redux';

class Filter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this);
    const { onChange, handleClick, handleReset } = this.props;
    return (
      <section>
        <ul className="category-list">
          <label>Category</label>
          <li>
            {' '}
            Beanie
            <input
              className="filter-checkbox"
              type="checkbox"
              onChange={onChange}
              name="Beanie"
            ></input>
          </li>
          <li>
            {' '}
            Beret
            <input
              className="filter-checkbox"
              type="checkbox"
              onChange={onChange}
              name="Beret"
            ></input>
          </li>
          <li>
            {' '}
            Baseball Hat
            <input
              className="filter-checkbox"
              type="checkbox"
              onChange={onChange}
              name="Baseball Hat"
            ></input>
          </li>
          <li>
            {' '}
            Fedora
            <input
              className="filter-checkbox"
              type="checkbox"
              onChange={onChange}
              name="Fedora"
            ></input>
          </li>
          <li>
            {' '}
            Cowboy Hat
            <input
              className="filter-checkbox"
              type="checkbox"
              onChange={onChange}
              name="Cowboy Hat"
            ></input>
          </li>
          <li>
            {' '}
            Fez
            <input
              className="filter-checkbox"
              type="checkbox"
              onChange={onChange}
              name="Fez"
            ></input>
          </li>
          <li>
            {' '}
            Top Hat
            <input
              className="filter-checkbox"
              type="checkbox"
              onChange={onChange}
              name="Top Hat"
            ></input>
          </li>
          <li>
            {' '}
            other
            <input
              className="filter-checkbox"
              type="checkbox"
              onChange={onChange}
              name="Other"
            ></input>
          </li>
        </ul>
        <ul className="color-list">
          <label htmlFor="">Color</label>
          <li>
            {' '}
            Black
            <input
              className="filter-checkbox"
              type="checkbox"
              onChange={onChange}
              name="Black"
            ></input>
          </li>
          <li>
            {' '}
            Brown
            <input
              className="filter-checkbox"
              type="checkbox"
              onChange={onChange}
              name="Brown"
            ></input>
          </li>
          <li>
            {' '}
            Red
            <input
              className="filter-checkbox"
              type="checkbox"
              onChange={onChange}
              name="Red"
            ></input>
          </li>
          <li>
            {' '}
            Green
            <input
              className="filter-checkbox"
              type="checkbox"
              onChange={onChange}
              name="Green"
            ></input>
          </li>
          <li>
            {' '}
            Blue
            <input
              className="filter-checkbox"
              type="checkbox"
              onChange={onChange}
              name="Blue"
            ></input>
          </li>
          <li>
            {' '}
            Other
            <input
              className="filter-checkbox"
              type="checkbox"
              onChange={onChange}
              name="Other"
            ></input>
          </li>
        </ul>
        <button onClick={handleClick}>Apply Filters</button>
        <button onClick={handleReset}>Reset Filters</button>
      </section>
    );
  }
}

export default connect(null)(Filter);
