const initState = {
  user: undefined,
  token: '',
  submittingLogin: false,
  messageError: null,
  requestingRegister: false,
  isUser: undefined,
}

export default function userReducer( state = initState, action){
  switch(action.type){
    case 'LOGIN_SUCCESSED':
      return {
        token: action.payload.token,
        isUser: action.payload.isUser
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
    case 'REGISTER':
      return {
        ...state,
        user: action.payload
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
        requestingRegister: false,
        messageError: action.payload.message
      }
    case 'REGISTER_DONE':{
        return {
        ...state,
        requestingRegister: false
      }
    }
    case 'UPDATE_USER':
    {
      return {
        ...state,
        isUser: action.payload.user
      }
    }
    case 'UPDATE_USER_REQUESTING':
      return {
        ...state,
        updatingInfo: true
      }
    case 'UPDATE_USER_DONE':
      return {
        ...state,
        updatingInfo: false
      }
    default:
      return state;
  }
}