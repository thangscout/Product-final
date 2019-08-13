const initState = {
  listProduct: [],
  listCategories: [],
  requestingAddProduct: false,
  requestingRemoveProduct: '',
  infoProductPrepareUpdate: undefined,
  requestingGetInfoProduct: '',
  updatingInfo: false
}

export default function productReducer( state = initState, action){
  switch(action.type){
    case 'GET_PRODUCTS':
      return {
        ...state,
        listProduct: action.payload.products,
        listCategories: action.payload.categories
      }
    case 'ADD_PRODUCT':
      return {
        ...state,
        listProduct: [...state.listProduct, action.payload]
      }
    case 'ADD_PRODUCT_REQUESTING':
      return {
        ...state,
        requestingAddProduct: true
      }
    case 'ADD_PRODUCT_DONE':
      return {
        ...state,
        requestingAddProduct: false
      }
      case 'REMOVE_PRODUCT': 
      return {
        ...state,
        listProduct: state.listProduct.filter(product => !Object.is(product._id, action.payload.productID))
      }
    case 'REMOVE_PRODUCT_REQUESTING':
      return {
        ...state,
        requestingRemoveProduct: action.payload.productID
      }
    case 'REMOVE_PRODUCT_DONE':
      return {
        ...state,
        requestingRemoveProduct: ''
      }
    case 'GET_INFO_PRODUCT':
      return {
        ...state,
        infoProductPrepareUpdate: action.payload.product
      }
    case 'GET_INFO_PRODUCT_REQUESTING':
      return {
        ...state,
        requestingGetInfoProduct: action.payload.productID
      }
    case 'GET_INFO_PRODUCT_DONE':
      return {
        ...state,
        requestingGetInfoProduct: ''
      }
    case 'UPDATE_PRODUCT':
    {
      let { _id: productIdNew, title, description, price, categoryID, image} = action.payload.product;
      let newArr = state.listProduct.map(product => {
        if(product._id !== productIdNew) return product;
        return {
          ...product,
          title, description, price, categoryID, image
        }
      });

      return {
        ...state,
        listProduct: newArr
      }
    }
    case 'UPDATE_PRODUCT_REQUESTING':
      return {
        ...state,
        updatingInfo: true
      }
    case 'UPDATE_PRODUCT_DONE':
      return {
        ...state,
        updatingInfo: false
      }
    default:
      return state;
  }
}
