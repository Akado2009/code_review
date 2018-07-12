import { CHANGE_AUTH, CHANGE_LOGIN_INFO, CHANGE_REGISTER_INFO } from "../constants/action-types"

export const changeAuth = authMode => ({ type: CHANGE_AUTH, payload: authMode })
export const changeLoginInfo = (field, value) => ({ type: CHANGE_LOGIN_INFO, payload: { field, value }})
export const changeRegisterInfo = (field, value) => ({ type: CHANGE_REGISTER_INFO, payload: { field, value }})
