const initState = {
  listUser: [],
  email: '',
  token: '',
  submittingLogin: false,
  messageError: null,
  requestingRegister: false
}

export default function userReducer( state = initState, action){
  switch(action.type){
    case 'LOGIN_SUCCESSED':
      return {
        email: action.payload.email,
        token: action.payload.token
      }
    case 'LOGIN_REQUEST':
      return {
        ...state,
        submittingLogin: true
      }
    case 'LOGIN_ERROR':
      return {
        ...state,
        submittingLogin: false,
        messageError: action.payload.message
      }
    case 'CLEAR_TOKEN':
      return {}
    
    case 'GET_USERS': 
      return {
        ...state,
        listUser: action.payload.users
      };
    case 'REGISTER':
      return {
        ...state,
        listUser: [...state.listUser, action.payload]
      }
    case 'REGISTER_REQUESTING':{
        return {
        ...state,
        requestingRegister: true
      }
    }
    case 'REGISTER_ERROR':
      return {
        ...state,
        submittingLogin: false,
        messageError: action.payload.message
      }
    case 'REGISTER_DONE':{
        return {
        ...state,
        requestingRegister: false
      }
    }
    default:
      return state;
  }
}