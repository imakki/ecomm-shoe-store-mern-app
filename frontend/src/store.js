import { createStore, combineReducers, applyMiddleware } from 'redux';
import {
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productSaveReducer,
} from './reducers/productReducer';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { composeWithDevTools } from 'redux-devtools-extension';
import { cartReducer } from './reducers/cartReducer';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducer';
import { orderCreateReducer } from './reducers/orderReducer';

const cartItems = Cookie.getJSON('cartItems') || [];
const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = {
  cart: { cartItems, shipping: {}, payment: {} },
  userSignIn: { userInfo },
};

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignIn: userLoginReducer,
  userRegister: userRegisterReducer,
  savedProduct: productSaveReducer,
  productDelete: productDeleteReducer,
  orderCreate: orderCreateReducer,
});

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
