/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint jsx-quotes: "off" */

import React from 'react';
import { connect } from 'react-redux';
import './styles/Cart.css';
import {loadCart} from '../store/storeComponents/loadCart';

class Cart extends React.Component {
    
    constructor() {
        super();
        this.state = {
            cart: [],
            cartTotal: '',
        };
    }
    
    componentDidMount(){
        try{
            let userID = 1;
            this.props.loadCart(userID);
        }
        catch(err)
        {
            console.log(err);
        }
    }

    render(){
        const {cart} = this.props;
        console.log(cart, 'cart component cart')
        /*
        return (
            <div>
                <div>
                    <h1>Cart</h1>
                <div id= "cart-list"> 
                {
                    cartItems.map(lineItem =>{
                        return (
                            <div id = "line-item" key={lineItem.id}>       
                                <div className="line-info">
                                    <li>{lineItem.productName}</li>
                                    <li>{lineItem.quantity}</li>
                                    <li>{lineItem.price}</li>
                                    <li>{lineItem.subTotal}</li>
                                </div>
                            </div>
                        );
                    })
                }
                </div>
                    </div>
                </div>
        ); */
        return (
            <div>
                Cart
            </div>
        )
    }
}

const mapStateToProps = (state)=> {
    return state
    
} 

const mapDispatchToProps = (dispatch)=> {
    return{
        loadCart: (id)=> dispatch(loadCart(id)),
    }
}
//export default connect(null, mapDispatchToProps)(Cart)
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
