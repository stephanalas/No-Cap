/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint jsx-quotes: "off" */
import React from 'react';
import { connect } from 'react-redux';
import './styles/UserCard.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { toggleRole } from '../store/storeComponents/toggleRole';
import {StyledTableCell, StyledTableRow} from './utils/styledTableCell';

class UserCard extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <StyledTableRow key={user.id}>
              <StyledTableCell component="th" scope="row">
              <AccountCircleIcon />
              {`${user.firstName} ${user.lastName}`}
              </StyledTableCell>
              <StyledTableCell align="justify">{user.email}</StyledTableCell>
              <StyledTableCell align="justify"><label htmlFor="Admin">Make User Admin</label>
           <input
            type="checkBox"
            id="Admin"
            defaultChecked={user.role === 'Admin' ? 'checked' : ''}
            onClick={() => this.props.toggleRole(user.id)}
           /></StyledTableCell>
            </StyledTableRow>
    )
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
