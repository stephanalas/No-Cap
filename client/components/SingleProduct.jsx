import React from 'react';
import { connect } from 'react-redux';
import { loadCart } from '../store/storeComponents/loadCart';
import { getUser } from '../store/storeComponents/getUser';
import { getProducts } from '../store/storeComponents/getProducts';
import Reviews from './Reviews';
import InputCounter from './InputCounter';
import './styles/SingleProduct.css';

class SingleProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
    };
    this.addClick = this.addClick.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  componentDidMount() {
    this.props.getUser();
    this.props.loadProducts();
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
    const singleProduct = this.props.product;
    return singleProduct ? (
      <div>
        <div className="product-pic-text">
          <img src={singleProduct.photo} alt="new" />
          <div className="product-text">
            <div>Product name: {singleProduct.name}</div>
            <div>Price: {singleProduct.price}</div>
            <div>Stock: {singleProduct.inventory}</div>
            <div>Product Description:{singleProduct.description}</div>
            <InputCounter
              increment={this.increment}
              decrement={this.decrement}
              quantity={this.state.quantity}
            />
            <button
              type="button"
              onClick={() =>
                this.addClick(
                  this.props.user.id,
                  singleProduct.id,
                  this.state.quantity
                )
              }
            >
              Add to Cart
            </button>
          </div>
        </div>
        <div className="rating">Rating: {singleProduct.rating}</div>
        <Reviews user={this.props.user} product={singleProduct} />
      </div>
    ) : (
      'Loading'
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    product: state.products.find((product) => {
      if (product.id === parseInt(ownProps.match.params.id)) {
        return product;
      }
    }),
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadCart: (userId, productID, quantity) => {
      dispatch(loadCart(userId, productID, quantity));
    },
    loadProducts: () => {
      dispatch(getProducts());
    },
    getUser: () => {
      dispatch(getUser());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
