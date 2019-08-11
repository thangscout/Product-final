import React, { Fragment, Component } from 'react';
import { URI_FETCH} from '../../constant/index';
// import { Link } from 'react-router-dom';

class ProductDetail extends Component {
  constructor(props){
    super(props);
    this.state={}
  }
  render(){
  const { product, index, listCategories} = this.props;
  let category = listCategories.find(category => Object.is(category._id, product.categoryID))
  
    return(
      <Fragment>
        <tr key={index}>
          <th scope="row">{index + 1}</th>    
          <td>{product.title}</td>
          <td>{product.description}</td>
          <td>{product.price}</td>
          <td>{ category && category.title}</td>
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
            </button>
            <button type="button" className="btn ml-3" style={{padding: 0}}
              onClick={ e =>this._handleUpdate(e)}
            >
              Detail
              
            </button>
            
          </td>
        </tr>
      </Fragment>
    );
  }
}

export default ProductDetail;