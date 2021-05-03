import React from "react";
import { connect } from "react-redux";
import { loadCart } from "../store/storeComponents/loadCart";
import "./styles/SingleProduct.css";

class SingleProduct extends React.Component {
  constructor() {
    super();
    this.addClick = this.addClick.bind(this);
  }

  addClick(userID, productID) {
    this.props.loadCart(userID, productID);
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
            <button
              type="button"
              onClick={() =>
                this.addClick(this.props.user.id, this.props.product.id)
              }
            >
              Add to Cart
            </button>
          </div>
        </div>
        <div className="rating">Rating: {singleProduct.rating}</div>
      </div>
    ) : (
      "Loading"
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
    loadCart: (userId, productID) => {
      dispatch(loadCart(userId, productID));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
// export default SingleProduct;
