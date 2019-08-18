import React, { Fragment, Component } from 'react';

class FilterItem extends Component {
  state = {
    textKey: ''
  }
  
  _handleFilter = e => {
    const { _handleFilterProduct } = this.props;
    this.setState({
      textKey: e.target.value
    });
    _handleFilterProduct(e.target.value)
  }
  render(){
    const { textKey } = this.state;
    return(
      <Fragment>
        <input 
          className="form-control" 
          type="text" 
          name="textKey" 
          value={textKey}
          onChange={e => this._handleFilter(e)}
          placeholder="Enter product name">
        </input>
      </Fragment>
    );
  }
}

export default FilterItem;