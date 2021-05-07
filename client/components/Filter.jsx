import React from 'react';
import { connect } from 'react-redux';
import './styles/Filter.css';
import Search from './Search';
class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.hideFilter = this.hideFilter.bind(this);
  }
  hideFilter(ev) {
    console.dir(ev.target);
    const collapsibleBody = ev.target.nextSibling;
    if (collapsibleBody.className.includes('hide')) {
      collapsibleBody.className = collapsibleBody.className
        .split(' ')
        .filter((className) => className !== 'hide')
        .join(' ');
    } else {
      collapsibleBody.className = collapsibleBody.className + ' hide';
    }
  }
  render() {
    const { onChange } = this.props;
    return (
      <div className="col s12 m12 l3 filter-card">
        <Search products={this.props.products} search={this.props.search} />
        <ul className="collapsible">
          <li>
            <div
              className="collapsible-header active"
              onClick={this.hideFilter}
            >
              Category
            </div>
            <div className="collapsible-body filter-container">
              <ul>
                <li>
                  <input
                    type="checkbox"
                    name="Beanie"
                    className="event-type-filter filled-in"
                    defaultChecked={false}
                    onChange={onChange}
                  />
                  <label htmlFor="Beanie">Beanie</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="Beret"
                    className="event-type-filter  filled-in"
                    defaultChecked={false}
                    onChange={onChange}
                  />
                  <label htmlFor="Beret">Beret</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="Baseball Hat"
                    className="event-type-filter filled-in"
                    defaultChecked={false}
                    onChange={onChange}
                  />
                  <label htmlFor="Baseball Hat">Baseball Hat</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="Fedora"
                    className="event-type-filter filled-in"
                    defaultChecked={false}
                    onChange={onChange}
                  />
                  <label htmlFor="Fedora">Fedora</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="Cowboy Hat"
                    className="event-type-filter filled-in"
                    defaultChecked={false}
                    onChange={onChange}
                  />
                  <label htmlFor="Cowboy Hat">Cowboy Hat</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="Fex"
                    className="event-type-filter filled-in"
                    defaultChecked={false}
                    onChange={onChange}
                  />
                  <label htmlFor="Fez">Fez</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="Top Hat"
                    className="event-type-filter filled-in"
                    defaultChecked={false}
                    onChange={onChange}
                  />
                  <label htmlFor="Top Hat">Top Hat</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="Other"
                    className="event-type-filter filled-in"
                    defaultChecked={false}
                    onChange={onChange}
                  />
                  <label htmlFor="Other">Other</label>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div
              className="collapsible-header active"
              onClick={this.hideFilter}
            >
              Color
            </div>
            <div className="collapsible-body filter-container">
              <ul>
                <li>
                  <input
                    className="filter-checkbox color"
                    type="checkbox"
                    defaultChecked={false}
                    onChange={onChange}
                    name="Black"
                  />
                  <label htmlFor="Black">Black</label>
                </li>
                <li>
                  <input
                    className="filter-checkbox color"
                    type="checkbox"
                    defaultChecked={false}
                    onChange={onChange}
                    name="Brown"
                  />
                  <label htmlFor="Brown">Brown</label>
                </li>
                <li>
                  <input
                    className="filter-checkbox color"
                    type="checkbox"
                    defaultChecked={false}
                    onChange={onChange}
                    name="Red"
                  />
                  <label htmlFor="Red">Red</label>
                </li>
                <li>
                  <input
                    className="filter-checkbox color"
                    type="checkbox"
                    defaultChecked={false}
                    onChange={onChange}
                    name="Green"
                  />
                  <label htmlFor="Green">Green</label>
                </li>
                <li>
                  <input
                    className="filter-checkbox color"
                    type="checkbox"
                    defaultChecked={false}
                    onChange={onChange}
                    name="Blue"
                  />
                  <label htmlFor="Blue">Blue</label>
                </li>
                <li>
                  <input
                    className="filter-checkbox color"
                    type="checkbox"
                    defaultChecked={false}
                    onChange={onChange}
                    name="Other-color"
                  />
                  <label htmlFor="Other-color">Other</label>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div
              className="collapsible-header active"
              onClick={this.hideFilter}
            >
              Rating
            </div>
            <div className="collapsible-body filter-container">
              <ul>
                <li>
                  <input
                    className="filter-checkbox"
                    type="checkbox"
                    defaultChecked={false}
                    onChange={onChange}
                    name="5"
                  />
                  <label htmlFor="5">5 Stars</label>
                </li>
                <li>
                  <input
                    className="filter-checkbox"
                    type="checkbox"
                    defaultChecked={false}
                    onChange={onChange}
                    name="4"
                  />
                  <label htmlFor="4">{'4 Stars & Up'}</label>
                </li>
                <li>
                  <input
                    className="filter-checkbox"
                    type="checkbox"
                    defaultChecked={false}
                    onChange={onChange}
                    name="3"
                  />
                  <label htmlFor="3">{'3 Stars & Up'}</label>
                </li>
                <li>
                  <input
                    className="filter-checkbox"
                    type="checkbox"
                    defaultChecked={false}
                    onChange={onChange}
                    name="3"
                  />
                  <label htmlFor="3">{'3 Stars & Up'}</label>
                </li>
                <li>
                  <input
                    className="filter-checkbox"
                    type="checkbox"
                    defaultChecked={false}
                    onChange={onChange}
                    name="2"
                  />
                  <label htmlFor="2">{'2 Stars & Up'}</label>
                </li>
                <li>
                  <input
                    className="filter-checkbox"
                    type="checkbox"
                    defaultChecked={false}
                    onChange={onChange}
                    name="1"
                  />
                  <label htmlFor="1">{'1 Star & Up'}</label>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div
              className="collapsible-header active"
              onClick={this.hideFilter}
            >
              Price
            </div>
            <div className="collapsible-body filter-container">
              <ul>
                <li>
                  <input
                    className="filter-checkbox"
                    type="checkbox"
                    defaultChecked={false}
                    onChange={onChange}
                    name="0, 15"
                  />
                  <label htmlFor="0, 15">Under $15</label>
                </li>
                <li>
                  <input
                    className="filter-checkbox"
                    type="checkbox"
                    defaultChecked={false}
                    onChange={onChange}
                    name="15, 50"
                  />
                  <label htmlFor="15, 50">$15 to $50</label>
                </li>
                <li>
                  <input
                    className="filter-checkbox"
                    type="checkbox"
                    defaultChecked={false}
                    onChange={onChange}
                    name="50, null"
                  />
                  <label htmlFor="50, null">$50 & Above</label>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        {/* <button onClick={handleClick}>Apply Filters</button>
        <button onClick={handleReset}>Reset Filters</button> */}
      </div>
    );
  }
}

export default connect(null)(Filter);
