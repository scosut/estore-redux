import React, { Component } from 'react';
import { Button, Card, CardBody, CardTitle, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import Message from './Message';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUser, clearInput, setInput, setInputFromObject, clearErrors, clearMessage } from '../redux/actionCreators';

const mapStateToProps = state => {
  return {
    errors: state.errors,
    input: state.input,
    message: state.message,
    user: state.user
  };
};

const mapDispatchToProps = {
  updateUser: (id, name, email, password, confirm) => updateUser(id, name, email, password, confirm),
  clearInput: (item) => clearInput(item),
  setInput: (item, e) => setInput(item, e),
  setInputFromObject: (item, obj) => setInputFromObject(item, obj),
  clearMessage: () => clearMessage(),
  clearErrors: () => clearErrors()
};

class UserProfileForm extends Component {
  componentDidMount = () => {
    this.props.clearMessage();
    this.props.clearInput('user');
    this.props.clearErrors();
    this.props.setInputFromObject('user', { name: this.props.user.user.name, email: this.props.user.user.email });
  }

  handleInput = (e) => {
    this.props.setInput('user', e);
  }

  handleClick = () => {
    this.props.updateUser(this.props.user.user.id, this.props.input.user.name, this.props.input.user.email, this.props.input.user.password, this.props.input.user.confirm);
  }

  render() {
    return (
      <div className="container">
        {this.props.message.message &&
          <Message color="success" message={this.props.message.message} styling="alert-form mt-5 mx-auto" />
        }
        <Card className="card-form mt-5 mb-5">
          <CardTitle tag="div">
            <h1>USER PROFILE</h1>
          </CardTitle>
          <CardBody>
            <Form>
              <FormGroup>
                <Label for="name" className="col-form-label">Name</Label>
                <Input type="text" name="name" id="name" className="flat" placeholder="Enter name" invalid={this.props.errors.errors.hasOwnProperty('name')} onChange={(e) => this.handleInput(e)} value={this.props.input.user.name} />
                <FormFeedback>{this.props.errors.errors.hasOwnProperty('name') ? this.props.errors.errors.name : ''}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="email" className="col-form-label">Email Address</Label>
                <Input type="text" name="email" id="email" className="flat" placeholder="Enter email" invalid={this.props.errors.errors.hasOwnProperty('email')} onChange={(e) => this.handleInput(e)} value={this.props.input.user.email} />
                <FormFeedback>{this.props.errors.errors.hasOwnProperty('email') ? this.props.errors.errors.email : ''}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="password" className="col-form-label">Password</Label>
                <Input type="password" name="password" id="password" className="flat" placeholder="Enter password" invalid={this.props.errors.errors.hasOwnProperty('password')} onChange={(e) => this.handleInput(e)} value={this.props.input.user.password} />
                <FormFeedback>{this.props.errors.errors.hasOwnProperty('password') ? this.props.errors.errors.password : ''}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="confirm" className="col-form-label">Confirm Password</Label>
                <Input type="password" name="confirm" id="confirm" className="flat" placeholder="Re-enter password" invalid={this.props.errors.errors.hasOwnProperty('confirm')} onChange={(e) => this.handleInput(e)} value={this.props.input.user.confirm} />
                <FormFeedback>{this.props.errors.errors.hasOwnProperty('confirm') ? this.props.errors.errors.confirm : ''}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Button color="dark" onClick={() => this.handleClick()}>UPDATE</Button>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProfileForm));