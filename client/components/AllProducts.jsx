import React from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../store/storeComponents/getProducts';
import { getUser } from '../store/storeComponents/getUser';
import ProductCard from './ProductCard';
import './styles/AllProducts.css';
import productFilter from './utils/productFilter';
import setFilters from './utils/setFilters';
import clearCheckboxes from './utils/clearCheckboxes';
import Filter from './Filter';
import SortProducts from './SortProducts';
import { InputLabel } from '@material-ui/core';

class AllProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filterOptions: {},
      filteredProducts: [],
      sortMethod: '',
    };
    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.search = this.search.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    this.props.loadProducts();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.products.length) {
      this.setState({
        ...this.state,
        filteredProducts: this.props.products,
        products: this.props.products,
      });
    }
  }
  onChange(ev) {
    const { filterOptions } = this.state;
    // sets filter option, if filterOptions[ev.target.name] exist then just toggles the value for that key
    if (!filterOptions[ev.target.name]) {
      this.setState({
        ...this.state,
        filterOptions: { ...filterOptions, [ev.target.name]: true },
      });
    } else {
      const boolean = filterOptions[ev.target.name];

      this.setState({
        ...this.state,
        filterOptions: { ...filterOptions, [ev.target.name]: !boolean },
      });
    }
  }
  handleSort(ev) {
    const sortMethod = ev.target.value;

    const { filteredProducts } = this.state;
    console.log(sortMethod);
    this.setState({ ...this.state, sortMethod });
    console.log('state sortMethod', this.state.sortMethod);
    let sortedProducts;
    if (sortMethod.indexOf('price')) {
      if (sortMethod.startsWith('l'))
        // ascending order
        sortedProducts = filteredProducts.sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
      // descending order
      else
        sortedProducts = filteredProducts.sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        );
    }
    // else {
    //   console.log('you');
    //   if (sortMethod.indexOf('most-reviewed')) {
    //     sortedProducts = filteredProducts.sort((a, b) => {
    //       console.log('yo');
    //       a.reviews.length - b.reviews.length;
    //     });
    //   } else if (sortMethod.indexOf('rating')) {
    //     sortedProducts = filteredProducts.sort((a, b) => a.rating - b.rating);
    //   } else {
    //     sortedProducts = filteredProducts;
    //   }
    // }
    this.setState({
      ...this.state,
      filteredProducts: sortedProducts,
    });
  }
  handleClick(ev) {
    const { filterOptions } = this.state;
    // if the user had checkboxes clicked and then deselects every checkbox and hits apply filters it will set the state of products to all products
    if (Object.values(filterOptions).every((value) => value === false)[0]) {
      this.setState({ ...this.state, products: this.props.products });
    } else {
      // sets the filters, returns an object in this format
      // {
      //  color: [...aBunchOfColors],
      //  category: [...AlotOfCategories],
      //  priceRange: [...PriceRanges]
      //  avgRating: [...AvgRating]
      // }             VVVVVVVV
      const filters = setFilters(filterOptions);

      // filters the products based on whats in the filters object
      const filteredProducts = productFilter(this.props.products, filters);

      this.setState({ ...this.state, filteredProducts });
    }
  }

  search(input) {
    if (!input.length) {
      console.log(this.props.products, 'called from search, no input length');
      this.setState({ ...this.state, filteredProducts: this.props.products });
    } else {
      const newProductsList = this.state.filteredProducts.filter((product) => {
        const category = product.category.toLowerCase();
        const color = product.color.toLowerCase();
        const name = product.name.toLowerCase().split(' ');
        if (
          category.indexOf(input) !== -1 ||
          color.indexOf(input) !== -1 ||
          name.includes(input)
        ) {
          return product;
        }
      });
      this.setState({ ...this.state, filteredProducts: newProductsList });
    }
  }
  handleReset() {
    const checkboxes = document.querySelectorAll('.filter-checkbox');

    clearCheckboxes(checkboxes);

    const { filterOptions } = this.state;
    // modifying filtersOptions to set each key to false
    for (let option in filterOptions) {
      filterOptions[option] = false;
    }

    this.setState({ filteredProducts: this.props.products, filterOptions });
  }

  render() {
    const { onChange, handleClick, handleReset } = this;
    const products = this.state.filteredProducts;
    return (
      <div className="all-products-view">
        <SortProducts handleSort={this.handleSort} />
        <div className="all-products-main">
          <Filter
            search={this.search}
            products={products}
            onChange={onChange}
            handleClick={handleClick}
            handleReset={handleReset}
          />
          <ul className="all-products-ul">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addClick={this.addClick}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadProducts: () => {
      dispatch(getProducts());
    },
    getUser: () => {
      dispatch(getUser());
    },
  };
};

export default connect((state) => state, mapDispatchToProps)(AllProducts);
