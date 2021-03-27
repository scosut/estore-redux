import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
  message: ''
};

export const messageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_MESSAGE:
      return { ...state, message: action.payload };

    case actionTypes.CLEAR_MESSAGE:
      return { ...state, message: '' };

    default:
      return state;
  }
};