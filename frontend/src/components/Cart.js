import React, { useEffect } from 'react';
import { useHistory, useParams, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';

const Cart = () => {
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  let { id } = useParams();
  let location = useLocation();
  const dispatch = useDispatch();
  const qty = location.search ? parseInt(location.search.split('=')[1]) : 1;

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const checkoutHandler = () => {
    history.push('/signin?redirect=shipping');
  };

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, []);

  return (
    <div className="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li>
            <h3>Shopping cart</h3>
            <div>Price</div>
          </li>
          {cartItems.length === 0 ? (
            <div>Cart is empty</div>
          ) : (
            cartItems.map((item) => (
              <li key={item.product}>
                <div className="cart-image">
                  <img src={item.image} />
                </div>
                <div className="cart-name">
                  <div>
                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    Qty:
                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="button button-primary"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="cart-price">${item.price}</div>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="cart-action">
        <h3>
          Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items) : ${' '}
          {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
        </h3>
        <button
          className="button button-primary full-width"
          disabled={cartItems.length === 0}
          onClick={checkoutHandler}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
