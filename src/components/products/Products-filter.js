import React, { Fragment, Component } from 'react';

class ProductsFilter extends Component {
  
  state = {
    textKey: '',
    sort: ''
  }
  
  _handleFilter = e => {
    const { _handleFilterProduct } = this.props;
    this.setState({
      textKey: e.target.value
    });
    _handleFilterProduct(e.target.value)
  }

  _handleChangeSort = e => {
    const { _handleChangeSortProduct } = this.props;
    this.setState({
      sort: e.target.value
    });

    _handleChangeSortProduct(e.target.value)
  }

  render(){

    const { textKey, sort } = this.state;

    return(
      <Fragment>
        <div className="row">
          <div className="col-md-8">
            <input 
              className="form-control" 
              type="text" 
              name="textKey" 
              value={textKey}
              onChange={e => this._handleFilter(e)}
              placeholder="Enter product name">
            </input>
          </div>
          <div className="col-md-4">
            <select 
              className="form-control" 
              name="sort"
              onChange={e => this._handleChangeSort(e)}
              value={sort}
              style={{cursor: 'pointer'}}
              >
              <option value="">Default sorting</option>
              <option value="lowest">Low to Hight</option>
              <option value="highest">Hight to Low</option>
            </select>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ProductsFilter;