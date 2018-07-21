import {Record} from 'immutable'
import {all, call, put, takeEvery, take} from 'redux-saga/effects'
import $ from 'jquery'

import history from '../history'

import axios from 'axios'
axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.xsrfCookieName = "csrftoken"


export const ReducerRecord = Record({
    loginError: false,
    username: undefined,
    password: undefined,
    logingErrorMessage: 'Incorrect password. Contact your admin if you`ve forgottent your password',
    fields: ['Username', 'Password'],
    loading: false,
    authMode: 'login'
})

export const moduleName = 'login'
export const SIGN_IN_REQUEST = `${moduleName}/SIGN_IN_REQUEST`
export const SIGN_IN_SUCCESS = `${moduleName}/SIGN_IN_SUCCESS`
export const SIGN_IN_ERROR = `${moduleName}/SIGN_IN_ERROR`
export const SIGN_OUT_REQUEST = `${moduleName}/SIGN_IN_REQUEST`
export const SIGN_OUT_SUCCESS = `${moduleName}/SIGN_OUT_SUCCESS`
export const CHANGE_LOGIN_INFO = `${moduleName}/CHANGE_LOGIN_INFO`
export const CHANGE_MODE_INFO = `${moduleName}/CHANGE_MODE_INFO`

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload, error} = action

    switch (type) {
        case SIGN_IN_REQUEST:
        case SIGN_OUT_REQUEST:
            return state.set('loading', true)
        case SIGN_IN_SUCCESS:
            return state
                .set('loading', false)
                .set('loginError', false)
        case SIGN_IN_ERROR:
            return state
                .set('loading', false)
                .set('loginError', true)
        case SIGN_OUT_SUCCESS:
            return new ReducerRecord()
        case CHANGE_MODE_INFO:
            return state
                .set('authMode', payload.mode)
        case CHANGE_LOGIN_INFO:
            return state
                .set(payload.field, payload.value)
        default:
            return state
    }
}

export function signIn(username, password, token) {
    return {
        type: SIGN_IN_REQUEST,
        payload: {username, password, token}
    }
}

export function signOut() {
    return {
        type: SIGN_OUT_REQUEST
    }
}

export function changeLoginInfo(field, value) {
    return {
        type: CHANGE_LOGIN_INFO,
        payload: {field, value}
    }
}

export function changeMode(mode) {
    return {
        type: CHANGE_MODE_INFO,
        payload: {mode}
    }
}

export const signInSaga = function * () {

    while (true) {
        const action = yield take(SIGN_IN_REQUEST)
        try {
            const result = yield call(
                signInDjango,
                action.payload.username, action.payload.password, action.payload.token
            )
            if (result.response === 'error') {
                yield put({
                    type: SIGN_IN_ERROR
                })
            } else {
                yield put({
                    type: SIGN_IN_SUCCESS
                })
                window.location = '/'
                // yield history.push('/')
            }
        } catch (error) {
            yield put({
                type: SIGN_IN_ERROR,
                error
            })
        }
    }
}

const signInDjango = function * (username, password, token) {

    let data = {
        username: username, password: password, csrfmiddlewaretoken: token
    }

    try {
        const result = yield call(
            axios.post,
            '/users/login/',
            data
        )
        return result.data
    } catch (err) {
        return Promise.reject(err.message);
    }
}

export const signOutSaga = function * () {
    try {
        yield call()
        yield put({
            type: SIGN_IN_SUCCESS,
            payload: {}
        })
    } catch (_) {

    }
}

export const saga = function * () {
    yield all([
        signInSaga(),
        // changeInfoSaga(),
        // changeModeSaga(),
        // takeEvery(SIGN_OUT_REQUEST, signOutSaga)
    ])
}