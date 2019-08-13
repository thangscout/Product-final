import React, { Fragment, Component } from 'react';

class ProductsFilter extends Component {
  render(){
    return(
      <Fragment>
        <div className="row">
          <div className="col-md-8">
            <input 
              className="form-control" 
              type="text" 
              name="textKey" 
              // value={textKey}
              // onChange={e => this._handleFilter(e)}
              placeholder="Nhập Tên Sản Phẩm">
                </input>
          </div>
          <div className="col-md-4">
            <select 
              className="form-control" 
              name="sort"
              // onChange={e => this._handleChangeSort(e)}
              // value={sort}
              >
              <option value="">Bộ Lọc</option>
              <option value="lowest">Giá tăng dần</option>
              <option value="highest">Giá giảm dần</option>
            </select>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ProductsFilter;