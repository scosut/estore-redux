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
import { toggleNavigation, searchUpdateInput, searchResetInput, executeSearch } from '../redux/actionCreators';

const mapStateToProps = state => {
  return {
    nav: state.nav,
    search: state.search
  };
};

const mapDispatchToProps = {
  toggleNavigation: () => toggleNavigation(),
  searchUpdateInput: (e) => searchUpdateInput(e),
  searchResetInput: () => searchResetInput(),
  executeSearch: (results) => executeSearch(results)
};

class NavigationTop extends Component {
  handleInput = (e) => {
    this.props.searchUpdateInput(e);
  }

  clickHandler = (search) => {
    if (search.length === 0) {
      this.props.history.push('/');
    }
    else {
      const results = this.props.products.filter(product => product.name.toLowerCase().indexOf(search.toLowerCase()) > -1);
      this.props.searchResetInput();
      this.props.executeSearch(results);
      this.props.history.push('/search');
    }
  }

  render() {
    return (
      <Navbar color="dark" dark expand="md">
        <div className="container">
          <NavbarBrand tag={Link} to="/">E-STORE</NavbarBrand>
          <NavbarToggler onClick={() => this.props.toggleNavigation()} />
          <Collapse isOpen={this.props.nav.navOpen} navbar>
            <InputGroup className="input-group-search my-2 my-md-0">
              <Input type="text" name="searchString" id="searchString" placeholder="Search products..." onChange={(e) => this.handleInput(e)} value={this.props.search.searchString} />
              <InputGroupAddon addonType="append">
                <Button outline color="success" onClick={() => this.clickHandler(this.props.search.searchString)}>
                  <i className="fa fa-search" />
                </Button>
              </InputGroupAddon>
            </InputGroup>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLinkRouter id="cart" to="/cart" className="nav-link d-inline-block d-md-block">
                  <i className="fa fa-shopping-cart" /> CART
                </NavLinkRouter>
                <UncontrolledTooltip boundariesElement="window" placement="left" target="cart" container="#cart">
                  cart data
                </UncontrolledTooltip>
              </NavItem>
              {this.props.user &&
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle tag="a" nav caret>{this.props.user.role === 'administrator' ? 'ADMIN' : this.props.user.name.toUpperCase()}</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem tag={Link} to="/userProfile">Profile</DropdownItem>
                    <DropdownItem divider />
                    {this.props.user.role === 'administrator' &&
                      <React.Fragment>
                        <DropdownItem tag={Link} to="/products">Products</DropdownItem>
                        <DropdownItem divider />
                      </React.Fragment>
                    }
                    <DropdownItem tag={Link} to="/orders">Orders</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem tag={Link} to="/signOut">Sign Out</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              }
              {!this.props.user &&
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