import React from 'react';
import { connect } from 'react-redux';
import OrderCard from './OrderCard';
import { getUserOrders } from '../store/storeComponents/getUserOrders';
import { getUser } from '../store/storeComponents/getUser';

class PastOrders extends React.Component {
  componentDidMount() {
    console.log('in mount', this.props.orders);
    this.props.getUserOrders(this.props.user.id);
  }

  render() {
    const orders = this.props.orders;
    if (orders.length !== 0) {
      return orders.map((order) => {
        return <OrderCard key={order.id} order={order} />;
      });
    }
    return <div>No Orders Found</div>;
  }
}
const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
  return {
    getUserOrders: (userID) => {
      dispatch(getUserOrders(userID));
    },
    getUser: () => {
      dispatch(getUser());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PastOrders);
