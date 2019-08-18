import React, { Fragment, Component } from 'react';

class SortItem extends Component {
  
  state = {
    sort: ''
  }

  _handleChangeSort = e => {
    const { _handleChangeSortProduct } = this.props;
    this.setState({
      sort: e.target.value
    });

    _handleChangeSortProduct(e.target.value)
  }

  render(){

    const { sort } = this.state;

    return(
      <Fragment>
          <div className="col-md-4 ml-auto mb-4">
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
      </Fragment>
    );
  }
}

export default SortItem;