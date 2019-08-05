import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';

export class Dashboard extends Component {
  render(){
    return(
      <Fragment>
        <nav className="nav">
          <span className="nav-link">
              <Link to="/dashboard/users">Users</Link>
          </span>
          <span className="nav-link">
              <Link to="/dashboard/products">Products</Link>
          </span>
          <span className="nav-link">
              <Link to="/dashboard/comments">comments</Link>
          </span>
          <span className="nav-link ml-auto">
              <button className="btn btn-danger" onClick={()=> this._handleLogout()}>Logout</button>
          </span>
      </nav>
    </Fragment>
  );
  }
}