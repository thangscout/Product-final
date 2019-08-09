import axios from 'axios';
import { URI_FETCH } from '../constant/index';
import STORE from '../stores';

export const getCategories = () => {
  STORE.dispatch({
    type:'GET_CATEGORIES_REQUESTING',
    payload: null
  })
  axios.get(`${URI_FETCH}/categories`)
    .then(resp =>{
      let respt = resp.data;
      STORE.dispatch({
        type: 'GET_CATEGORIES',
        payload: respt.categories
      })
    })
    .catch(err => console.log({ err}));
}

export const addCategory = (title, description, history) => {

  STORE.dispatch({
    type: 'ADD_CATEGORY_REQUESTING',
    payload: null
  });

  axios.post(`${URI_FETCH}/categories`, { title, description})
    .then(resp => {
      let respt = resp.data;
      console.log({ respt})
      STORE.dispatch({
        type: 'ADD_CATEGORY',
        payload: respt.data
      });
      STORE.dispatch({
        type: 'ADD_CATEGORY_DONE',
        payload: null
      })
      history.goBack();
    })
    .catch(err => {
      STORE.dispatch({
        type: 'ADD_CATEGORY_DONE',
        payload: null
      })
      console.log({ err})
    });
}