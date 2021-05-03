/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint jsx-quotes: "off" */
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loadCart } from "../store/storeComponents/loadCart";
import "./styles/ProductCard.css";

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.addClick = this.addClick.bind(this);
  }

  addClick(userID, productID) {
    this.props.loadCart(userID, productID);
  }

  render() {
    const { product } = this.props;
    return (
      <li key={product.id} className="product-card">
        <img src={product.photo} className="product-card-photo" alt="" />
        <section className="product-info">
          <Link to={`/Products/${product.id}`}>
            <h2>{product.name}</h2>
          </Link>
          <p>{product.price}</p>
          <button
            type="button"
            onClick={() => this.addClick(this.props.user.id, product.id)}
            // need to find a way to load after adding
          >
            Add to Cart
          </button>
        </section>
      </li>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCart: (userId, productID) => {
      dispatch(loadCart(userId, productID));
    },
  };
};

export default connect((state) => state, mapDispatchToProps)(ProductCard);
