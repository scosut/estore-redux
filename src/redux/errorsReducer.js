import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
  errors: {}
};

export const errorsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_ERRORS:
      return { ...state, errors: action.payload };

    case actionTypes.CLEAR_ERRORS:
      return { ...state, errors: {} };

    default:
      return state;
  }
};