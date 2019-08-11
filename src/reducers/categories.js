const initState = {
  listCategories: [],
  requestingAddCategory: false,
  requestingRemoveCategory: '',
  infoCategoryPrepareUpdate: undefined,
  requestingGetInfoCategory: '',
  updatingInfo: false
}

export default function categoryReducer( state = initState, action ){
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
    case 'REMOVE_CATEGORY': 
      return {
        ...state,
        listCategories: state.listCategories.filter(category => !Object.is(category._id, action.payload.categoryID))
      }
    case 'REMOVE_CATEGORY_REQUESTING':
      return {
        ...state,
        requestingRemoveCategory: action.payload.categoryID
      }
    case 'REMOVE_CATEGORY_DONE':
      return {
        ...state,
        requestingRemoveCategory: ''
      }
    case 'GET_INFO_CATEGORY':
      return {
        ...state,
        infoCategoryPrepareUpdate: action.payload.category
      }
    case 'GET_INFO_CATEGORY_REQUESTING':
      return {
        ...state,
        requestingGetInfoCategory: action.payload.categoryID
      }
    case 'GET_INFO_CATEGORY_DONE':
      return {
        ...state,
        requestingGetInfoCategory: ''
      }
    case 'UPDATE_CATEGORY': {
      let {_id: categoryIDUpdate, title, description } = action.payload.category;
      let newArr = state.listCategories.map(category => {
        if(category._id !== categoryIDUpdate) return category;
        return {
          ...category,
          title, description
        }
      });
      return {
        ...state,
        listCategories: newArr
      }
    }
    case 'UPDATE_CATEGORY_REQUESTING':
      return {
        ...state,
        updatingInfo: true
      }
    case 'UPDATE_CATEGORY_DONE':
      return {
        ...state,
        updatingInfo: false
      }
    default:
      return state;
  }
}