import React, { Fragment, Component } from 'react';
import { URI_FETCH } from '../constant';
import { formatCurrency } from '../helpers';
import { addCart } from '../actions/carts';
import { connect } from 'react-redux';

class ProductItem extends Component {
  state = {
    quantity: 1
  }

  _handleChange = e => {
    const { name, value } = e.target;
    if(value < 1){
      return;
    }
    this.setState({
      [name]: value
    })
  }

  _handleSubmitAddToCart = e => {
    e.preventDefault();
    const { quantity } = this.state;
    const { product, addCart } = this.props;
    console.log({ quantity, product})
    addCart(product, quantity)
  }

  render(){
    const { product } = this.props;
    const { quantity } = this.state;
    // let category = listCategories.find(category => Object.is(category._id, product.categoryID));
    return(
      <Fragment>
        <div className="card mb-5" style={{width: '16rem', margin: '0 12px'}}>
        <img src={product.image ? `${URI_FETCH}/images/products/${product.image}` : 'https://via.placeholder.com/100' } 
          alt=""
          className="card-img-top"
        />
        <div className="card-body">
          <h4 className="card-title">{product.title && product.title}</h4>
          <p className="card-description"
            style={{webkitBoxOrient: "vertical"}}
          >
            {product.description && product.description}
          </p>
          {/* <p className="card-text font-italic">{category && category.title}</p> */}
          <b className="card-text d-block mb-3">{product.price && formatCurrency(product.price)}</b>
          <div className="d-flex">
            <button className="btn btn-success"
              onClick={e => this._handleSubmitAddToCart(e)}
            >
              Add to Cart
            </button>
            <input className="form-control ml-3" type="number" name="quantity" value={quantity}
              style={{width: "40%"}}
              onChange={e => this._handleChange(e)}
            />
          </div>
        </div>
      </div>
      </Fragment>
    );
  }
}

export default connect(null, { addCart }) (ProductItem);