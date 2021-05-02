/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint jsx-quotes: "off" */
import React from 'react';
import { connect } from 'react-redux';
import './styles/UserCard.css';
import { toggleRole } from '../store/storeComponents/toggleRole';

class UserCard extends React.Component {
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
            onClick={() => this.props.toggleRole(user.id)}
          />
        </section>
      </li>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleRole: (id) => {
      return dispatch(toggleRole(id));
    },
  };
};

export default connect(null, mapDispatchToProps)(UserCard);
