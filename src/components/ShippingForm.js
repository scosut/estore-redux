import React, { Component } from 'react';
import Checkout from './Checkout';
import { Button, Card, CardBody, CardTitle, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setInput, checkShipping, clearErrors, clearMessage, clearRedirect } from '../redux/actionCreators';

const mapStateToProps = state => {
  return {
    cart: state.cart,
    errors: state.errors,
    input: state.input,
    message: state.message,
    redirect: state.redirect
  };
};

const mapDispatchToProps = {
  setInput: (item, e) => setInput(item, e),
  checkShipping: (shipping) => checkShipping(shipping),
  clearErrors: () => clearErrors(),
  clearMessage: () => clearMessage(),
  clearRedirect: () => clearRedirect()
};

class ShippingForm extends Component {
  componentDidMount = () => {
    this.props.clearErrors();
    this.props.clearMessage();
    this.props.clearRedirect();
  }

  handleInput = (e) => {
    this.props.setInput('shipping', e);
  }

  handleClick = () => {
    this.props.checkShipping({
      address: this.props.input.shipping.address,
      city: this.props.input.shipping.city,
      postal: this.props.input.shipping.postal,
      country: this.props.input.shipping.country
    });
  }

  render() {
    if (this.props.redirect.url) {
      return <Redirect to={this.props.redirect.url} />;
    }
    else {
      return (
        <React.Fragment>
          <Checkout active="Shipping" />
          <div className="container">
            <Card className="card-form mb-5">
              <CardTitle tag="div">
                <h1>SHIPPING</h1>
              </CardTitle>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="address" className="col-form-label">Address</Label>
                    <Input type="text" name="address" id="address" className="flat" placeholder="Enter address" invalid={this.props.errors.errors.hasOwnProperty('address')} onChange={(e) => this.handleInput(e)} value={this.props.input.shipping.address} />
                    <FormFeedback>{this.props.errors.errors.hasOwnProperty('address') ? this.props.errors.errors.address : ''}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="city" className="col-form-label">City</Label>
                    <Input type="text" name="city" id="city" className="flat" placeholder="Enter city" invalid={this.props.errors.errors.hasOwnProperty('city')} onChange={(e) => this.handleInput(e)} value={this.props.input.shipping.city} />
                    <FormFeedback>{this.props.errors.errors.hasOwnProperty('city') ? this.props.errors.errors.city : ''}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="postal" className="col-form-label">Postal Code</Label>
                    <Input type="text" name="postal" id="postal" className="flat" placeholder="Enter postal code" invalid={this.props.errors.errors.hasOwnProperty('postal')} onChange={(e) => this.handleInput(e)} value={this.props.input.shipping.postal} />
                    <FormFeedback>{this.props.errors.errors.hasOwnProperty('postal') ? this.props.errors.errors.postal : ''}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="Country" className="col-form-label">Country</Label>
                    <Input type="text" name="country" id="country" className="flat" placeholder="Enter country" invalid={this.props.errors.errors.hasOwnProperty('country')} onChange={(e) => this.handleInput(e)} value={this.props.input.shipping.country} />
                    <FormFeedback>{this.props.errors.errors.hasOwnProperty('country') ? this.props.errors.errors.country : ''}</FormFeedback>
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
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShippingForm));