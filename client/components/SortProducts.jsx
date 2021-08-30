import React from 'react';
import './styles/SortProducts.css';
import { Select, InputLabel } from '@material-ui/core';

const SortProducts = (props) => {
  return (
    <Select
      className="box"
      // placeholder="sort by..."
      onChange={props.handleSort}
      defaultValue="default"
    >
      <option value="lowest-price">Lowest Price</option>
      <option value="highest-price">Highest Price</option>
      {/* <option value="most-reviewed">Most Reviewed</option>
      <option value="higest-rating">Higest Rating</option> */}
      <option value="higest-rating">Highest Rating</option>
      <option value="mosted-reviewed">Most Reviewed</option>
      <option value="default" disabled>
        Sort by...
      </option>
    </Select>
  );
};

export default SortProducts;
