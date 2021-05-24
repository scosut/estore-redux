import React, { Component } from 'react';
import { Button, Form, FormFeedback, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import Message from './Message';
import { connect } from 'react-redux';
import { postReview, setInput, clearInput, clearErrors, clearMessage } from '../redux/actionCreators';
import Utility from '../shared/utility';

const mapStateToProps = state => {
  return {
    errors: state.errors,
    input: state.input,
    message: state.message,
    user: state.user
  };
};

const mapDispatchToProps = {
  postReview: (rating, comments, productId, userId) => postReview(rating, comments, productId, userId),
  clearInput: (item) => clearInput(item),
  setInput: (item, e) => setInput(item, e),
  clearMessage: () => clearMessage(),
  clearErrors: () => clearErrors()
};

class ProductReviews extends Component {
  componentDidMount = () => {
    this.props.clearMessage();
    this.props.clearInput('review');
    this.props.clearErrors();
  }

  handleInput = (e) => {
    this.props.setInput('review', e);
  }

  handleClick = () => {
    this.props.postReview(this.props.input.review.rating, this.props.input.review.comments, this.props.productId, this.props.user.user.id);
  }

  render() {
    const reviewByUser = this.props.reviews.filter(review => review.userId === this.props.user.user.id);
    const purchasedByUser = this.props.purchasers.filter(purchaser => purchaser === this.props.user.user.id);

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
          {this.props.user.user.role !== 'administrator' &&
            <React.Fragment>
              {this.props.reviews.length > 0 &&
                <div className="divider" />
              }
              {reviewByUser.length > 0 &&
                <Message color="success" message={`You reviewed this item on ${Utility.formatDate(reviewByUser[0].dateReviewed)}.`} />
              }
              {purchasedByUser.length > 0 && reviewByUser.length === 0 &&
                <React.Fragment>
                  <h2>WRITE A CUSTOMER REVIEW</h2>
                  <Form>
                    <FormGroup>
                      <Label for="rating">Rating</Label>
                      <Input type="select" name="rating" id="rating" className="flat" invalid={this.props.errors.errors.hasOwnProperty('rating')} onChange={(e) => this.handleInput(e)} value={this.props.input.review.rating}>
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
                      <Input type="textarea" name="comments" id="comments" className="flat" placeholder="Enter comments" invalid={this.props.errors.errors.hasOwnProperty('comments')} onChange={(e) => this.handleInput(e)} value={this.props.input.review.comments} />
                      <FormFeedback>{this.props.errors.errors.hasOwnProperty('comments') ? this.props.errors.errors.comments : ''}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Button color="dark" onClick={() => this.handleClick()}>SUBMIT</Button>
                    </FormGroup>
                  </Form>
                </React.Fragment>
              }
            </React.Fragment>
          }
        </Col>
      </Row>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductReviews);