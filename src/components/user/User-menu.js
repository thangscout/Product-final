import React, { Fragment, Component } from 'react';
import {URI_FETCH} from '../../constant';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/user';

class UserMenu extends Component {

  _handleLogout = () => {
    logout();
  }
  render(){
    const { isUser } = this.props;
    return(
      <Fragment>
        <div className='user-menu'>
          <img className="rounded-circle" src={isUser.image ? `${URI_FETCH}/images/users/${isUser.image}` : 'https://via.placeholder.com/100' } 
            alt=""
            width={50}
          />
          <div className="card" style={{width: '18rem'}}>
            <div className="card-user">
              <div className="card-user-img">
                <img className="rounded-circle" src={isUser.image ? `${URI_FETCH}/images/users/${isUser.image}` : 'https://via.placeholder.com/100' } 
                alt=""
                width={50}
              />
              </div>
              <div className="card-user-info">
                <p className="card-user-info-title">{isUser.fullname}</p>
                <p className="card-user-info-email">{isUser.email}</p>
              </div>
            </div>
            <ul className="list-group">
              <li className="list-group-item list-group-item-action" style={{borderWidth: '0', borderRadius:'0', padding: '0'}}>
                <Link to="/dashboard/my-account" style={{padding: '.75rem 1.25rem', display: 'block'}}><i className="fa fa-user-circle"></i>Profile</Link>
              </li>
              <li className="list-group-item list-group-item-action" onClick={()=> this._handleLogout()} style={{borderWidth: '0'}}>
                <i className="fa fa-sign-out"></i>Logout
              </li>
            </ul>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default UserMenu;