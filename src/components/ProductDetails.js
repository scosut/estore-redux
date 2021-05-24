import React, { Component } from 'react';
import { Button, Card, CardBody, Input, Col, Row } from 'reactstrap';
import BreadcrumbGeneric from './BreadcrumbGeneric';
import ProductReviews from './ProductReviews';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProductById, addItem, deleteItem, updateItemQuantity, setInput, setInputFromObject, clearInput } from '../redux/actionCreators';

const mapStateToProps = state => {
  return {
    cart: state.cart,
    input: state.input,
    product: state.product,
    user: state.user
  };
};

const mapDispatchToProps = {
  fetchProductById: (productId) => fetchProductById(productId),
  addItem: (item) => addItem(item),
  deleteItem: (item) => deleteItem(item),
  clearInput: (item) => clearInput(item),
  setInput: (item, e) => setInput(item, e),
  setInputFromObject: (item, obj) => setInputFromObject(item, obj),
  updateItemQuantity: (item, quantity) => updateItemQuantity(item, quantity)
};

class ProductDetails extends Component {
  componentDidMount = () => {
    const productId = this.props.match.params.productId;
    this.props.fetchProductById(productId);
    this.props.clearInput('item');

    const cartItem = this.getItemFromCart(productId);
    const quantity = cartItem ? cartItem.quantity : "1";
    this.props.setInputFromObject('item', { quantity: quantity });
  }

  getItemFromCart = (productId) => {
    const cartItem = this.props.cart.items.filter(item => item.productId === productId);
    return cartItem.length > 0 ? cartItem[0] : null;
  }

  handleInput = (e) => {
    if (e.target.value.length === 0) {
      return;
    }

    this.props.setInput('item', e);
  }

  handleClick = (cartItem) => {
    if (cartItem) {
      if (Number(this.props.input.item.quantity) > 0) {
        this.props.updateItemQuantity(cartItem, this.props.input.item.quantity);
      }
      else {
        this.props.deleteItem(cartItem);
        this.props.setInputFromObject('item', { quantity: "1" });
      }
    }
    else {
      this.props.addItem({ quantity: this.props.input.item.quantity, productId: this.props.product.product.id, name: this.props.product.product.name, price: this.props.product.product.price, image: this.props.product.product.image });
    }
  }

  render() {
    const { product } = this.props.product;
    const quantityOptions = [...Array(Number(product.quantity) + 1).keys()];
    const cartItem = this.getItemFromCart(product.id);

    return (
      <React.Fragment>
        <BreadcrumbGeneric href="/" text="Home" active="Product Details" />
        <div className="container mt-5">
          <Row className="row-product">
            <Col sm={2} md={4} className="mb-5">
              <img src={product.image} alt={product.name} className="img-fluid img-shadow" />
            </Col>
            <Col sm={5} md={4} className="mb-5">
              <div className="product">
                <div>{product.name}</div>
                <div className="divider"></div>
                <div className={product.reviewRating}>
                  {product.reviewCount} reviews
                </div>
                <div className="divider"></div>
                <div>Price: {product.price}</div>
                <div className="divider"></div>
                <div>Description: {product.description}</div>
              </div>
            </Col>
            <Col sm={5} md={4} className="mb-5">
              <Card className="summary">
                <CardBody>
                  <div>Price:</div>
                  <div>{product.price}</div>
                  <div className="divider"></div>
                  <div>Status:</div>
                  <div>{Number(product.quantity) > 0 ? 'In Stock' : 'Out of Stock'}</div>
                  {Number(product.quantity) > 0 &&
                    <React.Fragment>
                      <div className="divider"></div>
                      <div>Quantity:</div>
                      <div>
                        <Input type="select" name="quantity" id="quantity" className="flat w-auto" onChange={(e) => this.handleInput(e)} value={this.props.input.item.quantity}>
                          {quantityOptions.filter(i => cartItem ? i >= 0 : i > 0).map(i =>
                            <option key={i} disabled={cartItem && i === Number(this.props.input.item.quantity)}>{i}</option>)
                          }
                        </Input>
                      </div>
                      {this.props.user.user.role !== 'administrator' &&
                        <React.Fragment>
                          <div className="divider"></div>
                          <div className="w-100">
                            <Button color="dark" className="btn-block" onClick={() => this.handleClick(cartItem)}>{cartItem ? 'UPDATE QUANTITY' : 'ADD TO CART'}</Button>
                          </div>
                        </React.Fragment>
                      }
                    </React.Fragment>
                  }
                </CardBody>
              </Card>
            </Col>
          </Row>
          <ProductReviews reviews={product.reviews} purchasers={product.purchasers} productId={product.id} />
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductDetails));