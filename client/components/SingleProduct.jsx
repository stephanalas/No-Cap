import React from "react";
import { connect } from "react-redux";

class SingleProduct extends React.Component {
  constructor() {
    super();
  }

  render() {
    const singleProduct = {
      name: "Black Beanie",
      category: "Beanie",
      price: 15.99,
      inventory: 4,
      photo:
        "https://cdn-images.farfetch-contents.com/14/30/61/67/14306167_21200338_600.jpg",
      color: "Black",
      description: "Black Beanie with a Supreme logo on it.",
      rating: 4.2,
    };
    return (
      <div>
        <img src={singleProduct.photo} alt="new" />
        <div>Product name: {singleProduct.name}</div>
        <div>Product Image: {singleProduct.photo}</div>
        <div>Price: {singleProduct.price}</div>
        <div>Stock: {singleProduct.inventory}</div>
        <div>Product Description:{singleProduct.description}</div>
        <div>Rating: {singleProduct.rating}</div>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     product: state.products.find((product) => {
//       if (product.id === parseInt(window.location.hash.slice(11))) {
//         return product;
//       }
//     }),
//   };
// };
// export default connect(mapStateToProps)(SingleProduct);
export default SingleProduct;
