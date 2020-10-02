const {
  CART_ADD_REQUEST,
  CART_ADD_SUCCESS,
  CART_ADD_FAIL,
  CART_REMOVE_ITEM,
  SHIPPING_SAVE_SUCCESS,
  PAYMENT_SAVE_SUCCESS,
} = require('../constants/productConstants');

function cartReducer(
  state = { cartItems: [], shipping: {}, payment: {} },
  action
) {
  switch (action.type) {
    case CART_ADD_SUCCESS:
      const item = action.payload;
      const product = state.cartItems.find((x) => x.product === item.product);
      if (product) {
        return {
          cartItems: state.cartItems.map((x) =>
            x.product === product.product ? item : x
          ),
        };
      } else {
        return { cartItems: [...state.cartItems, item] };
      }
    case CART_REMOVE_ITEM:
      return {
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case SHIPPING_SAVE_SUCCESS:
      return {
        ...state,
        shipping: action.payload,
      };
    case PAYMENT_SAVE_SUCCESS:
      return {
        ...state,
        payment: action.payload,
      };
    default:
      return state;
  }
}

export { cartReducer };
