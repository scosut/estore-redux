import React, { Component } from 'react';
import { Button, Card, CardBody, Input, Col, Row } from 'reactstrap';
import BreadcrumbGeneric from './BreadcrumbGeneric';
import ProductReviews from './ProductReviews';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProductById } from '../redux/actionCreators';

const mapStateToProps = state => {
  return {
    product: state.product
  };
};

const mapDispatchToProps = {
  fetchProductById: (productId) => fetchProductById(productId)
};

class ProductDetails extends Component {
  componentDidMount = () => {
    const productId = this.props.match.params.productId;
    this.props.fetchProductById(productId);
  }

  render() {
    const { product } = this.props.product;
    const quantityOptions = [...Array(Number(product.quantity) + 1).keys()];

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
                  <div>{product.quantity > 0 ? 'In Stock' : 'Out of Stock'}</div>
                  <div className="divider"></div>
                  <div>Quantity:</div>
                  <div>
                    <Input type="select" name="qty" id="qty" className="flat w-auto">
                      {quantityOptions.filter(i => i > 0).map(i =>
                        <option key={i}>{i}</option>)
                      }
                    </Input>
                  </div>
                  <div className="divider"></div>
                  <div className="w-100">
                    <Button color="dark" className="btn-block">ADD TO CART</Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <ProductReviews reviews={product.reviews} productId={product.id} userId="4" />
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductDetails));