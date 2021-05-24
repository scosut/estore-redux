import React, { Component } from 'react';
import { UncontrolledTooltip, Table } from 'reactstrap';
import ModalGeneric from './ModalGeneric';
import PaginationBottom from './PaginationBottom';
import Utility from '../shared/utility';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleModal, deleteProduct, setPageIndex } from '../redux/actionCreators';

const mapStateToProps = state => {
  return {
    modal: state.modal,
    page: state.page,
    product: state.product
  };
};

const mapDispatchToProps = {
  toggleModal: (item) => toggleModal(item),
  setPageIndex: (index) => setPageIndex(index),
  deleteProduct: (id) => deleteProduct(id)
};

class ProductDashboard extends Component {
  pageHandler = (index, e) => {
    e.preventDefault();

    this.props.setPageIndex(index);
  }

  deleteHandler = (id) => {
    this.props.deleteProduct(id);
    this.props.toggleModal();
  }

  render() {
    const pages = Utility.getPages(10, this.props.products);

    return (
      <div className="container">
        <div className="d-flex align-items-center justify-content-between mt-5 mb-3">
          <h1>PRODUCTS</h1>
          <Link to="/products/add">
            <i id="addProductLink" className="fa fa-plus-circle text-success" />
          </Link>
          <UncontrolledTooltip boundariesElement="window" placement="bottom" target="addProductLink">
            add product
          </UncontrolledTooltip>
        </div>
        {pages.length > 0 &&
          <div className="table-responsive">
            <Table className="table-bordered table-striped" style={{ minWidth: '500px' }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>BRAND</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {pages[this.props.page.index].map((product, index) => {
                  return (
                    <tr key={index}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.brand}</td>
                      <td>
                        <Link to={`/products/edit/${product.id}`}>
                          <i id={`editProductLink${product.id}`} className="fa fa-pencil text-success mr-2" />
                        </Link>
                        <UncontrolledTooltip boundariesElement="window" placement="bottom" target={`editProductLink${product.id}`}>
                          edit product
                      </UncontrolledTooltip>
                        <i id={`deleteProductLink${product.id}`} className="fa fa-trash text-success" onClick={() => this.props.toggleModal({ id: product.id, name: product.name })} />
                        <UncontrolledTooltip boundariesElement="window" placement="bottom" target={`deleteProductLink${product.id}`}>
                          delete product
                      </UncontrolledTooltip>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              {pages.length > 1 &&
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
        <ModalGeneric
          body={`You have chosen to delete the ${this.props.modal.item.name} from your inventory.`}
          confirmHandler={() => this.deleteHandler(this.props.modal.item.id)}
          isOpen={this.props.modal.modalOpen}
          title="Delete Product"
          toggle={this.props.toggleModal} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDashboard);