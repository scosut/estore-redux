import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
  modalOpen: false,
  item: { id: null, name: '' }
};

export const modalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_MODAL:
      const item = action.payload ? action.payload : { id: null, name: '' };
      return { ...state, item: item, modalOpen: !state.modalOpen };

    default:
      return state;
  }
};