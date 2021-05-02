import React from "react";
import { connect } from "react-redux";
import "./styles/SingleProduct.css";

class SingleProduct extends React.Component {
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
            <button>Add to Cart</button>
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
  };
};

export default connect(mapStateToProps)(SingleProduct);
// export default SingleProduct;
