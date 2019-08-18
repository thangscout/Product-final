import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import CartItem from './CartItem';
import {formatCurrency} from '../../helpers/formatCurrency'

class Carts extends Component {

  render(){
    const { carts: { carts, totalPrice, totalAmount} } = this.props;
    console.log({ carts, totalPrice})
    return(
      <Fragment>
        <div className="cart-menu">
          <i className="fa fa-opencart"></i> 
          <span>{carts.length}</span>
          <ul className="list-group">
            { 
              carts.length > 0 ? carts.map((item, index) => (
                <CartItem item={item} key={index}/>
              )) :
              <li className="list-group-item">
                No products in the Cart.
              </li>
            }
            <li className="list-group-item d-flex">
              <span>
                <b>Total Price:</b> {totalPrice ? formatCurrency(totalPrice) : formatCurrency(totalPrice)}
              </span>
              <span className="d-inline ml-auto">
                <b>Total Amount:</b> {totalAmount ? `${totalAmount} items` : `${totalAmount} item`}
              </span>
            </li>
          </ul>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  carts: state.carts
});

export default connect(mapStateToProps, null)(Carts);