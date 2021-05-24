import * as actionTypes from './actionTypes';
import Utility from '../shared/utility';

// PRODUCTS
export const fetchProducts = () => dispatch => {
  dispatch(productsLoading());
  return fetch('https://cart.projectsbyscott.com/route/product')
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
  return fetch(`https://cart.projectsbyscott.com/route/product/details/?id=${productId}`)
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
    image: '',
    brand: obj.brand,
    quantity: obj.quantity,
    description: obj.description
  };

  const data = new FormData();
  data.append('product', JSON.stringify(newProduct));
  data.append('file', obj.image);

  return fetch('https://cart.projectsbyscott.com/route/product/add', {
    method: "POST",
    body: data
  })
    .then(response => response.json())
    .then(response => {
      if (response.succeeded) {
        dispatch(clearErrors());
        dispatch(clearInput('product'));
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
    image: '',
    brand: obj.brand,
    quantity: obj.quantity,
    description: obj.description
  };

  const data = new FormData();
  data.append('product', JSON.stringify(existingProduct));

  if (obj.image) {
    data.append('file', obj.image);
  }

  return fetch('https://cart.projectsbyscott.com/route/product/update', {
    method: "POST",
    body: data
  })
    .then(response => response.json())
    .then(response => {
      if (response.succeeded) {
        dispatch(clearErrors());
        dispatch(clearInput('product'));
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
  return fetch(`https://cart.projectsbyscott.com/route/product/delete`, {
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

  return fetch('https://cart.projectsbyscott.com/route/review/add', {
    method: "POST",
    body: JSON.stringify(newReview)
  })
    .then(response => response.json())
    .then(response => {
      if (response.succeeded) {
        dispatch(clearErrors());
        dispatch(clearInput('review'));
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


// USERS
export const fetchUser = (email, password) => dispatch => {
  const user = {
    email: email,
    password: password
  };

  return fetch('https://cart.projectsbyscott.com/route/user/login', {
    method: "POST",
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .then(response => {
      if (response.succeeded) {
        dispatch(clearErrors());
        dispatch(clearInput('user'));
        dispatch(addMessage("You are now logged in."));
        dispatch(setUser(response.user.id))
        dispatch(loadCart(response.user.id, response.products));
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

  return fetch('https://cart.projectsbyscott.com/route/user/register', {
    method: "POST",
    body: JSON.stringify(newUser)
  })
    .then(response => response.json())
    .then(response => {
      if (response.succeeded) {
        dispatch(clearErrors());
        dispatch(clearInput('user'));
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

  return fetch('https://cart.projectsbyscott.com/route/user/update', {
    method: "POST",
    body: JSON.stringify(existingUser)
  })
    .then(response => response.json())
    .then(response => {
      if (response.succeeded) {
        dispatch(clearErrors());
        dispatch(clearInput('user'));
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

export const userUpdate = user => ({
  type: actionTypes.USER_UPDATE,
  payload: user
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


// INPUT
export const setInput = (item, e) => ({
  type: actionTypes.SET_INPUT,
  payload: e.target.value,
  key: e.target.name,
  item: item
});

export const setInputFromObject = (item, obj) => ({
  type: actionTypes.SET_INPUT_FROM_OBJECT,
  payload: obj,
  item: item
});

export const clearInput = (item) => ({
  type: actionTypes.CLEAR_INPUT,
  item: item
});


// CART
export const setUser = user => ({
  type: actionTypes.SET_USER,
  payload: user
});

export const setShipping = shipping => ({
  type: actionTypes.SET_SHIPPING,
  payload: shipping
});

export const setPayment = payment => ({
  type: actionTypes.SET_PAYMENT,
  payload: payment
});

export const addItem = item => ({
  type: actionTypes.ADD_ITEM,
  payload: item
});

export const deleteItem = item => ({
  type: actionTypes.DELETE_ITEM,
  payload: item
});

export const updateItemQuantity = (item, quantity) => ({
  type: actionTypes.UPDATE_ITEM_QUANTITY,
  payload: item,
  quantity: quantity
});

export const clearCart = () => ({
  type: actionTypes.CLEAR_CART
});

export const loadCart = (user, products) => ({
  type: actionTypes.LOAD_CART,
  payload: user,
  products: products
});


// ORDERS
export const fetchOrders = (user) => dispatch => {
  dispatch(ordersLoading());
  return fetch('https://cart.projectsbyscott.com/route/order')
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
    .then(orders => dispatch(addOrders(orders, user)))
    .catch(error => dispatch(ordersFailed(error.message)));
};

export const fetchOrderById = (orderId) => dispatch => {
  dispatch(orderLoading());
  return fetch(`https://cart.projectsbyscott.com/route/order/details/?id=${orderId}`)
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
    .then(order => dispatch(addOrder(order)))
    .catch(error => dispatch(orderFailed(error.message)));
};

export const checkShipping = (obj) => dispatch => {
  const newOrder = {
    address: obj.address,
    city: obj.city,
    postal: obj.postal,
    country: obj.country
  };

  return fetch('https://cart.projectsbyscott.com/route/order/shipping', {
    method: "POST",
    body: JSON.stringify(newOrder)
  })
    .then(response => response.json())
    .then(response => {
      if (response.succeeded) {
        dispatch(addMessage("shipping successful"));
        dispatch(setShipping(newOrder));
      }
      else {
        dispatch(addErrors(response.errors));
      }
    })
    .catch(error => {
      console.log('check shipping: ', error.message);
    });
};

export const checkPayment = payment => dispatch => {
  const newOrder = {
    payment: payment
  };

  return fetch('https://cart.projectsbyscott.com/route/order/payment', {
    method: "POST",
    body: JSON.stringify(newOrder)
  })
    .then(response => response.json())
    .then(response => {
      if (response.succeeded) {
        dispatch(addMessage("payment successful"));
        dispatch(setPayment(newOrder.payment))
      }
      else {
        dispatch(addErrors(response.errors));
      }
    })
    .catch(error => {
      console.log('check payment: ', error.message);
    });
};

export const postOrder = (obj) => dispatch => {
  const newOrder = {
    address: obj.address,
    city: obj.city,
    postal: obj.postal,
    country: obj.country,
    payment: obj.payment,
    items: obj.items,
    userId: obj.userId
  };
  const datePlaced = new Date().toISOString();
  newOrder.datePlaced = datePlaced.slice(0, 19).replace('T', ' ');

  return fetch('https://cart.projectsbyscott.com/route/order/add', {
    method: "POST",
    body: JSON.stringify(newOrder)
  })
    .then(response => response.json())
    .then(response => {
      if (response.succeeded) {
        dispatch(addOrder(response.order));
        dispatch(addProducts(response.products));
        dispatch(clearInput('shipping'));
        dispatch(clearInput('payment'));
        dispatch(clearCart());
        localStorage.removeItem(`cart_${response.order.userId}`);
      }
      else {
        dispatch(addMessage(response.message));
      }
    })
    .catch(error => {
      console.log('add order: ', error.message);
    });
};

export const updateOrder = (obj) => dispatch => {
  const existingOrder = {
    id: obj.id,
    datePaid: '',
    dateDelivered: ''
  };

  if (obj.datePaid) {
    existingOrder.datePaid = new Date().toISOString().slice(0, 19).replace('T', ' ');
  }

  if (obj.dateDelivered) {
    existingOrder.dateDelivered = new Date().toISOString().slice(0, 19).replace('T', ' ');
  }

  return fetch('https://cart.projectsbyscott.com/route/order/update', {
    method: "POST",
    body: JSON.stringify(existingOrder)
  })
    .then(response => response.json())
    .then(response => {
      if (response.succeeded) {
        dispatch(addOrder(response.order));
      }
      else {
        dispatch(addMessage(response.message));
      }
    })
    .catch(error => {
      console.log('update order: ', error.message);
    });
};

export const orderLoading = () => ({
  type: actionTypes.ORDER_LOADING
});

export const orderFailed = errMess => ({
  type: actionTypes.ORDER_FAILED,
  payload: errMess
});

export const addOrder = order => ({
  type: actionTypes.ADD_ORDER,
  payload: order
});

export const clearOrder = () => ({
  type: actionTypes.CLEAR_ORDER
});

export const ordersLoading = () => ({
  type: actionTypes.ORDERS_LOADING
});

export const ordersFailed = errMess => ({
  type: actionTypes.ORDERS_FAILED,
  payload: errMess
});

export const addOrders = (orders, user) => ({
  type: actionTypes.ADD_ORDERS,
  payload: user.role === 'administrator' ? orders : orders.filter(order => order.userId === user.id)
});