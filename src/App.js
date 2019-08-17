import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { PublicRoute, PrivateRoute } from './helpers';
import { Dashboard } from './components';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/user/Register';
import User from './components/user/User';
import Products from './components/products/Products';
import Categories from './components/categories/Categories';
import CategoriesCreate from './components/categories/Categories-create';
import ProductsCreate from './components/products/Products-create';
import { connect } from 'react-redux';
import UserMenu from './components/user/User-menu';

class App extends Component {

  render(){
    const { users} = this.props;
    console.log({ users})
    return (
    <>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">MernStack</Link>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav w-100 align-items-center">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item ml-auto " style={{padding:'.5rem 0'}}>
                {
                  users.isUser ?
                  <UserMenu isUser={users.isUser}/>
                  : <Link className="btn btn-outline-success" to="/login" >Login</Link>
                }
              </li>
            </ul>
          </div>
        </nav>
        <PublicRoute exact path='/' component={Home}/>
        <PublicRoute path='/login' component={Login}/>
        <PublicRoute path='/users' component={Register}/>
        <PrivateRoute path='/dashboard' component={Dashboard}/>
        <PrivateRoute path='/dashboard/my-account' component={User}/>
        <PrivateRoute exact path='/dashboard/products' component={Products}/>
        <PrivateRoute exact path='/dashboard/categories' component={Categories}/>
        <PrivateRoute path='/dashboard/categories/create' component={CategoriesCreate}/>
        <PrivateRoute path='/dashboard/products/create' component={ProductsCreate}/>
      </Router>
    </>
  );
  }
  
}

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps, null)(App);
