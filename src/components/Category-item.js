import React, { Fragment, Component } from 'react';

class CategoryItem extends Component {
  render(){
    const {item} = this.props;
    return(
      <Fragment>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          {item.title}
          <span className="badge badge-success badge-pill">{item.products.length}</span>
        </li>
      </Fragment>
    );
  }
}

export default CategoryItem;
