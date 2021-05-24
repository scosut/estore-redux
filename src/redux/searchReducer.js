import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
  searchResults: []
};

export const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.EXECUTE_SEARCH:
      return { ...state, searchResults: action.payload };

    default:
      return state;
  }
};