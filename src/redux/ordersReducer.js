import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
  isLoading: true,
  errMess: null,
  orders: []
};

export const ordersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_ORDERS:
      return { ...state, isLoading: false, errMess: null, orders: action.payload };

    case actionTypes.ORDERS_LOADING:
      return { ...state, isLoading: true, errMess: null, orders: [] }

    case actionTypes.ORDERS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};