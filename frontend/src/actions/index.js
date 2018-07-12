import { CHANGE_AUTH } from "../constants/action-types"

export const changeAuth = authMode => ({ type: CHANGE_AUTH, payload: authMode })

