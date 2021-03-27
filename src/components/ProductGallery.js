import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import BreadcrumbGeneric from './BreadcrumbGeneric';
import ProductCarousel from './ProductCarousel';
import PaginationBottom from './PaginationBottom';
import Utility from "../shared/utility";
import { connect } from 'react-redux';
import { setPageIndex } from '../redux/actionCreators';

const mapStateToProps = state => {
  return {
    page: state.page
  };
};

const mapDispatchToProps = {
  setPageIndex: (index) => setPageIndex(index)
};

class ProductGallery extends Component {
  componentDidMount = () => {
    this.props.setPageIndex(0);
  }

  pageHandler = (index, e) => {
    e.preventDefault();

    this.props.setPageIndex(index);
  }

  render() {
    if (this.props.isLoading) {
      return (
        <div className="container">
          <h1>Loading...</h1>
        </div>
      );
    }
    if (this.props.errMess) {
      return (
        <div className="container">
          <h1>{this.props.errMess}</h1>
        </div>
      );
    }
    if (this.props.products) {
      const pages = Utility.getPages(6, this.props.products);

      return (
        <React.Fragment>
          {!this.props.search &&
            <ProductCarousel products={pages[0].slice(0, 3)} />
          }
          {this.props.search &&
            <BreadcrumbGeneric href="/" text="Home" active="Search" />
          }
          <div className="container">
            <div className="text-center text-sm-left mt-5 mb-3">
              <h1>{this.props.search ? 'SEARCH RESULTS' : 'AVAILABLE PRODUCTS'}</h1>
            </div>
            {pages.length > 0 &&
              <Row>
                {pages[this.props.page.index].map(product => {
                  return (
                    <Col key={product.id} sm={6} md={4} className="mb-5">
                      <Card>
                        <Link to={`/product-details/${product.id}`}>
                          <CardImg top className="img-shadow" src={product.image} alt={product.name} />
                        </Link>
                        <CardBody>
                          <CardTitle tag="h5">{product.name}</CardTitle>
                          <p className={product.reviewRating}>
                            {`${product.reviewCount} review${product.reviewCount !== 1 ? 's' : ''}`}
                          </p>
                          <CardText>{product.price}</CardText>
                        </CardBody>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            }
            {pages.length === 0 &&
              <Row>
                <Col>No matches found.</Col>
              </Row>
            }
            <PaginationBottom
              numPages={pages.length}
              pageHandler={this.pageHandler}
              pageIndex={this.props.page.index} />
          </div>
        </React.Fragment>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductGallery);