import { createStore, combineReducers, applyMiddleware } from 'redux';
import { productListReducer } from './reducers/productReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {};

const reducer = combineReducers({
  productList: productListReducer,
});

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
