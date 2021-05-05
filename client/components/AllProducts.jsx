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

class AllProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filterOptions: {},
      filteredProducts: [],
    };
    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount() {
    this.props.loadProducts();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.products.length) {
      this.props.getUser();
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
    }
    const boolean = filterOptions[ev.target.name];

    this.setState({
      ...this.state,
      filterOptions: { ...filterOptions, [ev.target.name]: !boolean },
    });
  }

  handleClick(ev) {
    const { filterOptions } = this.state;
    // if the user had checkboxes clicked and then deselects every checkbox and hits apply filters it will set the state of products to all products
    if (Object.values(filterOptions).every((value) => value === false)[0]) {
      console.log(Object.values(filterOptions));
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
      <div className='all-products-view'>
        {/* We can add sort and filtering options in this component */}
        <Filter
          onChange={onChange}
          handleClick={handleClick}
          handleReset={handleReset}
        />
        <ul className='all-products-ul'>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addClick={this.addClick}
            />
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
    getUser: () => {
      dispatch(getUser());
    },
  };
};

export default connect((state) => state, mapDispatchToProps)(AllProducts);
