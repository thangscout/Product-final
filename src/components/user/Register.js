import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { registerRequest } from '../../actions/user';

class Register extends Component {
  state = {
    fullname:'',
    email: '',
    password: '',
    age: '',
    image: null
  }

  _handleChangeValue = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  _handleChangeFile = e => {
    this.setState({
      image: e.target.files[0]
    })
  }

  _handleSubmitRegister = e => {
    e.preventDefault();
    
    const { fullname, email, password, age, image } = this.state;
    const { history} = this.props;
    registerRequest( fullname, email, password, age, image, history );
  }

  render(){
    // const { fullname, email, password, age, image } = this.state;
    // console.log({ fullname, email, password, age, image })
    let { users: {requestingRegister, messageError} } = this.props;
    // let { listUser } = this.props;
    // console.log({listUser})
    return(
      <Fragment>
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-6 col-xs-12">
            <h2 className="mt-5 mb-4">Register</h2>
              <form method="post">
                <div className="form-group ">
                  <label className="control-label requiredField" htmlFor="fullname">
                    Fullname
                    <span className="asteriskField">
                      *
                    </span>
                  </label>
                  <input  className="form-control" 
                          name="fullname" 
                          type="text"
                          // value={fullname}
                          onChange={e => this._handleChangeValue(e)} />
                </div>
                <div className="form-group ">
                  <label className="control-label requiredField" htmlFor="email">
                    Email
                    <span className="asteriskField">
                      *
                    </span>
                  </label>
                  <input  className="form-control" 
                          name="email" 
                          type="text"
                          // value={email}
                          onChange={e => this._handleChangeValue(e)}  />
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
                          // value={password}
                          onChange={e => this._handleChangeValue(e)}  />
                </div>
                <div className="form-group ">
                  <label className="control-label " htmlFor="age">
                    Age
                  </label>
                  <input  className="form-control" 
                          name="age" 
                          type="number"
                          // value={age}
                          onChange={e => this._handleChangeValue(e)}  />
                </div>
                <div className="form-group ">
                  <label className="control-label " htmlFor="avatar">
                    Avatar
                  </label>
                  <div className="row">
                    <div className="col-md-6">
                        <input  name="image" 
                                type="file" 
                                onChange={e => this._handleChangeFile(e)}
                        />
                    </div>
                  </div>
                </div>
                <div className="form-group pt-3 mb-5">
                  <div>
                    <button className="btn btn-primary" 
                            name="submit" 
                            type="submit"
                            onClick={e => this._handleSubmitRegister(e)}>
                      Register
                      {requestingRegister ? <span className="spinner-border spinner-border-sm ml-2" role="status" aria-hidden="true"></span> : ''}
                    </button>
                    <p>{messageError}</p>
                  </div>
                </div>
              </form>
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

export default connect( mapStateToProps, null)(Register);