const {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  MYORDER_LIST_REQUEST,
  MYORDER_LIST_SUCCESS,
  MYORDER_LIST_FAIL,
} = require('../constants/productConstants');

function orderCreateReducer(state = {}, action) {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { ...state, loading: true };
    case CREATE_ORDER_SUCCESS:
      return { ...state, loading: false, success: true, order: action.payload };
    case CREATE_ORDER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return { state };
  }
}

function orderDetailReducer(state = {}, action) {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { ...state, loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
}

function orderPayReducer(
  state = {
    order: {
      orderItems: [],
      shipping: {},
      payment: {},
    },
  },
  action
) {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };
    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true };
    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
}

function myOrderListReducer(state = { orders: [] }, action) {
  switch (action.type) {
    case MYORDER_LIST_REQUEST:
      return { loading: true };
    case MYORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case MYORDER_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
}

export {
  orderCreateReducer,
  orderDetailReducer,
  orderPayReducer,
  myOrderListReducer,
};
