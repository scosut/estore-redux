import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
  index: 0
};

export const pageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_PAGE_INDEX:
      return { ...state, index: action.payload };

    default:
      return state;
  }
};