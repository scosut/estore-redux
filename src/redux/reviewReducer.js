// import everything from action types
import * as actionTypes from './actionTypes';

// set up your initial state so you have a starting point
const INITIAL_STATE = {
  rating: '',
  comments: ''
};

export const reviewReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.REVIEW_UPDATE_INPUT:
      return { ...state, [action.key]: action.payload };

    case actionTypes.REVIEW_RESET_INPUT:
      return { ...state, rating: '', comments: '' };

    default:
      return state;
  }
};