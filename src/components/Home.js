import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../actions/products';
import ProductItem from './Product-item';
import Carts from './carts/Carts';

class Home extends Component {

  componentDidMount = async () => {
    getProducts();
  }

  render(){
    const { products:{ listProduct, listCategories } } = this.props;
    return(
      <Fragment>
        <div className="container-fluid mt-5">
          <Carts/>
          <div className="row">
            <div className="col-md-2">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid placeat ad ipsum.
            </div>
            <div className="col-md-10">
              <div className="row justify-content-between">
                {
                  listProduct && listProduct.length > 0 && listProduct.map((product, index) => (
                    <ProductItem 
                      product={product}
                      key={index}
                      listCategories={listCategories}
                    />
                  ))
                }
                </div>
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

export default connect(mapStateToProps, null)(Home);
