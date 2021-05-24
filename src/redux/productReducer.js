import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
  isLoading: false,
  errMess: null,
  product: {
    id: null,
    quantity: 0,
    purchasers: [],
    reviews: []
  }
};

export const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_LOADING:
      return { ...state, isLoading: true, errMess: null, product: { id: null, quantity: 0, purchasers: [], reviews: [] } }

    case actionTypes.PRODUCT_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    case actionTypes.ADD_PRODUCT:
      return { ...state, isLoading: false, errMess: null, product: action.payload };

    case actionTypes.ADD_REVIEW:
      return { ...state, isLoading: false, errMess: null, product: action.payload };

    default:
      return state;
  }
};