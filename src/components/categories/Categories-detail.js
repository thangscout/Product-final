import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';

class CategoriesDetail extends Component {
  constructor(props){
    super(props);
    this.state= {}
  }

  _handleRemove = e => {
    e.preventDefault();
    const { category:{ _id: categoryID}, _handleRemoveCategory} = this.props;
    console.log(categoryID)
    _handleRemoveCategory(categoryID);
  }

  _handleUpdate = e => {
    e.preventDefault();
    const { category: { _id: categoryID}, _handleGetInfoPrepareUpdate} = this.props;
    _handleGetInfoPrepareUpdate(categoryID);
  }

  render(){
    const { category, index, requestingRemoveCategory} = this.props;
    let products = category.products.map(item => item.title);
    // console.log(av.join())
    return(
      <Fragment>
        <tr key={index}>
          <th scope="row">{index + 1}</th>    
          <td>{category.title}</td>
          <td>{category.description}</td>
          <td>{products.join(', ')}</td>
          <td>
            <button type="button" className="btn btn-danger"
              onClick={ e =>this._handleRemove(e)}
            >
              Remove
              {requestingRemoveCategory && category._id === requestingRemoveCategory ? <span className="spinner-border spinner-border-sm ml-2" role="status" aria-hidden="true"></span> : ''}
            </button>
            <button type="button" className="btn ml-3" style={{padding: 0}}
              onClick={ e =>this._handleUpdate(e)}
            >
              <Link to="/dashboard/categories/create" className="btn btn-info" >Detail</Link>
              
              {/* {requestingGetInfoCategory && category._id === requestingGetInfoCategory ? <span className="spinner-border spinner-border-sm ml-2" role="status" aria-hidden="true"></span> : ''} */}
            </button>
            {/* <Link to="/dashboard/categories/create" className="btn btn-primary mb-3" onClick={ e =>this._handleUpdate(e)}>Detail</Link> */}
          </td>
        </tr>
      </Fragment>
    );
  }
}

export default CategoriesDetail;