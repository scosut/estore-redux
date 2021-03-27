import React, { Component } from 'react';
import { Button, Form, FormFeedback, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import Message from './Message';
import { connect } from 'react-redux';
import { postReview, reviewUpdateInput, reviewResetInput, clearErrors, clearMessage } from '../redux/actionCreators';
import Utility from '../shared/utility';

const mapStateToProps = state => {
  return {
    errors: state.errors,
    message: state.message,
    review: state.review
  };
};

const mapDispatchToProps = {
  postReview: (rating, comments, productId, userId) => postReview(rating, comments, productId, userId),
  reviewResetInput: () => reviewResetInput(),
  reviewUpdateInput: (e) => reviewUpdateInput(e),
  clearMessage: () => clearMessage(),
  clearErrors: () => clearErrors()
};

class ProductReviews extends Component {
  componentDidMount = () => {
    this.props.clearMessage();
    this.props.reviewResetInput();
    this.props.clearErrors();
  }

  handleInput = (e) => {
    this.props.reviewUpdateInput(e);
  }

  handleClick = () => {
    this.props.postReview(this.props.review.rating, this.props.review.comments, this.props.productId, this.props.userId);
  }

  render() {
    return (
      <Row>
        <Col className="col-review mb-5">
          {this.props.reviews.length > 0 &&
            <h2>REVIEWS</h2>
          }
          {this.props.reviews.map((review, index, arr) => {
            return (
              <div key={review.id}>
                <p>{review.userName}</p>
                <p className={`review-${review.rating}-0`}></p>
                <p>{Utility.formatDate(review.dateReviewed)}</p>
                <p className="review-text">{review.comments}</p>
                {index < arr.length - 1 &&
                  <div className="divider" />
                }
              </div>
            );
          })
          }
          <React.Fragment>
            {this.props.reviews.length > 0 &&
              <div className="divider" />
            }
            <h2>WRITE A CUSTOMER REVIEW</h2>
            {this.props.message.message &&
              <Message color="success" message={this.props.message.message} />
            }
            <Form>
              <FormGroup>
                <Label for="rating">Rating</Label>
                <Input type="select" name="rating" id="rating" className="flat" invalid={this.props.errors.errors.hasOwnProperty('rating')} onChange={(e) => this.handleInput(e)} value={this.props.review.rating}>
                  <option></option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
                <FormFeedback>{this.props.errors.errors.hasOwnProperty('rating') ? this.props.errors.errors.rating : ''}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="comments">Comments</Label>
                <Input type="textarea" name="comments" id="comments" className="flat" placeholder="Enter comments" invalid={this.props.errors.errors.hasOwnProperty('comments')} onChange={(e) => this.handleInput(e)} value={this.props.review.comments} />
                <FormFeedback>{this.props.errors.errors.hasOwnProperty('comments') ? this.props.errors.errors.comments : ''}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Button color="dark" onClick={() => this.handleClick()}>SUBMIT</Button>
              </FormGroup>
            </Form>
          </React.Fragment>
        </Col>
      </Row>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductReviews);