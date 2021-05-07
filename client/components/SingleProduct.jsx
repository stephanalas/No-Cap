import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import ReactStars from 'react-rating-stars-component';
import { loadCart } from '../store/storeComponents/loadCart';
import { getUser } from '../store/storeComponents/getUser';
import { getProducts } from '../store/storeComponents/getProducts';
import Reviews from './Reviews';
import InputCounter from './InputCounter';
import './styles/SingleProduct.css';

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      rating: -1,
    };
    this.addClick = this.addClick.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.ratingChanged = this.ratingChanged.bind(this);
  }

  componentDidMount() {
    this.props.getUser();
    this.props.loadProducts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product !== this.props.product) {
      const rating = Math.round(this.props.product.rating / 0.5) * 0.5;
      this.setState({ rating });
    }
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

  onChange() {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  ratingChanged(newRating) {
    this.setState({ rating: newRating });
  }

  render() {
    const singleProduct = this.props.product;
    return singleProduct && this.state.rating !== -1 ? (
      <div id="one-product-container">
        <div className="product-box card">
          <img
            id="single-product-image"
            src={singleProduct.photo}
            alt="product"
          />
          <div className="product-text">
            <div>
              <div id="product-name">{singleProduct.name}</div>
              <div id="description">{singleProduct.description}</div>
            </div>
            <div id="reviews">
              <div>
                <span>{singleProduct.reviews.length} Reviews</span>
                <span>
                  <ReactStars
                    edit={false}
                    value={this.state.rating}
                    count={5}
                    onChange={this.ratingChanged}
                    size={24}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                  />
                </span>
              </div>
            </div>
            <div id="price">$ {singleProduct.price}</div>
            {/* <div>In Stock: <span>{singleProduct.inventory}</span></div> */}
            <div>
              <InputCounter
                increment={this.increment}
                decrement={this.decrement}
                quantity={this.state.quantity}
              />
              <Button
                id="add-to-cart"
                variant="contained"
                onClick={() =>
                  this.addClick(
                    this.props.user.id,
                    singleProduct.id,
                    this.state.quantity
                  )
                }
                size="large"
                type="submit"
                color="primary"
                style={{ marginTop: '1rem' }}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
        <Reviews user={this.props.user} product={singleProduct} />
      </div>
    ) : (
      'Loading'
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    product: state.products.find((singleProduct) => {
      if (singleProduct.id === parseInt(ownProps.match.params.id)) {
        return singleProduct;
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
