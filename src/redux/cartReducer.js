import * as actionTypes from './actionTypes';
import Utility from '../shared/utility';

const INITIAL_STATE = {
  userId: null,
  shipping: {
    address: '',
    city: '',
    postal: '',
    country: ''
  },
  payment: '',
  items: []
};

const sortItems = (a, b) => {
  return Number(a.productId) - Number(b.productId);
}

const setLocalStorage = (key, val) => {
  localStorage.setItem(key, JSON.stringify(val));
};

const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
}

const getFromLocalStorage = (key) => {
  return localStorage.getItem(key);
};

export const cartReducer = (state = INITIAL_STATE, action) => {
  let obj, item;

  switch (action.type) {
    case actionTypes.SET_USER:
      return { ...state, userId: action.payload };

    case actionTypes.SET_SHIPPING:
      obj = { ...state, shipping: action.payload };
      setLocalStorage(`cart_${obj.userId}`, obj);
      return obj;

    case actionTypes.SET_PAYMENT:
      obj = { ...state, payment: action.payload };
      setLocalStorage(`cart_${obj.userId}`, obj);
      return obj;

    case actionTypes.ADD_ITEM:
      item = { ...action.payload };
      item.id = Utility.getId(state.items);
      obj = { ...state, items: state.items.concat(item).sort(sortItems) };
      setLocalStorage(`cart_${obj.userId}`, obj);
      return obj;

    case actionTypes.DELETE_ITEM:
      obj = { ...state, items: state.items.filter(item => item.id !== action.payload.id) };
      setLocalStorage(`cart_${obj.userId}`, obj);
      return obj;

    case actionTypes.UPDATE_ITEM_QUANTITY:
      obj = { ...state };
      item = { ...action.payload };
      item.quantity = action.quantity;
      obj.items = obj.items.filter(item => item.id !== action.payload.id).concat(item).sort(sortItems);
      setLocalStorage(`cart_${obj.userId}`, obj);
      return obj;

    case actionTypes.CLEAR_CART:
      obj = { ...state, userId: null, shipping: { address: '', city: '', postal: '', country: '' }, payment: '', items: [] };
      return obj;

    case actionTypes.LOAD_CART:
      let cart = getFromLocalStorage(`cart_${action.payload}`);
      const mergedItems = [];
      obj = { ...state };

      if (cart) {
        cart = JSON.parse(cart);
        obj.items = obj.items.concat(cart.items);
        const distinctProductIds = [...new Set(obj.items.map(item => item.productId))];

        distinctProductIds.forEach((productId) => {
          const itemByProductId = obj.items.filter(item => item.productId === productId);
          const productQuantity = Number(action.products.filter(product => product.id === productId)[0].quantity);
          let newQuantity;

          if (itemByProductId.length > 1) {
            newQuantity = Math.min(itemByProductId.reduce((a, c) => a + Number(c.quantity), 0), productQuantity);
            if (newQuantity > 0) {
              mergedItems.push({
                ...itemByProductId[0],
                id: mergedItems.length,
                quantity: newQuantity.toString()
              });
            }
          }
          else {
            newQuantity = Math.min(Number(itemByProductId[0].quantity), productQuantity);
            if (newQuantity > 0) {
              itemByProductId[0].id = mergedItems.length;
              itemByProductId[0].quantity = newQuantity.toString();
              mergedItems.push(itemByProductId[0]);
            }
          }
        });

        obj.items = mergedItems.sort(sortItems);
      }

      setLocalStorage(`cart_${action.payload}`, obj);
      removeLocalStorage('cart_null');

      return obj;

    default:
      return state;
  }
};