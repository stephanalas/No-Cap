import React from 'react';
import { connect } from 'react-redux';

class Filter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onChange, handleClick, handleReset } = this.props;
    return (
      <section className="filter">
        <ul className="category-list">
          <label>Category</label>
          <li>
            {'Beanie'}
            <input
              className="filter-checkbox category"
              type="checkbox"
              defaultChecked={false}
              onChange={onChange}
              name="Beanie"
            ></input>
          </li>
          <li>
            {'Beret'}
            <input
              className="filter-checkbox category"
              type="checkbox"
              defaultChecked={false}
              onChange={onChange}
              name="Beret"
            ></input>
          </li>
          <li>
            {'Baseball Hat'}
            <input
              className="filter-checkbox category"
              type="checkbox"
              defaultChecked={false}
              onChange={onChange}
              name="Baseball Hat"
            ></input>
          </li>
          <li>
            {'Fedora'}
            <input
              className="filter-checkbox category"
              type="checkbox"
              defaultChecked={false}
              onChange={onChange}
              name="Fedora"
            ></input>
          </li>
          <li>
            {'Cowboy Hat'}
            <input
              className="filter-checkbox category"
              type="checkbox"
              defaultChecked={false}
              onChange={onChange}
              name="Cowboy Hat"
            ></input>
          </li>
          <li>
            {'Fez'}
            <input
              className="filter-checkbox category"
              type="checkbox"
              defaultChecked={false}
              onChange={onChange}
              name="Fez"
            ></input>
          </li>
          <li>
            {'Top Hat'}
            <input
              className="filter-checkbox category"
              type="checkbox"
              defaultChecked={false}
              onChange={onChange}
              name="Top Hat"
            ></input>
          </li>
          <li>
            {'Other'}
            <input
              className="filter-checkbox category"
              type="checkbox"
              defaultChecked={false}
              onChange={onChange}
              name="Other"
            ></input>
          </li>
        </ul>
        <ul className="color-list">
          <label htmlFor="">Color</label>
          <li>
            {'Black'}
            <input
              className="filter-checkbox color"
              type="checkbox"
              defaultChecked={false}
              onChange={onChange}
              name="Black"
            ></input>
          </li>
          <li>
            {'Brown'}
            <input
              className="filter-checkbox color"
              type="checkbox"
              defaultChecked={false}
              onChange={onChange}
              name="Brown"
            ></input>
          </li>
          <li>
            {'Red'}
            <input
              className="filter-checkbox color"
              type="checkbox"
              defaultChecked={false}
              onChange={onChange}
              name="Red"
            ></input>
          </li>
          <li>
            {'Green'}
            <input
              className="filter-checkbox color"
              type="checkbox"
              defaultChecked={false}
              onChange={onChange}
              name="Green"
            ></input>
          </li>
          <li>
            {'Blue'}
            <input
              className="filter-checkbox color"
              type="checkbox"
              defaultChecked={false}
              onChange={onChange}
              name="Blue"
            ></input>
          </li>
          <li>
            {'Other'}
            <input
              className="filter-checkbox color"
              type="checkbox"
              defaultChecked={false}
              onChange={onChange}
              name="Other-color"
            ></input>
          </li>
        </ul>
        <ul className="price-list">
          <label htmlFor="">Price</label>
          <li>
            {'Under $15'}
            <input
              className="filter-checkbox"
              type="checkbox"
              defaultChecked={false}
              onChange={onChange}
              name="0, 15"
            ></input>
          </li>
          <li>
            {'$15 to $50'}
            <input
              className="filter-checkbox"
              type="checkbox"
              defaultChecked={false}
              onChange={onChange}
              name="15, 50"
            ></input>
          </li>
          <li>
            {'$50 & Above'}
            <input
              className="filter-checkbox"
              type="checkbox"
              defaultChecked={false}
              onChange={onChange}
              name="50, null"
            ></input>
          </li>
        </ul>
        <ul className="ratings">
          <label htmlFor="">Rating</label>
          <li>
            {'5 Stars'}
            <input
              className="filter-checkbox"
              type="checkbox"
              defaultChecked={false}
              onChange={onChange}
              name="5"
            ></input>
          </li>
          <li>
            {'4 Stars & Above '}
            <input
              className="filter-checkbox"
              type="checkbox"
              defaultChecked={false}
              onChange={onChange}
              name="4"
            ></input>
          </li>
          <li>
            {'3 Stars & Above '}
            <input
              className="filter-checkbox"
              type="checkbox"
              defaultChecked={false}
              onChange={onChange}
              name="3"
            ></input>
          </li>
          <li>
            {'2 Stars & Above '}
            <input
              className="filter-checkbox"
              type="checkbox"
              defaultChecked={false}
              onChange={onChange}
              name="2"
            ></input>
          </li>
          <li>
            {'1 star & Below '}
            <input
              className="filter-checkbox"
              type="checkbox"
              defaultChecked={false}
              onChange={onChange}
              name={'1&Below'}
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
