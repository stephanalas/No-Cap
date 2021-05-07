// import React from 'react';
// import { connect } from 'react-redux';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import {StyledTableCell} from './utils/styledTableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';

// class AllOrders extends React.Component {
//   componentDidMount() {
    
//   }

//   render() {
    
//       return (
//         <TableContainer component={Paper}>
//       <Table aria-label="customized table">
//         <TableHead>
//           <TableRow>
//             <StyledTableCell>Order</StyledTableCell>
//             <StyledTableCell align="center">User</StyledTableCell>
//             <StyledTableCell align="center">Email</StyledTableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//         {users.filter((user)=>(user.role != 'Anonymous')).map((user) => (
//                <UserCard key={user.id} user={user} />
//         ))}    
//         </TableBody>
//       </Table>
//     </TableContainer>
//       );
//     }
// };
   

// // const mapStateToProps = (state) => {
// //   return {
// //     users: state.users,
// //   };
// // };

// // const mapDispatchToProps = (dispatch) => {
// //   return {
// //     getUsers: () => {
// //       dispatch(getUsers());
// //     },
// //   };
// // };

// export default connect(null, null)(AllOrders);
