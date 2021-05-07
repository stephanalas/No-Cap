import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
    this.props.search(this.state.input);
  }
  onSubmit(ev) {
    ev.preventDefault();
  }
  render() {
    return (
      <nav className="search-title-filter">
        <div className="nav-wrapper">
          <form onSubmit={this.onSubmit}>
            <div className="input-field">
              <input
                id="search"
                type="search"
                onChange={this.onChange}
                name="input"
                value={this.state.input}
              />
              <label htmlFor="input">
                <i className="fas fa-search"></i>
              </label>
              {/* <i className="material-icons">close</i> */}
            </div>
          </form>
        </div>
      </nav>
    );
  }
}

export default Search;
