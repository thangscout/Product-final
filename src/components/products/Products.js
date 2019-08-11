import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../../actions/products';
import { Link } from 'react-router-dom';
import ProductsDetail from './Products-detail';

class Products extends Component {

  componentDidMount = async () => {
    getProducts();
  }

  render(){
    const { products: { listProduct, listCategories }} = this.props;
    return(
      <Fragment>
        <div className="container-fluid">
          <h2>Products</h2>
          <Link to="/dashboard/products/create" className="btn btn-primary mb-3">New</Link>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">categoryID</th>
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