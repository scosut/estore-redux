import React, { Component } from 'react';
import { Button, Card, CardBody, CardTitle, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import Message from './Message';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser, userResetInput, userUpdateInput, clearErrors, clearMessage } from '../redux/actionCreators';

const mapStateToProps = state => {
  return {
    errors: state.errors,
    user: state.user,
    message: state.message
  };
};

const mapDispatchToProps = {
  registerUser: (name, email, password, confirm) => registerUser(name, email, password, confirm),
  userResetInput: () => userResetInput(),
  userUpdateInput: (e) => userUpdateInput(e),
  clearMessage: () => clearMessage(),
  clearErrors: () => clearErrors()
};

class RegisterForm extends Component {
  componentDidMount = () => {
    this.props.clearMessage();
    this.props.userResetInput();
    this.props.clearErrors();
  }

  handleInput = (e) => {
    this.props.userUpdateInput(e);
  }

  handleClick = () => {
    this.props.registerUser(this.props.user.name, this.props.user.email, this.props.user.password, this.props.user.confirm);
  }

  render() {
    return (
      <div className="container">
        {this.props.message.message &&
          <Message color="success" message={this.props.message.message} styling="alert-form mt-5 mx-auto" />
        }
        <Card className="card-form mt-5 mb-5">
          <CardTitle tag="div">
            <h1>REGISTER</h1>
          </CardTitle>
          <CardBody>
            <Form>
              <FormGroup>
                <Label for="name" className="col-form-label">Name</Label>
                <Input type="text" name="name" id="name" className="flat" placeholder="Enter name" invalid={this.props.errors.errors.hasOwnProperty('name')} onChange={(e) => this.handleInput(e)} value={this.props.user.name} />
                <FormFeedback>{this.props.errors.errors.hasOwnProperty('name') ? this.props.errors.errors.name : ''}</FormFeedback>
              </FormGroup>
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
              <FormGroup>
                <Label for="confirm" className="col-form-label">Confirm Password</Label>
                <Input type="password" name="confirm" id="confirm" className="flat" placeholder="Re-enter password" invalid={this.props.errors.errors.hasOwnProperty('confirm')} onChange={(e) => this.handleInput(e)} value={this.props.user.confirm} />
                <FormFeedback>{this.props.errors.errors.hasOwnProperty('confirm') ? this.props.errors.errors.confirm : ''}</FormFeedback>
              </FormGroup>
              <FormGroup className="d-flex align-items-center justify-content-between">
                <Button color="dark" onClick={() => this.handleClick()}>REGISTER</Button>
                <Link className="form-link" to="/signIn">Existing customer?<br />Sign In</Link>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterForm));