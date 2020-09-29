import { createStore, combineReducers, applyMiddleware } from 'redux';
import {
  productDetailsReducer,
  productListReducer,
} from './reducers/productReducer';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { composeWithDevTools } from 'redux-devtools-extension';
import { cartReducer } from './reducers/cartReducer';

const cartItems = Cookie.getJSON('cartItems') || [];

const initialState = { cart: { cartItems } };

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
});

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
