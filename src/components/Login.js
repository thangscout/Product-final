import React, { Fragment, Component } from 'react';
import { loginRequest } from '../actions/user';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../App.css';

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  _handleChange = e => {
    const { name, value} = e.target;
    this.setState({
      [name]: value
    })
  }

  _handleSubmitLogin = e => {
    e.preventDefault();

    const { email, password} = this.state;
    let { loginRequest, history } = this.props;
    loginRequest({ email, password, history});
  }

  render(){
    const { email, password} = this.state;
    const { users: { submittingLogin, messageError } } = this.props;
    return(
      <Fragment> 
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-6 col-xs-12 mb-5">
              <h2 className="mt-5 mb-4">Login</h2>
              {
                messageError && <p className="alert alert-danger pt-2 pb-2" role="alert">
                  {Object.is(messageError, 'EMAIL_NOT_EXIST') && 'Email is existence'}
                  {Object.is(messageError, 'PASSWORD_NOT_MATCHING') && 'Password not matching'}
                  {Object.is(messageError, 'ERR_HTTP_HEADERS_SENT') && 'Cannot conntect to sever'}
                  {/* {messageError && 'Cannot conntect to sever'} */}
                </p>
              }
              <form method="post">
                <div className="form-group ">
                  <label className="control-label requiredField" htmlFor="email">
                    Email
                    <span className="asteriskField">
                      *
                    </span>
                  </label>
                  <input  className="form-control" 
                          name="email" 
                          type="email"
                          value={email}
                          onChange={e => this._handleChange(e)} />
                </div>
                <div className="form-group ">
                  <label className="control-label requiredField" htmlFor="password">
                    Password
                    <span className="asteriskField">
                      *
                    </span>
                  </label>
                  <input  className="form-control" 
                          name="password" 
                          type="text"
                          value={password}
                          onChange={e => this._handleChange(e)} />
                </div>
                <div className="form-group pt-3">
                  <div>
                    <button className="btn btn-primary " 
                            name="submit" 
                            type="submit"
                            onClick={e => this._handleSubmitLogin(e)} >
                      Login
                      {submittingLogin ? <span className="spinner-border spinner-border-sm ml-2" role="status" aria-hidden="true"></span> : ''}
                    </button>
                  </div>
                </div>
              </form>
              <Link to='/users'>Register</Link> for a new account.
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps, {loginRequest})(Login);