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
        <div className="row mb-5">
          <div className="col-12 col-md-6">
            <h6>List Cart</h6> 
            <ul className="list-group">
              { 
                carts && carts.length > 0 && carts.map((item, index) => (
                  <CartItem item={item} key={index}/>
                ))
              }
              <li className="list-group-item d-flex">
                <span>Total Price: {totalPrice ? formatCurrency(totalPrice) : formatCurrency(totalPrice)}</span>
                <span className="d-inline ml-auto">Total Amount: {totalAmount ? `${totalAmount} items` : `${totalAmount} item`}</span>
              </li>
            </ul>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  carts: state.carts
});

export default connect(mapStateToProps, null)(Carts);