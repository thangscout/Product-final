const initState = {
  email: '',
  token: '',
  submittingLogin: false
}

export default function userReducer( state = initState, action){
  switch(action.type){
    case 'LOGIN_SUCCESSED':
      return {
        email: action.payload.email,
        token: action.payload.token
      };
    case 'LOGIN_REQUEST':
      return {
        ...state,
        submittingLogin: true
      }
    default:
      return state;
  }
}