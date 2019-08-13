import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { getProducts, removeProduct, getInfoProduct } from '../../actions/products';
import { Link } from 'react-router-dom';
import ProductsDetail from './Products-detail';
import ProductsFilter from './Products-filter';

class Products extends Component {

  componentDidMount = async () => {
    getProducts();
  }

  _handlecRemoveProduct = productID => {
    removeProduct(productID);
  }

  _handleGetInfoPrepareUpdate = productID => {
    getInfoProduct(productID);
  }

  render(){
    const { products: { listProduct, listCategories, requestingRemoveProduct, requestingGetInfoProduct }} = this.props;
    return(
      <Fragment>
        <div className="container-fluid">
          <h2>Products</h2>
          <div className="row">
            <div className="col-md-4">
              <Link to="/dashboard/products/create" className="btn btn-primary mb-3">New</Link>
            </div>
            <div className="col-md-8">
            <ProductsFilter/>
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
                listProduct && listProduct.length > 0 && listProduct.map((product, index)=> (
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
            </tbody>
          </table>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});
export default connect(mapStateToProps, null)(Products);