import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
  searchString: '',
  searchResults: []
};

export const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_UPDATE_INPUT:
      return { ...state, [action.key]: action.payload };

    case actionTypes.SEARCH_RESET_INPUT:
      return { ...state, searchString: '' };

    case actionTypes.EXECUTE_SEARCH:
      return { ...state, searchResults: action.payload };

    default:
      return state;
  }
};