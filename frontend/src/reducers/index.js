import { CHANGE_AUTH } from "../constants/action-types"


const initialState = {
  authMode: 'login'
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_AUTH:
      return { ...state, authMode: action.payload }
    default:
      return state
  }
}


export default rootReducer