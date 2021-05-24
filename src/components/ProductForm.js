import React, { Component } from 'react';
import { Button, Card, CardBody, CardTitle, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import BreadcrumbGeneric from './BreadcrumbGeneric';
import Message from "./Message";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postProduct, updateProduct, clearInput, setInput, setInputFromObject, clearErrors, clearMessage } from '../redux/actionCreators';

const mapStateToProps = state => {
  return {
    errors: state.errors,
    input: state.input,
    message: state.message,
    product: state.product
  };
};

const mapDispatchToProps = {
  clearInput: (item) => clearInput(item),
  setInput: (item, e) => setInput(item, e),
  setInputFromObject: (item, obj) => setInputFromObject(item, obj),
  postProduct: (name, price, image, brand, quantity, description) => postProduct(name, price, image, brand, quantity, description),
  updateProduct: (id, name, price, image, brand, quantity, description) => updateProduct(id, name, price, image, brand, quantity, description),
  clearMessage: () => clearMessage(),
  clearErrors: () => clearErrors()
};

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFile: null
    }
  }

  componentDidMount = () => {
    this.props.clearMessage();
    this.props.clearInput('product');
    this.props.clearErrors();
    const productId = this.props.match.params.productId;
    if (productId) {
      const product = this.props.products.filter(product => product.id === productId)[0];
      this.props.setInputFromObject('product', {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
        quantity: product.quantity,
        description: product.description
      });
    }
  }

  handleImageFile = (e) => {
    this.setState({ imageFile: e.target.files[0] });
  }

  handleInput = (e) => {
    this.props.setInput('product', e);
  }

  handleClick = (productId) => {
    window.scrollTo(0, 0);

    const obj = {
      name: this.props.input.product.name,
      price: this.props.input.product.price,
      image: this.state.imageFile,
      brand: this.props.input.product.brand,
      quantity: this.props.input.product.quantity,
      description: this.props.input.product.description
    };

    if (productId) {
      obj.id = productId;
      this.props.updateProduct(obj);
    }
    else {
      this.props.postProduct(obj);
    }

    this.setState({ imageFile: null });
  }

  render() {
    return (
      <React.Fragment>
        <BreadcrumbGeneric href="/products" text="Products" active={this.props.edit ? 'Edit' : 'Add'} />
        <div className="container">
          {this.props.message.message &&
            <Message color="success" message={this.props.message.message} styling="alert-form mt-5 mx-auto" />
          }
          <Card className="card-form mt-5 mb-5">
            <CardTitle tag="div">
              <h1>{this.props.edit ? 'EDIT' : 'ADD'} PRODUCT</h1>
            </CardTitle>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="name" className="col-form-label">Name</Label>
                  <Input type="text" name="name" id="name" className="flat" placeholder="Enter name" invalid={this.props.errors.errors.hasOwnProperty('name')} onChange={(e) => this.handleInput(e)} value={this.props.input.product.name} />
                  <FormFeedback>{this.props.errors.errors.hasOwnProperty('name') ? this.props.errors.errors.name : ''}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="price" className="col-form-label">Price</Label>
                  <Input type="text" name="price" id="price" className="flat" placeholder="Enter price" invalid={this.props.errors.errors.hasOwnProperty('price')} onChange={(e) => this.handleInput(e)} value={this.props.input.product.price} />
                  <FormFeedback>{this.props.errors.errors.hasOwnProperty('price') ? this.props.errors.errors.price : ''}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="image" className="col-form-label">Image</Label>
                  <div className="custom-file">
                    <Input type="file" id="image" name="image" className="custom-file-input" accept="image/gif, image/jpeg, image/png" onChange={(e) => this.handleImageFile(e)} />
                    <Label className={this.props.errors.errors.hasOwnProperty('image') ? 'form-control flat custom-file-label is-invalid' : 'form-control flat custom-file-label'} for="image">{this.state.imageFile ? this.state.imageFile.name : 'Select image'}</Label>
                    <FormFeedback>{this.props.errors.errors.hasOwnProperty('image') ? this.props.errors.errors.image : ''}</FormFeedback>
                  </div>
                  {(this.props.edit && this.props.input.product.image) && <img src={`${this.props.input.product.image}?${new Date().toISOString()}`} alt="uploaded product graphic" className="custom-file-img" />}
                </FormGroup>
                <FormGroup>
                  <Label for="brand" className="col-form-label">Brand</Label>
                  <Input type="text" name="brand" id="brand" className="flat" placeholder="Enter brand" invalid={this.props.errors.errors.hasOwnProperty('brand')} onChange={(e) => this.handleInput(e)} value={this.props.input.product.brand} />
                  <FormFeedback>{this.props.errors.errors.hasOwnProperty('brand') ? this.props.errors.errors.brand : ''}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="inStock" className="col-form-label">Number in Stock</Label>
                  <Input type="text" name="quantity" id="quantity" className="flat" placeholder="Enter number" invalid={this.props.errors.errors.hasOwnProperty('quantity')} onChange={(e) => this.handleInput(e)} value={this.props.input.product.quantity} />
                  <FormFeedback>{this.props.errors.errors.hasOwnProperty('quantity') ? this.props.errors.errors.quantity : ''}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="description" className="col-form-label">Description</Label>
                  <Input type="textarea" name="description" id="description" className="flat" placeholder="Enter description" invalid={this.props.errors.errors.hasOwnProperty('description')} onChange={(e) => this.handleInput(e)} value={this.props.input.product.description} />
                  <FormFeedback>{this.props.errors.errors.hasOwnProperty('description') ? this.props.errors.errors.description : ''}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Button color="dark" onClick={() => this.handleClick(this.props.input.product.id)}>{this.props.edit ? 'UPDATE' : 'ADD'}</Button>
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