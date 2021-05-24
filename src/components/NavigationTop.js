import React, { Component } from 'react';
import {
  Button,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  InputGroup,
  InputGroupAddon,
  Nav,
  NavItem,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  UncontrolledDropdown,
  UncontrolledTooltip
} from 'reactstrap';
import { Link, NavLink as NavLinkRouter, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleNavigation, setInput, clearInput, executeSearch, setPageIndex } from '../redux/actionCreators';
import Utility from '../shared/utility';

const mapStateToProps = state => {
  return {
    cart: state.cart,
    input: state.input,
    nav: state.nav,
    search: state.search
  };
};

const mapDispatchToProps = {
  toggleNavigation: () => toggleNavigation(),
  clearInput: (item) => clearInput(item),
  setInput: (item, e) => setInput(item, e),
  executeSearch: (results) => executeSearch(results),
  setPageIndex: (index) => setPageIndex(index)
};

class NavigationTop extends Component {
  handleInput = (e) => {
    this.props.setInput('search', e);
  }

  clickHandler = (search) => {
    this.props.setPageIndex(0);

    if (search.length === 0) {
      this.props.history.push('/');
    }
    else {
      const results = this.props.products.filter(product => product.name.toLowerCase().indexOf(search.toLowerCase()) > -1);
      this.props.clearInput('search');
      this.props.executeSearch(results);
      this.props.history.push('/search');
    }
  }

  render() {
    const totalQuantity = Utility.getTotalQuantity(this.props.cart.items);
    const subtotal = Utility.getSubtotal(this.props.cart.items);

    return (
      <Navbar color="dark" dark expand="md">
        <div className="container">
          <NavbarBrand tag={Link} to="/" onClick={() => this.props.setPageIndex(0)}>E-STORE</NavbarBrand>
          <NavbarToggler onClick={() => this.props.toggleNavigation()} />
          <Collapse isOpen={this.props.nav.navOpen} navbar>
            <InputGroup className="input-group-search my-2 my-md-0">
              <Input type="text" name="searchString" id="searchString" placeholder="Search products..." onChange={(e) => this.handleInput(e)} value={this.props.input.search.searchString} />
              <InputGroupAddon addonType="append">
                <Button outline color="success" onClick={() => this.clickHandler(this.props.input.search.searchString)}>
                  <i className="fa fa-search" />
                </Button>
              </InputGroupAddon>
            </InputGroup>
            <Nav className="ml-auto" navbar>
              {totalQuantity > 0 &&
                <NavItem>
                  <NavLinkRouter id="cart" to="/cart" className="nav-link d-inline-block d-md-block">
                    <i className="fa fa-shopping-cart" /> CART
              </NavLinkRouter>
                  <UncontrolledTooltip boundariesElement="window" placement="left" target="cart" container="#cart">
                    Subtotal ({totalQuantity} item{totalQuantity !== 1 ? 's' : ''}): {Utility.formatCurrency(subtotal)}
                  </UncontrolledTooltip>
                </NavItem>
              }
              {this.props.user.id &&
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle tag="a" nav caret>{this.props.user.role === 'administrator' ? 'ADMIN' : this.props.user.name.toUpperCase()}</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem tag={Link} to="/userProfile">Profile</DropdownItem>
                    <DropdownItem divider />
                    {this.props.user.role === 'administrator' &&
                      <React.Fragment>
                        <DropdownItem tag={Link} to='/products' onClick={() => this.props.setPageIndex(0)}>Products</DropdownItem>
                        <DropdownItem divider />
                      </React.Fragment>
                    }
                    {Number(this.props.user.orderCount) > 0 &&
                      <React.Fragment>
                        <DropdownItem tag={Link} to="/orders" onClick={() => this.props.setPageIndex(0)}>Orders</DropdownItem>
                        <DropdownItem divider />
                      </React.Fragment>
                    }
                    <DropdownItem tag={Link} to="/signOut">Sign Out</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              }
              {!this.props.user.id &&
                <NavItem>
                  <NavLinkRouter className="nav-link" to="/signIn"><i className="fa fa-user" /> SIGN IN</NavLinkRouter>
                </NavItem>
              }
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavigationTop));