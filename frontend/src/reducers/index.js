import { CHANGE_AUTH, CHANGE_LOGIN_INFO, CHANGE_REGISTER_INFO } from "../constants/action-types"


const initialState = {
  authMode: 'register',
  loginInfo: {
    'username': undefined,
    'password': undefined,
    'loginError': false,
    'logingErrorMessage': 'Incorrect password. Contact your admin if you`ve forgottent your password',
    'fields': ['Username', 'Password']
  },
  registerInfo: {
    'name': undefined,
    'surname': undefined,
    'username': undefined,
    'password1': undefined,
    'Password again': undefined,
    'registerError': false,
    'registerErrorMessage': 'ss',
    'fields': ['Username', 'Name', 'Surname', 'Password', 'Password again']
  }
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_AUTH:
      return { ...state, authMode: action.payload }
    case CHANGE_LOGIN_INFO:
      let loginInfo = state.loginInfo
      loginInfo[action.payload.field] = action.payload.value
      return { ...state, loginInfo }
    case CHANGE_REGISTER_INFO:
      let registerInfo = state.registerInfo
      registerInfo[action.payload.field] = action.payload.value
      return { ...state, registerInfo }
    default:
      return state
  }
}


export default rootReducer