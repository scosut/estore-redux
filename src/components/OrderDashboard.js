import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import PaginationBottom from './PaginationBottom';
import Utility from '../shared/utility';
import { connect } from 'react-redux';
import { setPageIndex, fetchOrders, fetchOrderById, clearOrder } from '../redux/actionCreators';

const mapStateToProps = state => {
  return {
    order: state.order,
    orders: state.orders,
    page: state.page,
    user: state.user
  };
};

const mapDispatchToProps = {
  setPageIndex: (index) => setPageIndex(index),
  fetchOrders: (user) => fetchOrders(user),
  fetchOrderById: (orderId) => fetchOrderById(orderId),
  clearOrder: () => clearOrder()
};

class OrderDashboard extends Component {
  componentDidMount = () => {
    this.props.fetchOrders(this.props.user.user);
    this.props.clearOrder();
  }

  pageHandler = (index, e) => {
    e.preventDefault();

    this.props.setPageIndex(index);
  }

  componentDidUpdate() {
    if (this.props.order.order.id) {
      this.props.history.push(`/order-details/${this.props.order.order.id}`);
    }
  }

  gotoOrderDetails = (orderId) => {
    this.props.fetchOrderById(orderId);
  }

  render() {
    if (this.props.orders.isLoading) {
      return (
        <div className="container">
          <h1>Loading...</h1>
        </div>
      );
    }
    if (this.props.orders.errMess) {
      return (
        <div className="container">
          <h1>{this.props.orders.errMess}</h1>
        </div>
      );
    }
    if (this.props.orders.orders) {
      const pages = Utility.getPages(10, this.props.orders.orders);

      return (
        <div className="container">
          <div className="d-flex align-items-center justify-content-between mt-5 mb-3">
            <h1>ORDERS</h1>
          </div>
          {pages.length > 0 &&
            <div className="table-responsive">
              <Table className="table-bordered table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>USER</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                  </tr>
                </thead>
                <tbody>
                  {pages[this.props.page.index].map((order, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <Button color="link" className="table-link" onClick={() => this.gotoOrderDetails(order.id)}>
                            {order.id}
                          </Button>
                        </td>
                        <td>{order.userName}</td>
                        <td>{Utility.formatDate(order.datePlaced)}</td>
                        <td>{Utility.formatCurrency(Number(order.subtotal) * (1 + 0.1))}</td>
                        <td>{Utility.formatDate(order.datePaid)}</td>
                        <td>{order.dateDelivered.length > 0 ? Utility.formatDate(order.dateDelivered) : <i className="fa fa-times text-danger" />}</td>
                      </tr>
                    );
                  })}
                </tbody>
                {
                  pages.length > 1 &&
                  <tfoot>
                    <tr>
                      <td colSpan="6" className="p-0 pt-5">
                        <PaginationBottom
                          numPages={pages.length}
                          pageHandler={this.pageHandler}
                          pageIndex={this.props.page.index} />
                      </td>
                    </tr>
                  </tfoot>
                }
              </Table>
            </div>
          }
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDashboard);