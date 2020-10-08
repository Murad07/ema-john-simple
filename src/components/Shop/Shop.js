import React, { useState } from 'react';
//import fakeDate from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import {
  addToDatabaseCart,
  getDatabaseCart,
} from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Shop = () => {
  document.title = 'Shop More';
  // const first10 = fakeDate.slice(0, 10);
  //const [products, setProducts] = useState(first10);

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');

  // useEffect(() => {
  //   fetch('https://aqueous-mesa-21105.herokuapp.com/products')
  //     .then((res) => res.json())
  //     .then((date) => setProducts(date));
  // }, []);

  useEffect(() => {
    fetch('https://aqueous-mesa-21105.herokuapp.com/products?search=' + search)
      // fetch('http://localhost:5000/products?search=' + search)
      .then((res) => res.json())
      .then((date) => setProducts(date));
  }, [search]);

  useEffect(() => {
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
  }, [products]);

  const handleAddProduct = (product) => {
    const toBeAddedKey = product.key;

    const sameProduct = cart.find((pd) => pd.key === toBeAddedKey);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== toBeAddedKey);
      newCart = [...others, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }

    setCart(newCart);
    addToDatabaseCart(product.key, count);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className='twin-container'>
      <div className='product-container'>
        <input type='text' onBlur={handleSearch} placeholder='Search...' />
        {products.length === 0 && <p>Loading...</p>}
        {products.map((product) => (
          <Product
            key={product.key}
            showAddToCart={true}
            product={product}
            handleAddProduct={handleAddProduct}
          ></Product>
        ))}
      </div>
      <div className='cart-container'>
        <Cart cart={cart}>
          <Link to='/review'>
            <button className='main-button'>Review Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
