import React from 'react';
import data from '../data';

const HomePage = () => {
  return (
    <ul className="products">
      {data.products.map((product) => {
        return (
          <li key={product.id}>
            <div className="product">
              <img src={product.image} alt="" className="product-image" />
              <div className="product-name">
                <a href="product.html">{product.name}</a>
              </div>
              <div className="product-brand">{product.brand}</div>
              <div className="product-price">${product.price}</div>
              <div className="product-rating">
                {product.rating}stars ({product.numReviews}reviews)
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default HomePage;
