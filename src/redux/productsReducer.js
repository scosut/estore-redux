import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
  isLoading: true,
  errMess: null,
  products: []
};

export const productsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_PRODUCTS:
      return { ...state, isLoading: false, errMess: null, products: action.payload };

    case actionTypes.PRODUCTS_LOADING:
      return { ...state, isLoading: true, errMess: null, products: [] }

    case actionTypes.PRODUCTS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};