import React from 'react';
import './styles/SortProducts.css';

const SortProducts = (props) => {
  return (
    <select class="box">
      <i class="fas fa-arrow-up"></i>
      <option>Price</option>
      <option>Tea</option>
      <option>Juice</option>
      <option selected>Most Revelvant</option>
    </select>
  );
};

export default SortProducts;
