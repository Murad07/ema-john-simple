import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  getDatabaseCart,
  removeFromDatabaseCart,
  processOrder,
} from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from './../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderPlace, setOrderPlace] = useState(false);
  const history = useHistory();
  const handleProceedCheckout = () => {
    // setCart([]);
    // setOrderPlace(true);
    // processOrder();

    history.push('/shipment');
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

    fetch('https://aqueous-mesa-21105.herokuapp.com/productsByKeys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productKeys),
    })
      .then((res) => res.json())
      .then((data) => setCart(data));
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
          <button onClick={handleProceedCheckout} className='main-button'>
            Proceed Checkout
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
