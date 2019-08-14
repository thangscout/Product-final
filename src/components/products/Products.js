import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { getProducts, removeProduct, getInfoProduct } from '../../actions/products';
import { Link } from 'react-router-dom';
import ProductsDetail from './Products-detail';
import ProductsFilter from './Products-filter';
import Pagination from '../Pagination';

class Products extends Component {

  state = {
    startIndex: '',
    endIndex: '',
    totalRecords: '',
    totalPages: '',
    pageLimit: 6,
    currentPage: ''
  }

  componentDidMount = async () => {
    getProducts();
  }

  _handlecRemoveProduct = productID => {
    removeProduct(productID);
  }

  _handleGetInfoPrepareUpdate = productID => {
    getInfoProduct(productID);
  }

  showProducts = listProduct => {
    const { products: { listCategories, requestingRemoveProduct, requestingGetInfoProduct }} = this.props;
    var result = null;
    if(listProduct.length > 0){
      result = listProduct.map((product, index)=> (
        <ProductsDetail 
          product={product}
          key={index}
          index={index}
          listCategories={listCategories}
          _handlecRemoveProduct={this._handlecRemoveProduct}
          requestingRemoveProduct={requestingRemoveProduct}
          _handleGetInfoPrepareUpdate={this._handleGetInfoPrepareUpdate}
          requestingGetInfoProduct={requestingGetInfoProduct}
        />
      ))
    }
    
    return result;
  }

  onChangePage = data => {
    this.setState({
      totalPages: data.totalPages,
      currentPage: data.page,
      startIndex: data.startIndex,
      endIndex: data.endIndex
    });
  }

  render(){
    const { products: { listProduct}} = this.props;
    const { startIndex, endIndex, pageLimit, currentPage, totalPages} = this.state;
    
    let rowsPerPage = [];
    if(listProduct && listProduct.length > 0){
      rowsPerPage = listProduct.slice(startIndex, endIndex + 1);
    }

    return(
      <Fragment>
        <div className="container-fluid">
          <h2>Products</h2>
          <div className="row">
            <div className="col-md-4">
              <Link to="/dashboard/products/create" className="btn btn-primary mb-3">New</Link>
            </div>
            <div className="col-md-8">
            <ProductsFilter
              _handleFilterProduct={this._handleFilterProduct}
            />
            </div>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">Category</th>
                <th scope="col">Image</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                listProduct && listProduct.length > 0 && this.showProducts(rowsPerPage)
              }
            </tbody>
          </table>
          <div className="row">
            <div className="col-md-12 box_pagination_info text-right">
              <p>
                {listProduct && listProduct.length > 0 && listProduct.length} results | page {currentPage}/{totalPages}
              </p>
            </div>
            <div className="col-md-12 d-flex justify-content-center">
              {
                listProduct && listProduct.length > 0 ?
                  <Pagination
                    totalRecords={ listProduct.length}
                    pageLimit={pageLimit || 10}
                    initialPage={1}
                    pagesToShow={5}
                    onChangePage={this.onChangePage}
                  /> : ''
              }
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});
export default connect(mapStateToProps, null)(Products);