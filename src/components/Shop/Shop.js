import React, { useState } from 'react';
import fakeDate from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';

const Shop = () => {
  const first10 = fakeDate.slice(0, 10);
  const [products, setProducts] = useState(first10);

  const [cart, setCart] = useState([]);
  const handleAddProduct = (product) => {
    console.log('Add Product', product);
    const newCart = [...cart, product];
    setCart(newCart);
  };

  return (
    <div className='shop-container'>
      <div className='product-container'>
        {products.map((product) => (
          <Product
            product={product}
            handleAddProduct={handleAddProduct}
          ></Product>
        ))}
      </div>
      <div className='cart-container'>
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
