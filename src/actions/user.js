import axios from 'axios';
import { URI_FETCH } from '../constant';
import STORE from '../stores';

export const loginRequest = ({ email, password, history}) => {
  return function(dispatch){
    dispatch({
      type: 'LOGIN_REQUEST',
      payload: null
    })

    return axios.post(`${URI_FETCH}/login`, { email, password })
      .then(resp => {
        const respt = resp.data;
        if(respt.error){
          dispatch({
            type: 'LOGIN_ERROR',
            payload: {
              message: respt.message
            }
          })
        }else if( !respt.error){
          localStorage.setItem('token', respt.data.token);
          dispatch({
            type: 'LOGIN_SUCCESSED',
            payload: {
              token: respt.data.token,
              isUser: respt.data.infoUser
            }
          });
          history.push('/');
        }
      })
      .catch(err => {
        dispatch({
          type: 'LOGIN_ERROR',
          payload: {
            message: err.message
          }
        })
      })
  }
}

export const refreshApp = () => {
  let token = localStorage.getItem('token');
  if(!token)
    return STORE.dispatch({
      type: 'CLEAR_TOKEN',
      payload: null
    })
  axios.get(`${URI_FETCH}/refresh-token/${token}`)
    .then( resp => {
      let respt = resp.data;
      return STORE.dispatch({
        type: 'LOGIN_SUCCESSED',
        payload: {
          token: respt.data.token,
          isUser: respt.data.infoUser
        }
      })
    })
    .catch(err => console.log({ err: err.message}));
}

export const registerRequest = (fullname, email, password, age, image, history) => {

  STORE.dispatch({
    type: 'REGISTER_REQUESTING',
    payload: null
  })

  const URI = `${URI_FETCH}/users`;
  const formData = new FormData();

  //Attach image
  formData.append('image', image);

  //Attach data
  const data = JSON.stringify({ fullname, email, password, age});
  formData.append('data', data);

  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }

  axios.post(URI, formData, config)
    .then(resp => {
      let respt = resp.data;
      if(respt.error){
        setTimeout(() => {
          STORE.dispatch({
            type:'REGISTER_ERROR',
            payload:{
              message: respt.message
            }
          })
        }, 1500)
      }else if( !respt.error){
        STORE.dispatch({
          type: 'REGISTER',
          payload: respt.data
        });
        STORE.dispatch({
          type: 'REGISTER_DONE',
          payload: null
        });
        history.goBack();
        console.log({history})
      }   
    })
    .catch(err => {
      STORE.dispatch({
        type: 'REGISTER_DONE',
        payload: null
      })
      console.log({ err })
    });
}

export const logout = () => {
  setTimeout(() => {
    localStorage.removeItem('token');
    STORE.dispatch({
      type: 'CLEAR_TOKEN',
      payload: null
    });
  }, 1500);
}

export const updateInfoUser = (userID, fullname, email, password, age, image) => {
  STORE.dispatch({
    type: 'UPDATE_USER_REQUESTING',
    payload: null
  });

  const URI = `${URI_FETCH}/users/${userID}`;
  const formData = new FormData();
  formData.append('image', image);

  const data = JSON.stringify({ fullname, email, password, age});
  formData.append('data', data);

  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }

  axios.put(URI, formData, config)
    .then(resp => {
      const respt = resp.data;
      console.log({ respt})
      const { data: userNew} = respt;
      STORE.dispatch({
        type: 'UPDATE_USER',
        payload: {
          user: userNew
        }
      });
      STORE.dispatch({
        type: 'UPDATE_USER_DONE',
        payload: null
      });
    })
    .catch(err => {
      STORE.dispatch({
        type: 'UPDATE_USER_DONE',
        payload: null
      })
      console.log({ err });
    })

}