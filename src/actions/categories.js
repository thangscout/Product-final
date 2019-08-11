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
        payload: respt.data
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
      // console.log({ respt})
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

export const removeCategory = categoryID => {
  
  STORE.dispatch({
    type: 'REMOVE_CATEGORY_REQUESTING',
    payload: {
      categoryID
    }
  });

  const URI = `${URI_FETCH}/categories/${categoryID}`;

  axios.delete(URI)
    .then( resp => {
      const respt = resp.data;
      const { data: { _id: categoryID}} = respt;
      STORE.dispatch({
        type: 'REMOVE_CATEGORY',
        payload: {
          categoryID
        }
      });

      STORE.dispatch({
        type: 'REMOVE_CATEGORY_DONE',
        payload: null
      })
    })
    .catch( err => {
      STORE.dispatch({
        type: 'REMOVE_CATEGORY_DONE',
        payload: null
      })
      console.log({ err: err.message })
    })
}

export const getInfoCategory = (categoryID, history) => {
  
  STORE.dispatch({
    type: 'GET_INFO_CATEGORY_REQUESTING',
    payload: {
      categoryID
    }
  })

  const URI = `${URI_FETCH}/categories/${categoryID}`;
  axios.get(URI)
    .then( resp => {
      const respt = resp.data;
      const { data: category } = respt;
      STORE.dispatch({
        type: 'GET_INFO_CATEGORY',
        payload: {
          category
        }
      });

      STORE.dispatch({
        type: 'GET_INFO_CATEGORY_DONE',
        payload: null
      })
    })
    .catch(err => {
      STORE.dispatch({
        type: 'GET_INFO_CATEGORY_DONE',
        payload: null
      })
      console.log({ err: err.message});
    })
}
export const updateInfoCategory = (categoryID, title, description, history) => {

  STORE.dispatch({
    type: 'UPDATE_CATEGORY_REQUESTING',
    payload: null
  });

  const URI = `${URI_FETCH}/categories/${categoryID}`;
  axios.put(URI, {title, description})
    .then(resp => {
      const respt = resp.data;
      const { data: categoryNew } = respt;
      STORE.dispatch({
        type: 'UPDATE_CATEGORY',
        payload: {
          category: categoryNew
        }
      });

      STORE.dispatch({
        type: 'UPDATE_CATEGORY_DONE',
        payload: null
      })
      history.goBack();
    })
    .catch(err => {
      STORE.dispatch({
        type: 'UPDATE_CATEGORY_DONE',
        payload: null
      })
      console.log({ err });
    })
}