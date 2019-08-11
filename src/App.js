import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { PublicRoute, PrivateRoute } from './helpers';
import { Home, Dashboard } from './components';
import Login from './components/Login';
import Register from './components/user/Register';
import Users from './components/Users';
import Products from './components/products/Products';
import Categories from './components/categories/Categories';
import CategoriesCreate from './components/categories/Categories-create';
import ProductsCreate from './components/products/Products-create';


function App() {
  return (
    <>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">MernStack</Link>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav w-100">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item ml-auto">
                <Link className="btn btn-outline-success" to="/login">Login</Link>
              </li>
            </ul>
          </div>
        </nav>
        <PublicRoute exact path='/' component={Home}/>
        <PublicRoute path='/login' component={Login}/>
        <PublicRoute path='/users' component={Register}/>
        <PrivateRoute path='/dashboard' component={Dashboard}/>
        <PrivateRoute path='/dashboard/users' component={Users}/>
        <PrivateRoute path='/dashboard/products' component={Products}/>
        <PrivateRoute exact path='/dashboard/categories' component={Categories}/>
        <PrivateRoute path='/dashboard/categories/create' component={CategoriesCreate}/>
        <PrivateRoute path='/dashboard/products/create' component={ProductsCreate}/>
      </Router>
    </>
  );
}

export default App;
