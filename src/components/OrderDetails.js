import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';
import Checkout from './Checkout';
import Message from './Message';
import BreadcrumbGeneric from './BreadcrumbGeneric';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postOrder, updateOrder } from '../redux/actionCreators';
import Utility from '../shared/utility';

const mapStateToProps = state => {
  return {
    cart: state.cart,
    order: state.order,
    user: state.user
  };
};

const mapDispatchToProps = {
  postOrder: (order) => postOrder(order),
  updateOrder: (order) => updateOrder(order)
};

class OrderDetails extends Component {
  placeOrder = () => {
    this.props.postOrder({
      address: this.props.cart.shipping.address,
      city: this.props.cart.shipping.city,
      postal: this.props.cart.shipping.postal,
      country: this.props.cart.shipping.country,
      payment: this.props.cart.payment,
      items: this.props.cart.items,
      userId: this.props.user.user.id
    });
  }

  payOrder = () => {
    this.props.updateOrder({
      id: this.props.order.order.id,
      datePaid: true,
      dateDelivered: false
    });
  }

  deliverOrder = () => {
    this.props.updateOrder({
      id: this.props.order.order.id,
      datePaid: false,
      dateDelivered: true
    });
  }

  renderButton = (order, role = "customer") => {
    if (order.id) {
      if (role === "administrator") {
        if (order.datePaid.length > 0 && order.dateDelivered.length === 0) {
          return (
            <React.Fragment>
              <div className="divider" />
              <div className="w-100">
                <Button color="dark" className="btn-block" onClick={() => this.deliverOrder()}>MARK AS DELIVERED</Button>
              </div>
            </React.Fragment>
          );
        }
        return null;
      }
      else {
        if (order.datePaid.length === 0) {
          return (
            <React.Fragment>
              <div className="divider" />
              <div className="w-100">
                <Button color="transparent" className="btn-block btn-paypal" onClick={() => this.payOrder()}>&nbsp;</Button>
              </div>
            </React.Fragment>
          );
        }
        return null;
      }
    }
    return (
      <React.Fragment>
        <div className="divider" />
        <div className="w-100">
          <Button color="dark" className="btn-block" onClick={() => this.placeOrder()}>PLACE ORDER</Button>
        </div>
      </React.Fragment>
    );
  }

  render() {
    const userName = this.props.order.order.id ? this.props.order.order.userName : this.props.user.user.name;
    const userEmail = this.props.order.order.id ? this.props.order.order.userEmail : this.props.user.user.email;
    const shipping = this.props.order.order.id ? this.props.order.order.shipping : this.props.cart.shipping;
    const payment = this.props.order.order.id ? this.props.order.order.payment : this.props.cart.payment;
    const items = this.props.order.order.id ? this.props.order.order.items : this.props.cart.items;
    const datePaid = this.props.order.order.id ? this.props.order.order.datePaid : '';
    const dateDelivered = this.props.order.order.id ? this.props.order.order.dateDelivered : '';
    const subtotal = Utility.getSubtotal(items);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    return (
      <React.Fragment>
        {this.props.order.order.id &&
          <BreadcrumbGeneric href="/orders" text="Orders" active="Order Details" />
        }
        <div className="container">
          {!this.props.order.order.id &&
            <Checkout active="Place Order" />
          }
          {this.props.order.order.id &&
            <div className="text-center text-sm-left mt-5 mb-3">
              <h1>ORDER {this.props.order.order.id}</h1>
            </div>
          }
          <Row className="row-product">
            <Col sm={7} md={8} className="cart">
              <Row>
                <Col xs={12} className="text-center text-sm-left mb-3">
                  <h2>SHIPPING</h2>
                </Col>
                <Col className="col-shipping">
                  <div>Name:</div>
                  <div>{userName}</div>
                  <div className="w-100" />
                  <div>Email:</div>
                  <div>{userEmail}</div>
                  <div className="w-100" />
                  <div>Address:</div>
                  <div>{`${shipping.address}, ${shipping.city} ${shipping.postal}, ${shipping.country}`}</div>
                  {this.props.order.order.id &&
                    <Message
                      notitle
                      color={dateDelivered.length > 0 ? 'success' : 'danger'}
                      styling="w-100 mt-2"
                      message={dateDelivered.length > 0 ? `Delivered on ${Utility.formatDate(dateDelivered)}.` : 'Not delivered.'}
                    />
                  }
                  <div className="divider" />
                </Col>
              </Row>
              <Row>
                <Col xs={12} className="text-center text-sm-left mb-3">
                  <h2>PAYMENT METHOD</h2>
                </Col>
                <Col className="col-payment">
                  <div>Method:</div>
                  <div>{payment}</div>
                  {this.props.order.order.id &&
                    <Message
                      notitle
                      color={datePaid.length > 0 ? 'success' : 'danger'}
                      styling="w-100 mt-2"
                      message={datePaid.length > 0 ? `Paid on ${Utility.formatDate(datePaid)}.` : 'Not paid.'}
                    />
                  }
                  <div className="divider" />
                </Col>
              </Row>
              {items.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <Row className={index === items.length - 1 ? 'mb-5' : ''}>
                      {index === 0 &&
                        <Col xs={12} className="text-center-text-sm-left mb-3">
                          <h2>ORDER ITEMS</h2>
                        </Col>
                      }
                      <Col xs={2}>
                        <img src={item.image} alt={item.name} className="img-fluid img-shadow" />
                      </Col>
                      <Col xs={4} md={5}>
                        {item.name}
                      </Col>
                      <Col xs={6} md={5} className="text-right">
                        {item.quantity} &times; {Utility.formatCurrency(item.price)} = {Utility.formatCurrency(Number(item.quantity) * Number(item.price))}
                      </Col>
                    </Row>
                    {index < items.length - 1 &&
                      <Row>
                        <Col>
                          <div className="divider" />
                        </Col>
                      </Row>
                    }
                  </React.Fragment>
                );
              })}
            </Col>
            <Col sm={5} md={4} className="mt-sm-5 mb-5">
              <Card className="summary">
                <CardBody>
                  <div className="w-100">ORDER SUMMARY</div>
                  <div className="divider" />
                  <div>Items:</div>
                  <div>{Utility.formatCurrency(subtotal)}</div>
                  <div className="divider" />
                  <div>Shipping</div>
                  <div>$0.00</div>
                  <div className="divider" />
                  <div>Tax:</div>
                  <div>{Utility.formatCurrency(tax)}</div>
                  <div className="divider" />
                  <div>Total:</div>
                  <div>{Utility.formatCurrency(total)}</div>
                  {this.renderButton(this.props.order.order, this.props.user.user.role)}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderDetails));