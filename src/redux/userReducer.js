// import everything from action types
import * as actionTypes from './actionTypes';

// set up your initial state so you have a starting point
const INITIAL_STATE = {
  user: {
    id: null,
    name: '',
    email: '',
    role: '',
    orderCount: '0'
  }
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return { ...state, user: { id: action.payload.id, name: action.payload.name, email: action.payload.email, role: action.payload.role, orderCount: action.payload.orderCount } };

    case actionTypes.LOGOUT_USER:
      return { ...state, user: { id: null, name: '', email: '', role: '', orderCount: '0' } };

    case actionTypes.USER_UPDATE:
      return { ...state, user: { id: action.payload.id, name: action.payload.name, email: action.payload.email, role: action.payload.role, orderCount: action.payload.orderCount } };

    default:
      return state;
  }
};