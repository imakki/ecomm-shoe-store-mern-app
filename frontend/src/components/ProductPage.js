import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';

const ProductPage = (props) => {
  const history = useHistory();
  let { id } = useParams();
  const [quantity, setQuatinty] = useState(1);

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();

  const handleCartQuantity = (event) => {
    setQuatinty(event.target.value);
  };

  useEffect(() => {
    dispatch(detailsProduct(id));
  }, []);

  const handleAddToCart = () => {
    history.push(`/cart/${id}?qty=${quantity}`);
  };

  return (
    <div className="details">
      <div className="back-to-result">
        <Link to="/">Back to results</Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <div className="details-image">
            <img src={product.image} alt="img-product" />
          </div>
          <div className="details-info">
            <ul>
              <li>
                <h4>{product.name}</h4>
              </li>
              <li>
                {product.rating} Stars ({product.numReviews} Reviews)
              </li>
              <li>
                Price: <b>${product.price}</b>
              </li>
              <li>
                Description:
                <div>{product.description}</div>
              </li>
            </ul>
          </div>
          <div className="details-action">
            <ul>
              <li>Price: {product.price}</li>
              <li>
                Status: {product.countInStock > 0 ? 'In Stock' : 'out of stock'}
              </li>
              <li>
                Qty:{' '}
                <select value={quantity} onChange={handleCartQuantity}>
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </li>
              <li>
                {product.countInStock > 0 && (
                  <button
                    className="button button-primary"
                    onClick={handleAddToCart}
                  >
                    Add to cart
                  </button>
                )}
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductPage;
