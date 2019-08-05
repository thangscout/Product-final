import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { PublicRoute } from './helpers';
import { Home, Dashboard } from './components';
import Login from './components/Login';

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
      </Router>
    </>
  );
}

export default App;
