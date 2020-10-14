import axios from 'axios';
import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS,
  MYORDER_LIST_FAIL,
  MYORDER_LIST_REQUEST,
  MYORDER_LIST_SUCCESS,
  ORDER_DELETE_REQUEST,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
} from '../constants/productConstants';

const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MYORDER_LIST_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();
    const { data } = await axios.get('/api/orders/myOrders', {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    });
    dispatch({ type: MYORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: MYORDER_LIST_FAIL, payload: error.message });
  }
};

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

const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();
    const { data } = await axios.get('api/orders', {
      headers: { Authorization: 'Bearer ' + userInfo.token },
    });
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_LIST_FAIL, payload: error.message });
  }
};

const detailsOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    const {
      userSignIn: { userInfo },
    } = getState();
    const { data } = await axios.get('/api/orders/' + orderId, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_DETAILS_FAIL, payload: error.message });
  }
};

const deleteOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
    const {
      userSignIn: { userInfo },
    } = getState();
    const { data } = await axios.delete('/api/orders/deleteorder/' + orderId, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    });
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_FAIL, payload: error.message });
  }
};

const payOrder = (order, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST, payload: paymentResult });
    const {
      userSignIn: { userInfo },
    } = getState();
    const { data } = axios.put(
      '/api/orders/' + order._id + '/pay',
      paymentResult,
      {
        headers: {
          Authorization: 'Bearer ' + userInfo.token,
        },
      }
    );
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_PAY_FAIL, payload: error.message });
  }
};
export {
  createOrder,
  detailsOrder,
  payOrder,
  listMyOrders,
  deleteOrder,
  listOrders,
};
