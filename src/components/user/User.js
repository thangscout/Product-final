import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import FormUser from './User-updateform';

class User extends Component {

  state = {
    isUser: ''
  }

  componentDidUpdate(prevProps, prevState) {
    let { isUser: isUserPrevState} = prevState;
    const { isUser } = this.props.users; //STORE

    if( isUser && isUser !== isUserPrevState) {
      this.setState({
        isUser
      })
    }
}

  render(){
    const {isUser} = this.state;
    return(
      <Fragment>
        <div className="container-fluid">
          <h2 className="mb-3">My Account</h2>
          <FormUser isUser={isUser}/>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
});
export default connect(mapStateToProps, null)(User);