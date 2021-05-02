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
        console.log(cart);
        return cart ? (
            <div>
                <div>
                    Cart 
                </div>
                <div id= "cart-list"> 
                {
                    cart.map(cartItem =>{
                        return (
                            <div className = "cart-item" key={cartItem.id}>
                                <img src={cartItem.product.photo}/>
                                <div className='cart-info'>
                                    <h3>{cartItem.product.name}</h3>
                                    <h3>Price: {cartItem.product.price}</h3>
                                    <h3>Quantity: {cartItem.quantity}</h3>
                                    <h3>Total: {cartItem.subTotal}</h3>
                                    <button id='delete' >Remove</button>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
               
            </div>
        ) : 
        (
            "Loading"
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
