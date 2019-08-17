import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';

export class Dashboard extends Component {
  render(){
    return(
      <Fragment>
        <nav className="nav">
          <span className="nav-link">
            <Link to="/dashboard/my-account">My account</Link>
          </span>
          <span className="nav-link">
            <Link to="/dashboard/products">Products</Link>
          </span>
          <span className="nav-link">
            <Link to="/dashboard/categories">Categories</Link>
          </span>
      </nav>
    </Fragment>
  );
  }
}