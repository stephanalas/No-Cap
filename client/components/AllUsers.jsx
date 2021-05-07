import React from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../store/storeComponents/getUsers';
import UserCard from './UserCard';
import './styles/AllUsers.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { StyledTableCell } from './utils/styledTableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class AllUsers extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const { users } = this.props;
    if (users) {
      return (
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>User</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Admin</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .filter((user) => user.role != 'Anonymous')
                .map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
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
