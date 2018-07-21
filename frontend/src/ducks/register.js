import {Record} from 'immutable'
import {all, call, put, takeEvery, take} from 'redux-saga/effects'
import $ from 'jquery'

import history from '../history'

import axios from 'axios'
axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.xsrfCookieName = "csrftoken"


export const ReducerRecord = Record({
    registerError: false,
    username: undefined,
    password: undefined,
    'password again': undefined,
    name: undefined,
    surname: undefined,
    registerErrorMessage: null,
    fields: ['Username', 'Password', 'Password again', 'Name', 'Surname'],
    loading: false
})

export const moduleName = 'register'

export const SIGN_UP_REQUEST = `${moduleName}/SIGN_UP_REQUEST`
export const SIGN_UP_SUCCESS = `${moduleName}/SIGN_UP_SUCCESS`
export const SIGN_UP_ERROR =`${moduleName}/SIGN_UP_ERROR`
export const CHANGE_REGISTER_INFO = `${moduleName}/CHANGE_REGISTER_INFO`

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload, error} = action

    switch (type) {
        case SIGN_UP_REQUEST:
            return state.set('loading', true)
        case SIGN_UP_SUCCESS:
            return state
                .set('loading', false)
                .set('registerError', false)
        case SIGN_UP_ERROR:
            return state
                .set('loading', false)
                .set('registerError', true)
                .set('registerErrorMessage', payload.errorMsg)
        case CHANGE_REGISTER_INFO:
            return state
                .set(payload.field, payload.value)
        default:
            return state
    }
}

export function signUp(username, password, name, surname, token) {
    return {
        type: SIGN_UP_REQUEST,
        payload: {username, password, name, surname, token}
    }
}

export function changeRegisterInfo(field, value){
    return {
        type: CHANGE_REGISTER_INFO,
        payload: {field, value}
    }
}

export const signUpSaga = function * () {

    while (true) {
        const action = yield take(SIGN_UP_REQUEST)
        try {
            const result = yield call(
                signUpDjango,
                action.payload.username, action.payload.password, action.payload.name,
                action.payload.surname, action.payload.token
            )
            if (result.response === 'error') {
                yield put({
                    type: SIGN_UP_ERROR,
                    payload: {
                        errorMsg: result.text
                    }
                })
            } else {
                yield put({
                    type: SIGN_UP_SUCCESS
                })
                window.location = '/'
                // yield history.push('/')
            }
        } catch (error) {
            yield put({
                type: SIGN_UP_ERROR,
                error
            })
        }
    }
}

const signUpDjango = function * (username, password, name, surname, token) {

    let data = {
        username: username, password: password, name, surname, csrfmiddlewaretoken: token
    }

    try {
        const result = yield call(
            axios.post,
            '/users/register/',
            data
        )
        return result.data
    } catch (err) {
        return Promise.reject(err.message);
    }
}

export const saga = function * () {
    yield all([
        signUpSaga(),
        // changeInfoSaga(),
        // changeModeSaga(),
        // takeEvery(SIGN_OUT_REQUEST, signOutSaga)
    ])
}