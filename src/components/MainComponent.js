import React, { Component } from 'react';
import NavigationTop from './NavigationTop';
import ProductGallery from './ProductGallery';
import ProductDetails from './ProductDetails';
import ProductDashboard from './ProductDashboard';
import ProductForm from './ProductForm';
import SignInForm from './SignInForm';
import RegisterForm from './RegisterForm';
import UserProfileForm from './UserProfileForm';
import Footer from './Footer';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts } from '../redux/actionCreators';
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
    this.props.fetchProducts()
  }

  render() {
    return (
      <div className="App">
        <NavigationTop
          products={this.props.products.products}
          user={this.props.user.user} />
        <Switch>
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
            render={() => <ProductForm products={this.props.products.products} />} />
          <Route exact path='/signIn' component={SignInForm} />
          <Route exact path='/signOut' component={SignInForm} />
          <Route exact path='/register' component={RegisterForm} />
          <Route exact path='/userProfile' component={UserProfileForm} />
          <Route exact path='/product-details/:productId' component={ProductDetails} />
          <Redirect to='/' />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);