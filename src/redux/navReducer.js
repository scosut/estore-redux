import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
  navOpen: false
};

export const navReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_NAVIGATION:
      return { ...state, navOpen: !state.navOpen };

    default:
      return state;
  }
};