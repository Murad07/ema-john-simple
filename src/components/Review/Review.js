import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  getDatabaseCart,
  removeFromDatabaseCart,
  processOrder,
} from '../../utilities/databaseManager';
import fakeData from './../../fakeData/index';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from './../Cart/Cart';
import happyImage from '../../images/giphy.gif';

const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderPlace, setOrderPlace] = useState(false);

  const handlePlaceOrder = () => {
    setCart([]);
    setOrderPlace(true);
    processOrder();
  };

  const removeProduct = (productKey) => {
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };

  useEffect(() => {
    //Cart
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    console.log(savedCart);
    const cartProducts = productKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = savedCart[key];
      return product;
    });
    setCart(cartProducts);
  }, []);

  let thankyou;
  if (orderPlace) {
    thankyou = <img src={happyImage} alt='' />;
  }
  return (
    <div className='twin-container'>
      <div className='product-container'>
        {cart.map((pd) => (
          <ReviewItem
            removeProduct={removeProduct}
            key={pd.key}
            product={pd}
          ></ReviewItem>
        ))}
        {thankyou}
      </div>
      <div className='cart-container'>
        <Cart cart={cart}>
          <button onClick={handlePlaceOrder} className='main-button'>
            Place Order
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
