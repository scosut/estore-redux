import React, { Component } from 'react';
import { Button, Card, CardBody, CardTitle, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import BreadcrumbGeneric from './BreadcrumbGeneric';
import Message from "./Message";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { productImport, postProduct, updateProduct, productResetInput, productUpdateInput, clearErrors, clearMessage } from '../redux/actionCreators';

const mapStateToProps = state => {
  return {
    errors: state.errors,
    product: state.product,
    message: state.message
  };
};

const mapDispatchToProps = {
  productImport: (product) => productImport(product),
  postProduct: (name, price, image, brand, quantity, description) => postProduct(name, price, image, brand, quantity, description),
  updateProduct: (id, name, price, image, brand, quantity, description) => updateProduct(id, name, price, image, brand, quantity, description),
  productResetInput: () => productResetInput(),
  productUpdateInput: (e) => productUpdateInput(e),
  clearMessage: () => clearMessage(),
  clearErrors: () => clearErrors()
};

class ProductForm extends Component {
  componentDidMount = () => {
    this.props.clearMessage();
    this.props.productResetInput();
    this.props.clearErrors();
    const productId = this.props.match.params.productId;
    if (productId) {
      const product = this.props.products.filter(product => product.id === productId)[0];
      this.props.productImport(product);
    }
  }

  handleInput = (e) => {
    this.props.productUpdateInput(e);
  }

  handleClick = (productId) => {
    const obj = {
      name: this.props.product.name,
      price: this.props.product.price,
      image: this.props.product.image,
      brand: this.props.product.brand,
      quantity: this.props.product.quantity,
      description: this.props.product.description
    };

    if (productId) {
      obj.id = productId;
      this.props.updateProduct(obj);
    }
    else {
      this.props.postProduct(obj);
    }
  }

  render() {
    return (
      <React.Fragment>
        <BreadcrumbGeneric href="/products" text="Products" active={this.props.product.id ? 'Edit' : 'Add'} />
        <div className="container">
          {this.props.message.message &&
            <Message color="success" message={this.props.message.message} styling="alert-form mt-5 mx-auto" />
          }
          <Card className="card-form mt-5 mb-5">
            <CardTitle tag="div">
              <h1>{this.props.product.id ? 'EDIT' : 'ADD'} PRODUCT</h1>
            </CardTitle>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="name" className="col-form-label">Name</Label>
                  <Input type="text" name="name" id="name" className="flat" placeholder="Enter name" invalid={this.props.errors.errors.hasOwnProperty('name')} onChange={(e) => this.handleInput(e)} value={this.props.product.name} />
                  <FormFeedback>{this.props.errors.errors.hasOwnProperty('name') ? this.props.errors.errors.name : ''}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="price" className="col-form-label">Price</Label>
                  <Input type="text" name="price" id="price" className="flat" placeholder="Enter price" invalid={this.props.errors.errors.hasOwnProperty('price')} onChange={(e) => this.handleInput(e)} value={this.props.product.price} />
                  <FormFeedback>{this.props.errors.errors.hasOwnProperty('price') ? this.props.errors.errors.price : ''}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="image" className="col-form-label">Image</Label>
                  <div className="custom-file">
                    <Input type="file" id="image" name="image" className="custom-file-input" accept="image/gif, image/jpeg, image/png" />
                    <Label className="form-control flat custom-file-label" for="image">Select image</Label>
                  </div>
                  {this.props.product.image && <img src={this.props.product.image} alt={this.props.product.name} className="custom-file-img" />}
                </FormGroup>
                <FormGroup>
                  <Label for="brand" className="col-form-label">Brand</Label>
                  <Input type="text" name="brand" id="brand" className="flat" placeholder="Enter brand" invalid={this.props.errors.errors.hasOwnProperty('brand')} onChange={(e) => this.handleInput(e)} value={this.props.product.brand} />
                  <FormFeedback>{this.props.errors.errors.hasOwnProperty('brand') ? this.props.errors.errors.brand : ''}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="inStock" className="col-form-label">Number in Stock</Label>
                  <Input type="text" name="quantity" id="quantity" className="flat" placeholder="Enter number" invalid={this.props.errors.errors.hasOwnProperty('quantity')} onChange={(e) => this.handleInput(e)} value={this.props.product.quantity} />
                  <FormFeedback>{this.props.errors.errors.hasOwnProperty('quantity') ? this.props.errors.errors.quantity : ''}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="description" className="col-form-label">Description</Label>
                  <Input type="textarea" name="description" id="description" className="flat" placeholder="Enter description" invalid={this.props.errors.errors.hasOwnProperty('description')} onChange={(e) => this.handleInput(e)} value={this.props.product.description} />
                  <FormFeedback>{this.props.errors.errors.hasOwnProperty('description') ? this.props.errors.errors.description : ''}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Button color="dark" onClick={() => this.handleClick(this.props.product.id)}>{this.props.product.id ? 'UPDATE' : 'ADD'}</Button>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductForm));