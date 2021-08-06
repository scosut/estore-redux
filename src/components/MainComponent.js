import React, { Component } from 'react';
import NavigationTop from './NavigationTop';
import ProductGallery from './ProductGallery';
import ProductDetails from './ProductDetails';
import ProductDashboard from './ProductDashboard';
import OrderDashboard from './OrderDashboard';
import ProductForm from './ProductForm';
import CartDetails from './CartDetails';
import ShippingForm from './ShippingForm';
import PaymentForm from './PaymentForm';
import OrderDetails from './OrderDetails';
import SignInForm from './SignInForm';
import RegisterForm from './RegisterForm';
import UserProfileForm from './UserProfileForm';
import Footer from './Footer';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts } from '../redux/actionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import '../App.css';

const mapStateToProps = state => {
  return {
    products: state.products,
    search: state.search,
    user: state.user
  };
};

const mapDispatchToProps = {
  fetchProducts: () => fetchProducts()
};

class MainComponent extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    return (
      <TransitionGroup>
        <CSSTransition key={this.props.location.key} timeout={1000} classNames="fade" appear={true}>
          <div className="App">
            <NavigationTop
              products={this.props.products.products}
              user={this.props.user.user} />
            <Switch location={this.props.location}>
              <Route exact path='/'
                render={() => <ProductGallery
                  products={this.props.products.products}
                  isLoading={this.props.products.isLoading}
                  errMess={this.props.products.errMess} />} />
              <Route exact path='/search'
                render={() => <ProductGallery
                  products={this.props.search.searchResults}
                  search />} />
              <Route exact path='/products'
                render={() => <ProductDashboard products={this.props.products.products} />} />
              <Route exact path='/products/add' component={ProductForm} />
              <Route exact path='/products/edit/:productId'
                render={() => <ProductForm products={this.props.products.products} edit />} />
              <Route exact path='/orders' component={OrderDashboard} />
              <Route exact path='/cart' component={CartDetails} />
              <Route exact path='/checkout/signIn' render={() => <SignInForm checkout />} />
              <Route exact path='/checkout/shipping' component={ShippingForm} />
              <Route exact path='/checkout/payment' component={PaymentForm} />
              <Route exact path='/checkout/order-details' component={OrderDetails} />
              <Route exact path='/order-details/:orderId' component={OrderDetails} />
              <Route exact path='/signIn' component={SignInForm} />
              <Route exact path='/signOut' component={SignInForm} />
              <Route exact path='/register' component={RegisterForm} />
              <Route exact path='/userProfile' component={UserProfileForm} />
              <Route exact path='/product-details/:productId' component={ProductDetails} />
              <Redirect to='/' />
            </Switch>
            <Footer />
          </div>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));