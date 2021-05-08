import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { StyledTableCell } from './utils/styledTableCell';

class OrderCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fulfilled: this.props.order.status,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {}

  handleClick() {
    if (this.state.fulfilled === 'Processing') {
      this.setState({ fulfilled: 'Fulfilled' });
    } else if (this.state.fulfilled === 'Fulfilled') {
      this.setState({ fulfilled: 'Processing' });
    }
    console.log(this.state.fulfilled);
  }

  render() {
    console.log('in render', this.props);
    let fulfilledStatus = this.state.fulfilled;
    return (
      <div>
        <TableContainer>
          <Table>
            <TableHead>
              Current Order Status:{fulfilledStatus}
              {this.props.role === 'Admin' ? (
                <button
                  type='button'
                  onClick={() => {
                    this.handleClick();
                  }}
                >
                  Change Status
                </button>
              ) : (
                ''
              )}
            </TableHead>
            {this.props.role === 'Admin' ? (
              <TableHead>
                Customer Name: {this.props.order.firstName}{' '}
                {this.props.order.lastName}
              </TableHead>
            ) : (
              ''
            )}
            <TableHead>
              Items Ordered:{this.props.order.order_line_items.length}
            </TableHead>
            {this.props.order.order_line_items.map((item) => {
              return (
                <TableRow key={item.name}>
                  <StyledTableCell>
                    <img
                      src={item.photo}
                      alt={item.name}
                      width='100rem'
                      height='100rem'
                    />
                  </StyledTableCell>
                  <StyledTableCell>Product Name:{item.name}</StyledTableCell>
                  <StyledTableCell>
                    Product Unit Price:{item.unitPrice}
                  </StyledTableCell>
                  <StyledTableCell>
                    Quantity Ordered:{item.quantity}
                  </StyledTableCell>
                  <StyledTableCell>Subtotal:{item.subTotal}</StyledTableCell>
                  <StyledTableCell>
                    <a href={`/#/Products/${item.productId}`}>Product Link</a>
                  </StyledTableCell>
                </TableRow>
              );
            })}
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  Order Total:${this.props.order.total}
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  Order Date:{this.props.order.createdAt}{' '}
                </StyledTableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
        <hr></hr>
      </div>
    );
  }
}

export default OrderCard;
