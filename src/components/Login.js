import React, { Fragment, Component } from 'react';

class Login extends Component {
  state ={
    email: '',
    password: ''
  }

  _handleChange = e => {
    const { name, value} = e.target;
    this.setState({
      [name]: value
    })
  }

  _handleSubmit = e => {
    e.preventDefault();

  }
  render(){
    const {} = this.state;
    return(
      <Fragment> 
        <div className="bootstrap-iso">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-6 col-xs-12 ">
                <h2 className="mt-5 mb-4">Login</h2>
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
                              onClick={e => this._handleSubmit(e)}>
                        Login
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Login;