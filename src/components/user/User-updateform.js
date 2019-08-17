import React, { Fragment, Component } from 'react';
import { updateInfoUser} from '../../actions/user';
import { connect} from 'react-redux';
import { URI_FETCH} from '../../constant';

class FormUser extends Component {
  constructor(props){
    super(props);
    this.state = {
      fullname:'',
      email: '',
      password: '',
      age: '',
      image: null,
      userID: ''
    }
  }
  

  _handleChangeValue = e => {
    const { name, value } = e.target;
    if(value < 1){
      return;
    }
    this.setState({
      [name]: value
    })
  }

  _handleChangeFile = e => {
    this.setState({
      image: e.target.files[0],
      nameImage: e.target.files[0].name
    })
  }

  _handleSubmitUpdate = e => {
    e.preventDefault();

    const { userID, fullname, email, password, age, image} = this.state;
    updateInfoUser(userID, fullname, email, password, age, image)
  }

  componentDidUpdate(prevProps, prevState){
    const { userID } = prevState;
    const { isUser } = this.props;

    if(isUser && userID !== isUser._id){
      const { fullname, email, password, age, image, _id } = isUser;
      this.setState({
        fullname, email, password, age, userID: _id, nameImage: image
      })
    }
  }

  render(){
    const { fullname, email, age, nameImage} = this.state;
    let { users: {updatingInfo} } = this.props;

    return(
      <Fragment>
        <div className="row">
          <div className="col-md-6">
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
                        value={fullname}
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
                        value={email}
                        onChange={e => this._handleChangeValue(e)}  />
              </div>
              <div className="form-group ">
                <label className="control-label " htmlFor="age">
                  Age
                </label>
                <input  className="form-control" 
                        name="age" 
                        type="number"
                        value={age}
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
                  <div className="col-md-6 d-flex">
                      <img className="ml-auto rounded-circle" 
                      src={nameImage && nameImage.length > 0 ? `${URI_FETCH}/images/users/${nameImage}` : "https://via.placeholder.com/150"}
                      alt="" width={150}
                      />
                    </div>
                </div>
              </div>
              <div className="form-group pt-3 mb-5">
                <div>
                  <button className="btn btn-primary" 
                          name="submit" 
                          type="submit"
                          onClick={e => this._handleSubmitUpdate(e)}>
                    Update
                    {updatingInfo ? <span className="spinner-border spinner-border-sm ml-2" role="status" aria-hidden="true"></span> : ''}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>        
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
});
export default connect(mapStateToProps, null) (FormUser);