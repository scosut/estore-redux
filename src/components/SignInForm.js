import React, { Component } from 'react';
import Checkout from './Checkout';
import { Button, Card, CardBody, CardTitle, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import Message from './Message';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser, userResetInput, userUpdateInput, logoutUser, clearErrors, clearMessage, addMessage } from '../redux/actionCreators';

const mapStateToProps = state => {
  return {
    errors: state.errors,
    user: state.user,
    message: state.message
  };
};

const mapDispatchToProps = {
  fetchUser: (email, password) => fetchUser(email, password),
  userResetInput: () => userResetInput(),
  userUpdateInput: (e) => userUpdateInput(e),
  logoutUser: () => logoutUser(),
  clearErrors: () => clearErrors(),
  clearMessage: () => clearMessage(),
  addMessage: (message) => addMessage(message)
};

class SignInForm extends Component {
  componentDidMount = () => {
    this.props.clearMessage();
    this.props.userResetInput();
    this.props.clearErrors();
    this.logoutUser(this.props.location.pathname);
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.location !== prevProps.location) {
      this.logoutUser(this.props.location.pathname);
    }
  }

  handleInput = (e) => {
    this.props.userUpdateInput(e);
  }

  handleClick = () => {
    this.props.fetchUser(this.props.user.email, this.props.user.password);
  }

  logoutUser = (url) => {
    if (url === "/signOut") {
      this.props.logoutUser();
      this.props.addMessage("You are now logged out.");
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.props.checkout &&
          <Checkout active="Sign In" />
        }
        <div className="container">
          {this.props.message.message &&
            <Message color="success" message={this.props.message.message} styling="alert-form mt-5 mx-auto" />
          }
          <Card className={`card-form mb-5${!this.props.checkout ? ' mt-5' : ''}`}>
            <CardTitle tag="div">
              <h1>SIGN IN</h1>
            </CardTitle>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="email" className="col-form-label">Email Address</Label>
                  <Input type="text" name="email" id="email" className="flat" placeholder="Enter email" invalid={this.props.errors.errors.hasOwnProperty('email')} onChange={(e) => this.handleInput(e)} value={this.props.user.email} />
                  <FormFeedback>{this.props.errors.errors.hasOwnProperty('email') ? this.props.errors.errors.email : ''}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="password" className="col-form-label">Password</Label>
                  <Input type="password" name="password" id="password" className="flat" placeholder="Enter password" invalid={this.props.errors.errors.hasOwnProperty('password')} onChange={(e) => this.handleInput(e)} value={this.props.user.password} />
                  <FormFeedback>{this.props.errors.errors.hasOwnProperty('password') ? this.props.errors.errors.password : ''}</FormFeedback>
                </FormGroup>
                <FormGroup className="d-flex align-items-center justify-content-between">
                  <Button color="dark" onClick={() => this.handleClick()}>SIGN IN</Button>
                  <Link className="form-link" to="/register">New customer?<br />Register</Link>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignInForm));