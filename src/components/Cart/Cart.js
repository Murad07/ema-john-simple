import React from 'react';

const Cart = (props) => {
  const cart = props.cart;
  const total = cart.reduce(
    (total, prd) => total + prd.price * prd.quantity || 1,
    0
  );

  let formatNumber = (num) => {
    const precision = num.toFixed(2);
    return Number(precision);
  };

  let shipping = 0;
  if (total > 35) {
    shipping = 0;
  } else if (total > 15) {
    shipping = 4.99;
  } else if (total > 0) {
    shipping = 12.99;
  }

  let tax = (total / 10).toFixed(2);
  const grandTotal = formatNumber(total + shipping + Number(tax));

  return (
    <div>
      <h3>Order Summery</h3>
      <p>Items Ordered: {cart.length}</p>
      <p>Product Price: {formatNumber(total)}</p>
      <p>
        <small>Shipping: {shipping}</small>
      </p>
      <p>
        <small>Tax: {tax}</small>
      </p>
      <p>Total Price: {grandTotal}</p>
      <hr />
      {props.children}
    </div>
  );
};

export default Cart;
