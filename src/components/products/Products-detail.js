import React, { Fragment, Component } from 'react';
import { URI_FETCH} from '../../constant/index';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../helpers'

class ProductDetail extends Component {
  constructor(props){
    super(props);
    this.state={}
  }

  _handleRemove = e => {
    e.preventDefault();
    const { product: { _id: productID}, _handlecRemoveProduct} = this.props;
    _handlecRemoveProduct(productID);
  }

  _handleUpdate = e => {
    e.preventDefault();
    const {product: { _id: productID}, _handleGetInfoPrepareUpdate} = this.props;
    _handleGetInfoPrepareUpdate(productID);
  }

  render(){
    const { product, index, listCategories, requestingRemoveProduct} = this.props;
    let category = listCategories.find(category => Object.is(category._id, product.categoryID));
    return(
      <Fragment>
        <tr key={index}>
          <th scope="row">{index + 1}</th>    
          <td>{product.title && product.title}</td>
          <td>{product.description && product.description}</td>
          <td>{product.price && formatCurrency(product.price)}</td>
          <td>{category && category.title}</td>
          <td>
            <img src={product.image ? `${URI_FETCH}/images/products/${product.image}` : 'https://via.placeholder.com/100' } 
            alt=""
            style={{width:100}}/>
          </td>
          <td>
            <button type="button" className="btn btn-danger"
              onClick={ e =>this._handleRemove(e)}
            >
              Remove
              {requestingRemoveProduct && product._id === requestingRemoveProduct ? <span className="spinner-border spinner-border-sm ml-2" role="status" aria-hidden="true"></span> : ''}
            </button>
            <button type="button" className="btn ml-3" style={{padding: 0}}
              onClick={ e =>this._handleUpdate(e)}
            >
              <Link to="/dashboard/products/create" className="btn btn-info" >Detail</Link>
              
            </button>
            
          </td>
        </tr>
      </Fragment>
    );
  }
}

export default ProductDetail;