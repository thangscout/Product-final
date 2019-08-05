import axios from 'axios';
import { URI_FETCH } from '../constant';
import STORE from '../stores';

export const loginRequest = ({ email, password, history}) => {
  console.log({ _: email, __: password});
  return function(dispatch){
    dispatch({
      type: 'LOGIN_REQUEST',
      payload: null
    })

    return axios.post(`${URI_FETCH}/login`, { email, password })
      .then(resp => {
        const respt = resp.data;
        console.log({ respt, resp})
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
              email: respt.data.email,
              token: respt.data.token
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