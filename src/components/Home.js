import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../actions/products';
import { getCategories } from '../actions/categories';
import ProductItem from './Product-item';
import CategoryItem from './Category-item';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import FilterItem from '../components/Filter-item';

class Home extends Component {
  state = {
    startIndex: '',
    endIndex: '',
    totalRecords: '',
    totalPages: '',
    pageLimit: 12,
    currentPage: '',
    listProduct: null
  }

  componentDidMount = async () => {
    getProducts();
    getCategories();
  }

  showProducts = listProduct => {
    var result = null;
    if(listProduct.length > 0){
      result = listProduct.map((product, index)=> (
        <ProductItem 
        product={product}
        key={index}
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

  _handleChangeSortProduct = sort => {
    const { listProduct } = this.state;
    switch(sort){
      case 'lowest': {
        let newListProduct = listProduct.sort(( a, b ) => a.price - b.price);
        return this.setState({
          listProduct: newListProduct
        })
      }
      case 'highest': {
        let newListProduct = listProduct.sort(( a, b) => b.price - a.price);
        return this.setState({
          listProduct: newListProduct
        })
      }
      default: {
        return listProduct;
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { listProduct: listProductsPrevState } = prevState;
    const { listProduct } = this.props.products; //STORE

    if( listProduct && listProduct !== listProductsPrevState) {
      this.setState({
        listProduct
      })
    }
  }

  render(){
    // let { products:{ listProduct }, categories: {listCategories}} = this.props;
    let { categories: {listCategories}} = this.props;
    const { startIndex, endIndex, pageLimit, currentPage, totalPages, listProduct, sort} = this.state;
    let rowsPerPage = [];
    if(listProduct && listProduct.length > 0){
      rowsPerPage = listProduct.slice(startIndex, endIndex + 1);
    }
    console.log({listCategories})
    return(
      <Fragment>
        <div className="container-fluid mt-5 mb-5">
          <div className="row">
            <div className="col-md-2">
             <div className="sibar-categories">
                <h3 className="categories-title"><Link to="/dashboard/categories">Categories</Link></h3>
                <ul className="list-group">
                  {
                    listCategories.length > 0 && listCategories.map((item, index)=> (
                      <CategoryItem item={item} key={index}/> 
                    ))
                  }
                </ul>
             </div>
            </div>
            <div className="col-md-10">
              <div className="row">
                <FilterItem
                  sort={sort}
                  _handleChangeSortProduct={this._handleChangeSortProduct}
                />
              </div>
              <div className="row">
                {
                  listProduct && listProduct.length > 0 && this.showProducts(rowsPerPage)
                }
              </div>
              <div className="row">
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
          </div>
        </div>
        
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products,
  categories: state.categories
});

export default connect(mapStateToProps, null)(Home);
