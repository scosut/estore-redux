import React, { Component } from 'react';
import { Button, Card, CardBody, CardTitle, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import Checkout from './Checkout';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setInput, checkPayment, clearErrors, clearMessage } from '../redux/actionCreators';

const mapStateToProps = state => {
  return {
    cart: state.cart,
    errors: state.errors,
    input: state.input,
    message: state.message
  };
};

const mapDispatchToProps = {
  setInput: (item, e) => setInput(item, e),
  checkPayment: (payment) => checkPayment(payment),
  clearErrors: () => clearErrors(),
  clearMessage: () => clearMessage()
};

class PaymentForm extends Component {
  componentDidMount = () => {
    this.props.clearErrors();
    this.props.clearMessage();
  }

  componentDidUpdate = () => {
    if (this.props.message.message === 'payment successful') {
      this.props.history.push('/checkout/order-details');
    }
  }

  handleInput = (e) => {
    this.props.setInput('payment', e);
  }

  handleClick = () => {
    this.props.checkPayment(this.props.input.payment.method);
  }

  render() {
    return (
      <React.Fragment>
        <Checkout active="Payment" />
        <div className="container">
          <Card className="card-form mb-5">
            <CardTitle tag="div">
              <h1>PAYMENT</h1>
            </CardTitle>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="method" className="col-form-label d-block">Payment Method</Label>
                  <Input className="ml-0"
                    checked={this.props.input.payment.method.length > 0}
                    id="method"
                    name="method"
                    type="radio"
                    value="PayPal"
                    invalid={this.props.errors.errors.hasOwnProperty('payment')}
                    onChange={(e) => this.handleInput(e)} /> <Label for="method">PayPal</Label>
                  <FormFeedback>{this.props.errors.errors.hasOwnProperty('payment') ? this.props.errors.errors.payment : ''}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Button color="dark" onClick={() => this.handleClick()}>CONTINUE</Button>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PaymentForm));