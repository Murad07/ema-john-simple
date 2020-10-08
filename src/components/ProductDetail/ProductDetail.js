import React from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import { useEffect, useState } from 'react';

const ProductDetail = () => {
  document.title = 'Product Detail';
  const { productKey } = useParams();
  const [loading, setLoadin] = useState(true);
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch('https://aqueous-mesa-21105.herokuapp.com/product/' + productKey)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoadin(false);
      });
  }, [productKey]);

  // const product = fakeData.find((pd) => pd.key === productKey);

  return (
    <div>
      Product {productKey} Details page
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Product showAddToCart={false} product={product}></Product>
      )}
    </div>
  );
};

export default ProductDetail;
