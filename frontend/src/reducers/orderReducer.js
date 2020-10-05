const {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
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

export { orderCreateReducer };
