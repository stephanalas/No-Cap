/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint jsx-quotes: "off" */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadCart } from '../store/storeComponents/loadCart';
import './styles/ProductCard.css';
import InputCounter from './InputCounter';

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    };
    this.addClick = this.addClick.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  addClick(userID, productID, quantity) {
    this.props.loadCart(userID, productID, quantity);
  }
  increment() {
    this.setState({ quantity: this.state.quantity + 1 });
  }
  decrement() {
    if (this.state.quantity !== 1) {
      this.setState({ quantity: this.state.quantity - 1 });
    }
  }

  render() {
    const { product } = this.props;
    return (
      <div className="card">
        <figure>
          <img src={product.photo} alt="t-shirt" className="product-photo" />
        </figure>
        <section className="details">
          <div className="min-details">
            <h1>
              <Link to={`/Products/${product.id}`}>{product.name}</Link>
              <span>{product.color}</span>
            </h1>
            <h1 className="price">${product.price}</h1>
          </div>
          <InputCounter
            increment={this.increment}
            decrement={this.decrement}
            quantity={this.state.quantity}
          />
          <div
            href="#"
            className="btn"
            onClick={() =>
              this.addClick(this.props.user.id, product.id, this.state.quantity)
            }
          >
            add to cart
          </div>
        </section>
      </div>
      // <li key={product.id} className="product-card">
      //   <img src={product.photo} className="product-card-photo" alt="" />
      //   <section className="product-info">
      //     <Link to={`/Products/${product.id}`}>
      //       <h2>{product.name}</h2>
      //     </Link>
      //     <p>{product.price}</p>
      //     <InputCounter
      //       increment={this.increment}
      //       decrement={this.decrement}
      //       quantity={this.state.quantity}
      //     />
      //     <button
      //       type="button"
      //       onClick={() =>
      //         this.addClick(this.props.user.id, product.id, this.state.quantity)
      //       }
      //       // need to find a way to load after adding
      //     >
      //       Add to Cart
      //     </button>
      //   </section>
      // </li>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCart: (userId, productID, quantity) => {
      dispatch(loadCart(userId, productID, quantity));
    },
  };
};

export default connect((state) => state, mapDispatchToProps)(ProductCard);
