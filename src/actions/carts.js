// import STORE from '../stores';

export const addCart = (product, quantity) => {
  return dispatch => {
    return dispatch({
      type: 'ADD_CART',
      payload: {
        product, quantity
      }
    })
  } 
}

export const removeCart = productID => {
  return dispatch => {
    return dispatch({
      type: 'REMOVE_CART',
      payload: productID
    })
  }
}