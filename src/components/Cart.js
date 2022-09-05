import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { remove } from '../features/cartSlice';
import Navbar from './Navbar';

const Cart = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.cart);
    const handleRemove = (productId) => {
        dispatch(remove(productId));
    };

    return (
        <div>
            <Navbar/>
            <h3>Cart</h3>
            <div className="container" >
                {products.map((product) => (
                    <div key={product.id} className="mt-4" id='cartitem' style={{border:"3px solid pink",borderRaduis:"9px"}}>
                       <div id='cartimg'> 
                         <img src={product.image} alt="" /> 
                       </div>
                       <div id='cartspec'>
                        <h5>{product.title}</h5>
                        <h5>{product.price}</h5>
                        <button
                            className="btn btn-danger"
                            onClick={() => handleRemove(product.id)}> Remove </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cart;