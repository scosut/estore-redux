// imports from node_modules
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
// imports from user created files
import { productsReducer } from './productsReducer';
import { productReducer } from './productReducer';
import { inputReducer } from './inputReducer';
import { errorsReducer } from './errorsReducer';
import { messageReducer } from './messageReducer';
import { navReducer } from './navReducer';
import { modalReducer } from './modalReducer';
import { pageReducer } from './pageReducer';
import { searchReducer } from './searchReducer';
import { userReducer } from './userReducer';
import { cartReducer } from './cartReducer';
import { orderReducer } from './orderReducer';
import { ordersReducer } from './ordersReducer';

export const ConfigureStore = () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    combineReducers({
      products: productsReducer,
      product: productReducer,
      input: inputReducer,
      errors: errorsReducer,
      message: messageReducer,
      nav: navReducer,
      modal: modalReducer,
      page: pageReducer,
      search: searchReducer,
      user: userReducer,
      cart: cartReducer,
      order: orderReducer,
      orders: ordersReducer
    }),
    composeEnhancers(applyMiddleware(thunk, logger))
  );

  return store;
}