import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
  isLoading: false,
  errMess: null,
  id: null,
  name: '',
  price: '',
  image: null,
  brand: '',
  quantity: '',
  description: '',
  product: {
    id: null,
    quantity: 0,
    reviews: []
  }
};

export const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_LOADING:
      return { ...state, isLoading: true, errMess: null, product: { quantity: 0, reviews: [] } }

    case actionTypes.PRODUCT_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    case actionTypes.ADD_PRODUCT:
      return { ...state, isLoading: false, errMess: null, product: action.payload };

    case actionTypes.ADD_REVIEW:
      return { ...state, isLoading: false, errMess: null, product: action.payload };

    case actionTypes.PRODUCT_IMPORT:
      return {
        ...state,
        id: action.id,
        name: action.name,
        price: action.price,
        image: action.image,
        brand: action.brand,
        quantity: action.quantity,
        description: action.description,
        product: action.payload
      };

    case actionTypes.PRODUCT_UPDATE_INPUT:
      return { ...state, [action.key]: action.payload };

    case actionTypes.PRODUCT_RESET_INPUT:
      return { ...state, name: '', price: '', brand: '', quantity: '', description: '' };

    case actionTypes.PRODUCT_INITIALIZE:
      return INITIAL_STATE;

    default:
      return state;
  }
};