import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getStoredCart } from '../../utilities/fakedb';


const Shop = () => {
    const [products, setProducts] = useState([]);

    const [cart, setCart] = useState([]);
    

    useEffect(()=>{
        
        fetch("products.json")
        .then(res => res.json())
        .then(data => {setProducts(data);
            
        })
    },[])

    useEffect(()=>{
        console.log('local storage first line', products)
        const storedCart = getStoredCart();
        const saveCart = [];
        for(const id in storedCart){
           const addedProduct = products.find(product=> product.id ===id);
           if(addedProduct){
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            saveCart.push(addedProduct);
           }
           
        }
        setCart(saveCart);
        // console.log('local storage finished')
    },[products])
    const handleAddTocart = (selectProduct) =>{
        let newCart = [];
        // console.log(product)
const exists = cart.find(product => product.id === selectProduct.id);
if(!exists){
    selectProduct.quantity = 1;
    newCart = [...cart, selectProduct];
}
else{
    const rest = cart.filter(product => product.id !== selectProduct.id);
    exists.quantity = exists.quantity + 1;
    newCart = [...rest, exists]
}
         
        setCart(newCart);
        addToDb(selectProduct.id)
    }
    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    products.map(product =>
                    <Product 
                    key={product.id}
                    product={product}
                    handleAddTocart ={handleAddTocart}
                        
                    ></Product>)
                }

            </div>
            <div className="cart-container">
               <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;