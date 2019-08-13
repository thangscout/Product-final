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

export const addProduct = (title, description, price, categoryID, image, history ) => {
  STORE.dispatch({
    type: 'ADD_PRODUCT_REQUESTING',
    payload: null
  });

  const URI = `${URI_FETCH}/products`;
  const formData = new FormData();
  formData.append('image', image);

  const data = JSON.stringify({ title, description, price, categoryID });
  formData.append('data', data);

  console.log({title, description, price, categoryID, image})
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }

  axios.post(URI, formData, config)
    .then(resp => {
      let respt = resp.data;
      console.log({ resp})
      STORE.dispatch({
        type: 'ADD_PRODUCT',
        payload: respt.data
      });
      STORE.dispatch({
        type: 'ADD_PRODUCT_DONE',
        payload: null
      });
      // history.goBack();
      history.push('/dashboard/products');
    })
    .catch(err => {
      STORE.dispatch({
        type: 'ADD_PRODUCT_DONE',
        payload: null
      })
      console.log({ err })
    });
}

export const removeProduct = productID => {
  
  STORE.dispatch({
    type: 'REMOVE_PRODUCT_REQUESTING',
    payload: {
      productID
    }
  });

  const URI = `${URI_FETCH}/products/${productID}`;

  axios.delete(URI)
    .then( resp => {
      const respt = resp.data;
      const { data: { _id: productID}} = respt;
      STORE.dispatch({
        type: 'REMOVE_PRODUCT',
        payload: {
          productID
        }
      });

      STORE.dispatch({
        type: 'REMOVE_PRODUCT_DONE',
        payload: null
      })
    })
    .catch( err => {
      STORE.dispatch({
        type: 'REMOVE_PRODUCT_DONE',
        payload: null
      })
      console.log({ err: err.message })
    })
}

export const getInfoProduct = (productID, history) => {
  
  STORE.dispatch({
    type: 'GET_INFO_PRODUCT_REQUESTING',
    payload: {
      productID
    }
  })

  const URI = `${URI_FETCH}/products/${productID}`;
  axios.get(URI)
    .then( resp => {
      const respt = resp.data;
      const { data: product } = respt;
      STORE.dispatch({
        type: 'GET_INFO_PRODUCT',
        payload: {
          product
        }
      });

      STORE.dispatch({
        type: 'GET_INFO_PRODUCT_DONE',
        payload: null
      })
    })
    .catch(err => {
      STORE.dispatch({
        type: 'GET_INFO_PRODUCT_DONE',
        payload: null
      })
      console.log({ err: err.message});
    })
}

export const updateInfoProduct = (productID, title, description, price, categoryID, image) => {
  STORE.dispatch({
    type: 'UPDATE_PRODUCT_REQUESTING',
    payload: null
  });

  const URI = `${URI_FETCH}/products/${productID}`;
  const formData = new FormData();
  formData.append('image', image);

  const data = JSON.stringify({ title, description, price, categoryID});
  formData.append('data', data);

  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }

  axios.put(URI, formData, config)
    .then(resp => {
      const respt = resp.data;
      console.log({respt, resp})
      const { data: productNew} = respt;
      console.log({productNew})
      STORE.dispatch({
        type: 'UPDATE_PRODUCT',
        payload: {
          product: productNew
        }
      });
      STORE.dispatch({
        type: 'UPDATE_PRODUCT_DONE',
        payload: null
      })
    })
    .catch(err => {
      STORE.dispatch({
        type: 'UPDATE_PRODUCT_DONE',
        payload: null
      })
      console.log({ err });
    })

}