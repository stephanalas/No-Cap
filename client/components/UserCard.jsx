/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint jsx-quotes: "off" */
import React from 'react';
import { connect } from 'react-redux';
import './styles/UserCard.css';

class UserCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: '',
    };
    // this.changeRole = this.changeRole.bind(this);
  }

  // componentDidMount() {
  //   this.setState({ role: this.props.user.role });
  // }

  // changeRole() {
  //   this.state.role === 'Admin'
  //     ? (this.setState({ role: 'User' }) && user.role = 'User')
  //     : (this.setState({ role: 'Admin' }) && user.role = 'Admin');
  // }

  render() {
    const { user } = this.props;
    return (
      <li key={user.id} className="user-card">
        <section className="user-info">
          <h3>{`${user.firstName} ${user.lastName}`}</h3>
          <h4>{user.email}</h4>
          <label htmlFor="Admin">Make User Admin</label>
          <input
            type="checkBox"
            id="Admin"
            defaultChecked={user.role === 'Admin' ? 'checked' : ''}
            onClick={() => this.changeRole()}
          />
        </section>
      </li>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // toggleAdmin: dispatch(toggleAdmin())
  };
};

export default connect(null, mapDispatchToProps)(UserCard);
