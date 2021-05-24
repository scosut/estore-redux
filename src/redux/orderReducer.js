import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
  isLoading: false,
  errMess: null,
  order: {
    id: null,
    userId: null,
    userName: '',
    userEmail: '',
    shipping: {
      address: '',
      city: '',
      postal: '',
      country: ''
    },
    payment: '',
    datePlaced: '',
    datePaid: '',
    dateDelivered: '',
    items: []
  }
};

export const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ORDER_LOADING:
      return { ...state, isLoading: true, errMess: null, order: { id: null, userId: null, userName: '', userEmail: '', shipping: { address: '', city: '', postal: '', country: '' }, payment: '', datePlaced: '', datePaid: '', dateDelivered: '', items: [] } }

    case actionTypes.ORDER_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    case actionTypes.ADD_ORDER:
      return { ...state, isLoading: false, errMess: null, order: action.payload };

    case actionTypes.CLEAR_ORDER:
      return { ...state, isLoading: false, errMess: null, order: { id: null, userId: null, userName: '', userEmail: '', shipping: { address: '', city: '', postal: '', country: '' }, payment: '', datePlaced: '', datePaid: '', dateDelivered: '', items: [] } }

    default:
      return state;
  }
};