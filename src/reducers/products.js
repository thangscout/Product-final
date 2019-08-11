const initState = {
  listProduct: [],
  listCategories: []
}

export default function productReducer( state = initState, action){
  switch(action.type){
    case 'GET_PRODUCTS':
      return {
        ...state,
        listProduct: action.payload.products,
        listCategories: action.payload.categories
      }
    default:
      return state;
  }
}
