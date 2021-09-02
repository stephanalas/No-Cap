import React from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../store/storeComponents/getProducts';
import { getUser } from '../store/storeComponents/getUser';
import ProductCard from './ProductCard';
import './styles/AllProducts.css';
import clearCheckboxes from './utils/clearCheckboxes';
import Filter from './Filter';
import SortProducts from './SortProducts';
import axios from 'axios';

class AllProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filterOptions: {
        category: [],
        color: [],
        rating: [],
        range: [],
      },
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
  // handles filter component checkboxes
  onChange(ev) {
    const index = ev.target.name.indexOf('-');
    const optionCategory = ev.target.name.slice(0, index);
    let option = ev.target.name.slice(index + 1);
    const filterOptions = this.state.filterOptions;
    const getPriceRange = (targetName) => {
      return targetName
        .slice(index + 1)
        .split(', ')
        .map((int) => {
          console.log(int);
          if (isNaN(parseInt(int))) return null;
          else return parseInt(int);
        });
    };

    if (option.includes(',')) option = getPriceRange(ev.target.name);

    // toggled on
    if (ev.target.checked) {
      // if the index is found then we aren't dealing with price range options

      filterOptions[optionCategory].push(option);
      this.setState({
        filterOptions,
      });
    } else {
      // toggled off
      if (optionCategory === 'range') {
        const updatedRange = filterOptions[optionCategory].filter(
          (val) => val[0] !== option[0] && val[1] !== option[1]
        );
        this.setState({
          filterOptions: {
            ...filterOptions,
            range: updatedRange,
          },
        });
      } else {
        const updatedFilterOptions = filterOptions[optionCategory].filter(
          (opt) => opt !== option
        );
        this.setState({
          filterOptions: {
            ...filterOptions,
            [optionCategory]: updatedFilterOptions,
          },
        });
      }
    }
  }
  async handleSort(ev) {
    try {
      if (ev.target.value !== 'default') {
        console.log(ev.target.value);
        const response = await axios.post('/api/products/sorted', {
          sortBy: ev.target.value,
        });
        this.setState({ filteredProducts: response.data });
      }
    } catch (error) {
      console.log(error);
    }
  }
  async handleClick(ev) {
    try {
      const filterOptions = this.state.filterOptions;
      const response = await axios.post('/api/products/filtered', {
        filterOptions,
      });
      this.setState({ filteredProducts: response.data });
    } catch (error) {
      console.log(error);
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
