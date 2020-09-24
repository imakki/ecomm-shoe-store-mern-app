import React from 'react';
import { Link } from 'react-router-dom';
import data from '../data';

const HomePage = () => {
  return (
    <ul className="products">
      {data.products.map((product) => {
        return (
          <li key={product._id}>
            <div className="product">
              <Link to={'/products/' + product._id}>
                <img src={product.image} alt="" className="product-image" />
              </Link>
              <div className="product-name">
                <Link to={'/products/' + product._id}>{product.name}</Link>
              </div>
              <div className="product-brand">{product.brand}</div>
              <div className="product-price">${product.price}</div>
              <div className="product-rating">
                {product.rating}stars ({product.numReviews} reviews)
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default HomePage;
