import React from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../store/storeComponents/getProducts';
import ProductCard from './ProductCard';
import './styles/AllProducts.css';
import lodash from 'lodash';
class AllProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filterOptions: {},
    };
    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  componentDidMount() {
    this.props.loadProducts();
    // console.log(lodash.take);
  }
  componentDidUpdate(prevProps, prevState) {
    if (!prevState.products.length) {
      this.setState({ ...this.state, products: this.props.products });
    }
  }
  onChange(ev) {
    const { filterOptions } = this.state;
    if (!filterOptions[ev.target.name]) {
      this.setState({
        ...this.state,
        filterOptions: { ...filterOptions, [ev.target.name]: true },
      });
    } else {
      const boolean = this.state.filterOptions[ev.target.name];
      this.setState({
        ...this.state,
        filterOptions: { ...filterOptions, [ev.target.name]: !boolean },
      });
    }
  }

  handleClick(ev) {
    const colors = ['Black', 'Brown', 'Red', 'Green', 'Blue', 'Other'];
    // let filterWithColors = false;
    const { filterOptions } = this.state;
    if (Object.values(filterOptions).every((value) => value === false)) {
      this.setState({ ...this.state, products: this.props.products });
    } else {
      const filters = {
        color: [],
        category: [],
      };
      for (let key in filterOptions) {
        if (colors.includes(key) && filterOptions[key]) {
          filters.color.push(key);
        } else if (!colors.includes(key) && filterOptions[key]) {
          filters.category.push(key);
        }
      }
      const filteredProducts = this.props.products.filter((product) => {
        if (filters.color.length) {
          if (
            filters.color.includes(product.color) &&
            filters.category.includes(product.category)
          )
            return true;
          else return false;
        } else {
          if (filters.category.includes(product.category)) return true;
          else return false;
        }
      });
      this.setState({ ...this.state, products: filteredProducts });
    }
  }
  handleReset() {
    const checkboxes = document.querySelectorAll('.filter-checkbox');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    const { filterOptions } = this.state;
    for (let option in filterOptions) {
      filterOptions[option] = false;
    }
    this.setState({ products: this.props.products, filterOptions });
  }
  render() {
    const { onChange } = this;
    const { products } = this.state;
    return (
      <div className="all-products-view">
        {/* We can add sort and filtering options in this component */}
        <section>
          <ul className="category-list">
            <label>Category</label>
            <li>
              {' '}
              Beanie
              <input
                className="filter-checkbox"
                type="checkbox"
                onChange={onChange}
                name="Beanie"
              ></input>
            </li>
            <li>
              {' '}
              Beret
              <input
                className="filter-checkbox"
                type="checkbox"
                onChange={onChange}
                name="Beret"
              ></input>
            </li>
            <li>
              {' '}
              Baseball Hat
              <input
                className="filter-checkbox"
                type="checkbox"
                onChange={onChange}
                name="Baseball Hat"
              ></input>
            </li>
            <li>
              {' '}
              Fedora
              <input
                className="filter-checkbox"
                type="checkbox"
                onChange={onChange}
                name="Fedora"
              ></input>
            </li>
            <li>
              {' '}
              Cowboy Hat
              <input
                className="filter-checkbox"
                type="checkbox"
                onChange={onChange}
                name="Cowboy Hat"
              ></input>
            </li>
            <li>
              {' '}
              Fez
              <input
                className="filter-checkbox"
                type="checkbox"
                onChange={onChange}
                name="Fez"
              ></input>
            </li>
            <li>
              {' '}
              Top Hat
              <input
                className="filter-checkbox"
                type="checkbox"
                onChange={onChange}
                name="Top Hat"
              ></input>
            </li>
            <li>
              {' '}
              other
              <input
                className="filter-checkbox"
                type="checkbox"
                onChange={onChange}
                name="Other"
              ></input>
            </li>
          </ul>
          <ul className="color-list">
            <label htmlFor="">Color</label>
            <li>
              {' '}
              Black
              <input
                className="filter-checkbox"
                type="checkbox"
                onChange={onChange}
                name="Black"
              ></input>
            </li>
            <li>
              {' '}
              Brown
              <input
                className="filter-checkbox"
                type="checkbox"
                onChange={onChange}
                name="Brown"
              ></input>
            </li>
            <li>
              {' '}
              Red
              <input
                className="filter-checkbox"
                type="checkbox"
                onChange={onChange}
                name="Red"
              ></input>
            </li>
            <li>
              {' '}
              Green
              <input
                className="filter-checkbox"
                type="checkbox"
                onChange={onChange}
                name="Green"
              ></input>
            </li>
            <li>
              {' '}
              Blue
              <input
                className="filter-checkbox"
                type="checkbox"
                onChange={onChange}
                name="Blue"
              ></input>
            </li>
            <li>
              {' '}
              Other
              <input
                className="filter-checkbox"
                type="checkbox"
                onChange={onChange}
                name="Other"
              ></input>
            </li>
          </ul>
          <button onClick={this.handleClick}>Apply Filters</button>
          <button onClick={this.handleReset}>Reset Filters</button>
        </section>
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

export default connect((state) => {
  const { products } = state;
  return {
    products,
  };
}, mapDispatchToProps)(AllProducts);
