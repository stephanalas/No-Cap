import React from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../store/storeComponents/getUsers';
import UserCard from './UserCard';
import './styles/AllUsers.css';

class AllUsers extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const { users } = this.props;
    if (users) {
      return (
        <div className="all-users-view">
          <ul className="all-users-ul">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </ul>
        </div>
      );
    }
    return '...Loading';
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => {
      dispatch(getUsers());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
