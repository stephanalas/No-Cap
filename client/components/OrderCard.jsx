import React from 'react';
import './styles/OrderCard.css';

class OrderCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('in render', this.props);
    return (
      <div>
        <div>Current Order Status:{this.props.order.status}</div>
        <div>Items Ordered:{this.props.order.order_line_items.length}</div>
        {this.props.order.order_line_items.map((item) => {
          return (
            <div>
              <img src={item.photo} />
              <div>Product Name:{item.name}</div>
              <div>Product Unit Price:{item.unitPrice}</div>
              <div>Quantity Ordered:{item.quantity}</div>
              <div>Subtotal:{item.subTotal}</div>
              <div>
                <a href={`/#/Products/${item.productId}`}>Product Link</a>
              </div>
            </div>
          );
        })}
        <div>Order Total:${this.props.order.total}</div>
        <div>Order Date:{this.props.order.createdAt}</div>
      </div>
    );
  }
}

export default OrderCard;
