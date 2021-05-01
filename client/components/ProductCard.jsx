/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint jsx-quotes: "off" */
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./styles/ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <li key={product.id} className="product-card">
      <img src={product.photo} className="product-card-photo" />
      <section className="product-info">
        <Link to={`/Products/${product.id}`}>
          <h2>{product.name}</h2>
        </Link>
        <p>{product.price}</p>
        <button>Add to Cart</button>
      </section>
    </li>
  );
};

export default connect(null)(ProductCard);
