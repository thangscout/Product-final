const initState = {
  listCategories: [],
  requestingAddCategory: false
}

export default function productReducer( state = initState, action ){
  switch(action.type){
    case 'GET_CATEGORIES':
      return {
        ...state,
        listCategories: action.payload
      };
    case 'ADD_CATEGORY':
      return {
        ...state,
        listCategories: [...state.listCategories , action.payload]
      }
    case 'ADD_CATEGORY_REQUESTING':
      return {
        ...state,
        requestingAddCategory: true
      }
    case 'ADD_CATEGORY_DONE':
      return {
        ...state,
        requestingAddCategory: false
      }
    default:
      return state;
  }
}