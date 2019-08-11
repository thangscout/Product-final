import axios from 'axios';
import { URI_FETCH } from '../constant/index';
import STORE from '../stores';

export const getProducts = () => {
  STORE.dispatch({
    type: 'GET_PRODUCTS_REQUESTING',
    payload: null
  });

  axios.get(`${URI_FETCH}/products`)
    .then(resp => {
      let respt = resp.data;
      STORE.dispatch({
        type: 'GET_PRODUCTS',
        payload: respt.data
      })
    })
    .catch(err => console.log({ err }));
}