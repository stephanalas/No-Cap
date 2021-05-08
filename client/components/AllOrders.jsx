import React from 'react';
import { connect } from 'react-redux';
import OrderCard from './OrderCard';
import { getAllOrders } from '../store/storeComponents/getAllOrders';

class AllOrders extends React.Component {
  componentDidMount() {
    console.log('in mount', this.props.orders);
    this.props.getAllOrders();
  }

  render() {
    const orders = this.props.orders;
    const role = this.props.user.role;
    console.log(orders);
    if (orders.length !== 0) {
      return orders.map((order) => {
        return <OrderCard key={order.id} order={order} role={role} />;
      });
    }
    return <div>No Orders Found</div>;
  }
}
const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
  return {
    getAllOrders: () => {
      dispatch(getAllOrders());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AllOrders);
