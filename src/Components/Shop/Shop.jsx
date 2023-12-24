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
    const handleAddTocart = (product) =>{
        // console.log(product)

        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id)
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