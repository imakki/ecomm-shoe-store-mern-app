import axios from 'axios';
import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
} from '../constants/productConstants';

const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST, payload: order });
    const {
      userSignIn: { userInfo },
    } = getState();
    const {
      data: { data: newOrder },
    } = await axios.post('/api/orders/createOrder', order, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    });
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: newOrder });
  } catch (error) {
    dispatch({ type: CREATE_ORDER_FAIL, payload: error.message });
  }
};

export { createOrder };
