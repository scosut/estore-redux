import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
  url: null
};

export const redirectReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_REDIRECT:
      return { ...state, url: action.payload };

    case actionTypes.CLEAR_REDIRECT:
      return { ...state, url: null };

    default:
      return state;
  }
};