import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../store/storeComponents/logoutUser';

class Logout extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    window.localStorage.clear();
    this.props.logout();
    this.props.history.push('/');
    window.location.reload();
  }

  render() {
    //thunk needed to update User to blank object in state and remove local storage token
    //then redirect to landing page

    return (
      <div>
        <h2>Are you sure?</h2>
        <button type='submit' onClick={() => this.handleClick()}>
          YES
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return { ownProps };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logoutUser());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Logout);
