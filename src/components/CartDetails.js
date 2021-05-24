import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Input, Row, UncontrolledTooltip } from 'reactstrap';
import ModalGeneric from './ModalGeneric';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteItem, updateItemQuantity, toggleModal } from '../redux/actionCreators';
import Utility from '../shared/utility';

const mapStateToProps = state => {
  return {
    cart: state.cart,
    input: state.input,
    modal: state.modal,
    products: state.products,
    user: state.user
  };
};

const mapDispatchToProps = {
  toggleModal: (item) => toggleModal(item),
  deleteItem: (item) => deleteItem(item),
  updateItemQuantity: (item, quantity) => updateItemQuantity(item, quantity)
};

const CartItem = ({ hasDivider, item, productQuantity, quantityHandler, toggle }) => {
  return (
    <React.Fragment>
      <Row>
        <Col xs={3} lg={2}>
          <img src={item.image} alt={item.name} className="img-fluid img-shadow" />
        </Col>
        <Col xs={3} lg={4}>
          {item.name}
        </Col>
        <Col xs={2}>
          {item.price}
        </Col>
        <Col xs={2}>
          <Input type="select" name="quantity" id="quantity" className="flat w-auto" value={item.quantity} onChange={(e) => quantityHandler(item, e)}>
            {[...Array(Number(productQuantity)).keys()].map(i =>
              <option key={i} disabled={(i + 1) === Number(item.quantity)}>{i + 1}</option>)
            }
          </Input>
        </Col>
        <Col>
          <i id={`deleteItemLink${item.id}`} className="fa fa-trash text-success" onClick={() => toggle({ id: item.id, name: item.name })} />
          <UncontrolledTooltip boundariesElement="window" placement="bottom" target={`deleteItemLink${item.id}`}>
            Delete item
          </UncontrolledTooltip>
        </Col>
      </Row>
      {hasDivider && <div className="divider" />}
    </React.Fragment>
  );
}

class CartDetails extends Component {
  componentDidMount = () => {
    this.props.cart.items.forEach(item => {
      const productQuantity = this.props.products.products.filter(product => product.id === item.productId)[0].quantity;

      if (Number(item.quantity) > Number(productQuantity)) {
        this.props.updateItemQuantity(item, productQuantity);
      }
    });
  }

  componentDidUpdate = () => {
    if (this.props.cart.items.length === 0) {
      this.props.history.push('/');
    }
  }

  quantityHandler = (item, e) => {
    this.props.updateItemQuantity(item, e.target.value);
  }

  deleteHandler = (id) => {
    const cartItem = this.props.cart.items.filter(item => item.id === id)[0];
    this.props.deleteItem(cartItem);
    this.props.toggleModal();
  }

  render() {
    const totalQuantity = Utility.getTotalQuantity(this.props.cart.items);
    const subtotal = Utility.getSubtotal(this.props.cart.items);

    return (
      <div className="container">
        <div className="text-center text-sm-left mt-5 mb-3">
          <h1>SHOPPING CART</h1>
        </div>
        <Row className="row-product">
          <Col sm={7} md={8} className="mb-5 cart">
            {this.props.cart.items.map((item, index, arr) => {
              return (
                <CartItem
                  hasDivider={index < arr.length - 1}
                  item={item}
                  productQuantity={this.props.products.products.filter(product => product.id === item.productId)[0].quantity}
                  key={item.id}
                  quantityHandler={this.quantityHandler}
                  toggle={this.props.toggleModal} />
              )
            })}
          </Col>
          <Col sm={5} md={4} className="mb-5">
            <Card className="summary">
              <CardBody className="flex-column">
                <div>{`SUBTOTAL (${totalQuantity} ITEM${totalQuantity !== 1 ? 'S' : ''}):`}</div>
                <div>{Utility.formatCurrency(subtotal)}</div>
                <div className="divider" />
                <div className="w-100">
                  <Button
                    color="dark"
                    className="btn-block"
                    tag={Link}
                    to={this.props.user.user.id ? '/checkout/shipping' : '/checkout/signIn'}>
                    CHECKOUT
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <ModalGeneric
          body={`You have chosen to delete the ${this.props.modal.item.name} from your cart.`}
          confirmHandler={() => this.deleteHandler(this.props.modal.item.id)}
          isOpen={this.props.modal.modalOpen}
          title="Delete Item"
          toggle={this.props.toggleModal} />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartDetails));