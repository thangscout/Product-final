import React, { Fragment, Component } from 'react';
import { URI_FETCH } from '../../constant';
import { removeCart } from '../../actions/carts';
import { connect } from 'react-redux';
import { formatCurrency } from '../../helpers/formatCurrency'

class CartItem extends Component {

  _handleRemoveItem = e => {
    e.preventDefault();
    const { item: { product: { _id: productID} }, removeCart} = this.props;
    removeCart(productID);
    // console.log({ productID });
  }
  render(){
  const { item } = this.props;
    return(
      <Fragment>
        <li className="list-group-item d-flex">
          <img className="rounded mr-4" 
          src={
            item.product.image ? `${URI_FETCH}/images/products/${item.product.image}` :
            'https://via.placeholder.com/100'
          }
          alt="" width={100}/>
          <p className="d-inline">{item.product && item.product.title} </p>
          <span className="ml-1">{ item.product.price && formatCurrency(item.product.price)}</span>
          <strong  className="ml-1">x {item.quantity}</strong>
          <button className="btn btn-danger ml-auto align-self-start"
            onClick={e => this._handleRemoveItem(e)}
          >
            Remove
          </button>
        </li>
      </Fragment>
    );
  }
}

export default connect(null, { removeCart })(CartItem);