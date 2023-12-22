import React from 'react';
import './Cart.css';

const Cart = ({cart}) => {
console.log(cart);
let total = 0;
let shipping = 0;
for(const product of cart){
    total = total + product.price;
    shipping = shipping + product.shipping
}
const tax = (total * 0.1).toFixed(2);

    return (
        <div className='cart'>
             <h4>Order summary</h4>
                <p>Selected Item :{cart.length} </p>
                <p>Total price :${total} </p>
                <p>Total shipping :{shipping} </p>
                <p>Tax :{tax} </p>
                <h5>Grand total :</h5>
        </div>
    );
};

export default Cart;