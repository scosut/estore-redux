// imports from node_modules
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
// imports from user created files
import { productsReducer } from './productsReducer';
import { productReducer } from './productReducer';
import { reviewReducer } from './reviewReducer';
import { errorsReducer } from './errorsReducer';
import { messageReducer } from './messageReducer';
import { navReducer } from './navReducer';
import { modalReducer } from './modalReducer';
import { pageReducer } from './pageReducer';
import { searchReducer } from './searchReducer';
import { userReducer } from './userReducer';

export const ConfigureStore = () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    combineReducers({
      products: productsReducer,
      product: productReducer,
      review: reviewReducer,
      errors: errorsReducer,
      message: messageReducer,
      nav: navReducer,
      modal: modalReducer,
      page: pageReducer,
      search: searchReducer,
      user: userReducer
    }),
    composeEnhancers(applyMiddleware(thunk, logger))
  );

  return store;
}