import axios from 'axios';
import Cookie from 'js-cookie';
const {
  CART_ADD_SUCCESS,
  CART_REMOVE_ITEM,
  SHIPPING_SAVE_SUCCESS,
  PAYMENT_SAVE_SUCCESS,
} = require('../constants/productConstants');

const addToCart = (productId, quantity) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get('/api/products/' + productId);
    dispatch({
      type: CART_ADD_SUCCESS,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        quantity,
      },
    });
    const {
      cart: { cartItems },
    } = getState();
    Cookie.set('cart', JSON.stringify(cartItems));
  } catch (error) {}
};

const removeFromCart = (productId) => async (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  const {
    cart: { cartItems },
  } = getState();
  Cookie.set('cart', JSON.stringify(cartItems));
};

const saveShipping = (data) => async (dispatch) => {
  dispatch({ type: SHIPPING_SAVE_SUCCESS, payload: data });
};

const savePayment = (data) => async (dispatch) => {
  dispatch({ type: PAYMENT_SAVE_SUCCESS, payload: data });
};

export { addToCart, removeFromCart, saveShipping, savePayment };
