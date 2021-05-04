import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../store/storeComponents/logoutUser';
import { Button } from '@material-ui/core';
import './styles/Login.css';

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
    return (
      <div>
        <h6>Are you sure?</h6>
        <Button
          variant='contained'
          type='submit'
          color='secondary'
          style={{ marginTop: '1rem' }}
          onClick={() => this.handleClick()}
        >
          Yes
        </Button>
        <Button
          variant='contained'
          type='submit'
          color='secondary'
          style={{ marginTop: '1rem' }}
          onClick={() => this.props.history.push('/Products')}
        >
          No
        </Button>
      </div>
    );
  }
}
const mapStateToProps = (_, ownProps) => {
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
