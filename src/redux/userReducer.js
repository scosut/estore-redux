// import everything from action types
import * as actionTypes from './actionTypes';

// set up your initial state so you have a starting point
const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
  confirm: '',
  user: null
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.USER_UPDATE_INPUT:
      return { ...state, [action.key]: action.payload };

    case actionTypes.USER_RESET_INPUT:
      return { ...state, name: '', email: '', password: '', confirm: '' };

    case actionTypes.LOGIN_USER:
      return { ...state, name: '', email: '', password: '', confirm: '', user: action.payload };

    case actionTypes.USER_UPDATE:
      return { ...state, name: '', email: '', password: '', confirm: '', user: action.payload };

    case actionTypes.USER_IMPORT:
      return { ...state, name: action.name, email: action.email, password: '', confirm: '', user: action.payload };

    case actionTypes.LOGOUT_USER:
      return { ...state, name: '', email: '', password: '', confirm: '', user: null };

    default:
      return state;
  }
};