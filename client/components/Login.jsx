/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint jsx-quotes: "off" */
import React from 'react';
import { connect } from 'react-redux';
import { createUser } from '../store/storeComponents/createUser';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  onSubmit(ev) {
    ev.preventDefault();
    const { email, password } = this.state;
    // thunk needed for submit
    this.props.createUser({ email, password });
  }

  render() {
    const { onChange, onSubmit } = this;
    const { email, password } = this.state;
    return (
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input value={email} onChange={onChange} name="email" />
        <label htmlFor="password">Password</label>
        <input value={password} onChange={onChange} name="password" />
        <button type="submit">Login In</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (user) => {
      dispatch(createUser(user));
    }
  }
}

export default connect(null, mapDispatchToProps)(Login);
