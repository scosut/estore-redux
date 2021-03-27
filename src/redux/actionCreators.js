import * as actionTypes from './actionTypes';
import Utility from '../shared/utility';

// PRODUCTS
export const fetchProducts = () => dispatch => {
  dispatch(productsLoading());
  return fetch('http://www.local-estore-data.com/api/product')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        const error = new Error(`Error ${response.status}: ${response.statusText}`);
        error.response = response;
        throw error;
      }
    },
      error => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then(response => response.json())
    .then(products => dispatch(addProducts(products)))
    .catch(error => dispatch(productsFailed(error.message)));
};

export const fetchProductById = (productId) => dispatch => {
  dispatch(productLoading());
  return fetch(`http://www.local-estore-data.com/api/product/details/?id=${productId}`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        const error = new Error(`Error ${response.status}: ${response.statusText}`);
        error.response = response;
        throw error;
      }
    },
      error => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then(response => response.json())
    .then(product => dispatch(addProduct(product)))
    .catch(error => dispatch(productFailed(error.message)));
};

export const postProduct = (obj) => dispatch => {
  const newProduct = {
    name: obj.name,
    price: obj.price,
    image: obj.image,
    brand: obj.brand,
    quantity: obj.quantity,
    description: obj.description
  };
  newProduct.image = "/assets/images/tbd.jpg";

  return fetch('http://www.local-estore-data.com/api/product/add', {
    method: "POST",
    body: JSON.stringify(newProduct)
  })
    .then(response => response.json())
    .then(response => {
      if (response.succeeded) {
        dispatch(clearErrors());
        dispatch(productResetInput());
        dispatch(addMessage("Product added successfully."));
        dispatch(addProducts(response.products));
      }
      else {
        dispatch(addErrors(response.errors));
      }
    })
    .catch(error => {
      console.log('add product: ', error.message);
    });
};

export const updateProduct = (obj) => dispatch => {
  const existingProduct = {
    id: obj.id,
    name: obj.name,
    price: obj.price,
    image: obj.image,
    brand: obj.brand,
    quantity: obj.quantity,
    description: obj.description
  };

  return fetch('http://www.local-estore-data.com/api/product/update', {
    method: "POST",
    body: JSON.stringify(existingProduct)
  })
    .then(response => response.json())
    .then(response => {
      if (response.succeeded) {
        dispatch(clearErrors());
        dispatch(productResetInput());
        dispatch(addMessage("Product updated successfully."));
        dispatch(addProducts(response.products));
      }
      else {
        dispatch(addErrors(response.errors));
      }
    })
    .catch(error => {
      console.log('update product: ', error.message);
    });
};

export const deleteProduct = productId => dispatch => {
  return fetch(`http://www.local-estore-data.com/api/product/delete`, {
    method: "POST",
    body: JSON.stringify({ id: productId })
  })
    .then(response => response.json())
    .then(products => dispatch(addProducts(products)))
    .catch(error => dispatch(productsFailed(error.message)));
};

export const productsLoading = () => ({
  type: actionTypes.PRODUCTS_LOADING
});

export const productsFailed = errMess => ({
  type: actionTypes.PRODUCTS_FAILED,
  payload: errMess
});

export const productLoading = () => ({
  type: actionTypes.PRODUCT_LOADING
});

export const productFailed = errMess => ({
  type: actionTypes.PRODUCT_FAILED,
  payload: errMess
});

export const addProducts = products => ({
  type: actionTypes.ADD_PRODUCTS,
  payload: products
});

export const addProduct = product => ({
  type: actionTypes.ADD_PRODUCT,
  payload: product
});

export const productUpdateInput = (e) => ({
  type: actionTypes.PRODUCT_UPDATE_INPUT,
  payload: e.target.value,
  key: e.target.name
});

export const productResetInput = () => ({
  type: actionTypes.PRODUCT_RESET_INPUT
});

export const productImport = product => ({
  type: actionTypes.PRODUCT_IMPORT,
  payload: product,
  id: product.id,
  name: product.name,
  image: product.image,
  price: product.price,
  brand: product.brand,
  quantity: product.quantity,
  description: product.description
});

export const productInitialize = () => ({
  type: actionTypes.PRODUCT_INITIALIZE
});


// REVIEWS
export const postReview = (rating, comments, productId, userId) => dispatch => {
  const newReview = {
    rating: rating,
    comments: comments,
    productId: productId,
    userId: userId
  };
  const reviewDate = new Date().toISOString();
  newReview.dateReviewed = reviewDate.slice(0, 19).replace('T', ' ');

  return fetch('http://www.local-estore-data.com/api/review/add', {
    method: "POST",
    body: JSON.stringify(newReview)
  })
    .then(response => response.json())
    .then(response => {
      if (response.succeeded) {
        dispatch(clearErrors());
        dispatch(reviewResetInput());
        dispatch(addMessage(`You reviewed this item on ${Utility.formatDate(reviewDate)}.`));
        dispatch(addReview(response.product));
        dispatch(addProducts(response.products))
      }
      else {
        dispatch(addErrors(response.errors));
      }
    })
    .catch(error => {
      console.log('post review: ', error.message);
    });
};

export const addReview = product => ({
  type: actionTypes.ADD_REVIEW,
  payload: product
});

export const reviewUpdateInput = (e) => ({
  type: actionTypes.REVIEW_UPDATE_INPUT,
  payload: e.target.value,
  key: e.target.name
});

export const reviewResetInput = () => ({
  type: actionTypes.REVIEW_RESET_INPUT
});


// USERS
export const fetchUser = (email, password) => dispatch => {
  const user = {
    email: email,
    password: password
  };

  return fetch('http://www.local-estore-data.com/api/user/login', {
    method: "POST",
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .then(response => {
      if (response.succeeded) {
        dispatch(clearErrors());
        dispatch(userResetInput());
        dispatch(addMessage("You are now logged in."));
        dispatch(loginUser(response.user));
      }
      else {
        dispatch(addErrors(response.errors));
      }
    })
    .catch(error => {
      console.log('fetch user: ', error.message);
    });
};

export const registerUser = (name, email, password, confirm) => dispatch => {
  const newUser = {
    name: name,
    email: email,
    password: password,
    confirm: confirm
  };
  newUser.role = "customer";

  return fetch('http://www.local-estore-data.com/api/user/register', {
    method: "POST",
    body: JSON.stringify(newUser)
  })
    .then(response => response.json())
    .then(response => {
      if (response.succeeded) {
        dispatch(clearErrors());
        dispatch(userResetInput());
        dispatch(addMessage("User registered successfully."));
      }
      else {
        dispatch(addErrors(response.errors));
      }
    })
    .catch(error => {
      console.log('register user: ', error.message);
    });
};

export const updateUser = (id, name, email, password, confirm) => dispatch => {
  const existingUser = {
    id: id,
    name: name,
    email: email,
    password: password,
    confirm: confirm
  };

  return fetch('http://www.local-estore-data.com/api/user/update', {
    method: "POST",
    body: JSON.stringify(existingUser)
  })
    .then(response => response.json())
    .then(response => {
      if (response.succeeded) {
        dispatch(clearErrors());
        dispatch(userResetInput());
        dispatch(addMessage("User profile updated successfully."));
        dispatch(userUpdate(response.user));
      }
      else {
        dispatch(addErrors(response.errors));
      }
    })
    .catch(error => {
      console.log('update user: ', error.message);
    });
};

export const loginUser = user => ({
  type: actionTypes.LOGIN_USER,
  payload: user
});

export const logoutUser = () => ({
  type: actionTypes.LOGOUT_USER
});

export const userImport = user => ({
  type: actionTypes.USER_IMPORT,
  payload: user,
  name: user.name,
  email: user.email
});

export const userUpdate = user => ({
  type: actionTypes.USER_UPDATE,
  payload: user
});

export const userUpdateInput = (e) => ({
  type: actionTypes.USER_UPDATE_INPUT,
  payload: e.target.value,
  key: e.target.name
});

export const userResetInput = () => ({
  type: actionTypes.USER_RESET_INPUT
});


// FORMS
export const addErrors = errors => ({
  type: actionTypes.ADD_ERRORS,
  payload: errors
});

export const clearErrors = () => ({
  type: actionTypes.CLEAR_ERRORS
});


//MESSAGE
export const addMessage = message => ({
  type: actionTypes.ADD_MESSAGE,
  payload: message
});

export const clearMessage = () => ({
  type: actionTypes.CLEAR_MESSAGE
});


// TOGGLERS
export const toggleNavigation = () => {
  return {
    type: actionTypes.TOGGLE_NAVIGATION
  };
};

export const toggleModal = item => {
  return {
    type: actionTypes.TOGGLE_MODAL,
    payload: item
  };
};


// PAGINATION
export const setPageIndex = index => {
  return {
    type: actionTypes.SET_PAGE_INDEX,
    payload: index
  };
};

// SEARCH
export const executeSearch = results => ({
  type: actionTypes.EXECUTE_SEARCH,
  payload: results
});

export const searchUpdateInput = (e) => ({
  type: actionTypes.SEARCH_UPDATE_INPUT,
  payload: e.target.value,
  key: e.target.name
});

export const searchResetInput = () => ({
  type: actionTypes.SEARCH_RESET_INPUT
});