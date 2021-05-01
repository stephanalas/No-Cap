import React from "react";
import { connect } from "react-redux";
import { getProducts } from "../store/storeComponents/getProducts";
import ProductCard from "./ProductCard";
import "./styles/AllProducts.css";

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.loadProducts();
  }
  render() {
    const { products } = this.props;
    return (
      <div className="all-products-view">
        {/* We can add sort and filtering options in this component */}
        <ul className="all-products-ul">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadProducts: () => {
      dispatch(getProducts());
    },
  };
};

export default connect((state) => state, mapDispatchToProps)(AllProducts);
