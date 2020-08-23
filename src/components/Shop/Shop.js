import React, { useState } from 'react';
import fakeDate from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';

const Shop = () => {
  const first10 = fakeDate.slice(0, 10);
  const [products, setProducts] = useState(first10);
  return (
    <div className='shop-container'>
      <div className='product-container'>
        {products.map((product) => (
          <Product product={product.name}></Product>
        ))}
      </div>
      <div className='cart-container'>
        <h2>This is cart</h2>
      </div>
    </div>
  );
};

export default Shop;
