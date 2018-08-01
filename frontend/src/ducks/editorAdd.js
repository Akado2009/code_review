import { Record } from 'immutable'

import { all, call, put, take } from 'redux-saga/effects'

import axios from 'axios'
import { CLOSE_SNACKBAR } from './editorDelete';
axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.xsrfCookieName = "csrftoken"


export const ReducerRecord = Record({
    loading: false,
    openAddDialog: false,
    snackOpen: false,
    snackMessage: '',
    newTestName: undefined,
    newTestText: undefined,
    newTestUntil: new Date()
})


export const moduleName = 'editorAdd'

export const OPEN_ADD_DIALOG = `${moduleName}/OPEN_ADD_DIALOG`
export const CLOSE_ADD_DIALOG = `${moduleName}/CLOSE_ADD_DIALOG`

export const CHANGE_TEST_NAME = `${moduleName}/CHANGE_TEST_NAME`
export const CHANGE_TEST_TEXT = `${moduleName}/CHANGE_TEST_TEXT`
export const CHANGE_TEST_UNTIL = `${moduleName}/CHANGE_TEST_UNTIL`

export const ADD_TEST_REQUEST = `${moduleName}/ADD_TEST_REQUEST`
export const ADD_TEST_SUCCCESS = `${moduleName}/ADD_TEST_SUCCCESS`
export const ADD_TEST_ERROR = `${moduleName}/ADD_TEST_ERROR`


export default function reducer(state = new ReducerRecord(), action) {
    const { type, payload } = action

    switch(type) {
        case OPEN_ADD_DIALOG:
            return state
                .set('openAddDialog', true)
        case CLOSE_ADD_DIALOG:
            return state
                .set('openAddDialog', false)
        case CHANGE_TEST_NAME:
            return state
                .set('newTestName', payload.name)
        case CHANGE_TEST_TEXT:
            return state
                .set('newTestText', payload.text)
        case CHANGE_TEST_UNTIL:
            return state
                .set('newTestUntil', payload.until)
        case ADD_TEST_REQUEST:
            return state
                .set('loading', true)
        case ADD_TEST_ERROR:
            return state
                .set('loading', false)
                .set('snackOpen', true)
                .set('snackMessage', payload.message)
        case ADD_TEST_SUCCCESS:
            return state
                .set('loading', false)
                .set('snackOpen', true)
                .set('snackMessage', payload.message)
                .set('openAddDialog', false)
        case CLOSE_SNACKBAR:
            return state
                .set('snackOpen', false)
        default:
            return state
    }
}

export function closeSnackbar () {
    return {
        type: CLOSE_SNACKBAR
    }
}

export function changeTestName (name) {
    return {
        type: CHANGE_TEST_NAME,
        payload: { name }
    }
}

export function changeTestText (text) {
    return {
        type: CHANGE_TEST_TEXT,
        payload: { text }
    }
}

export function changeTestUntil (until) {
    return {
        type: CHANGE_TEST_UNTIL,
        payload: { until }
    }
}

export function closeAddDialog () {
    return {
        type: CLOSE_ADD_DIALOG
    }
}

export function openAddDialog () {
    return {
        type: OPEN_ADD_DIALOG
    }
}

export function addTest(name, description, until) {
    return {
        type: ADD_TEST_REQUEST,
        payload: { name, description, until }
    }
}

export const addTestSaga = function * () {
    const action = yield take(ADD_TEST_REQUEST)

    try {
        const result = yield call(
            addTestsDjango,
            action.payload.name,
            action.payload.description,
            action.payload.until
        )
        if (result.data.response === 'error') {
            yield put({
                type: ADD_TEST_ERROR,
                payload: {
                    message: result.data.message
                }
            })
        } else {
            yield put({
                type: ADD_TEST_SUCCCESS,
                payload: {
                    message: result.data.message
                }
            })
        }
    } catch (err) {
        return Promise.reject(err.message)
    }
}

const addTestsDjango = function * (name, description, until) {
    try {
        let data = { name, description, until }

        const result = yield call(
            axios.post,
            '/tests/add_test/',
            data
        )
        return result.data
    } catch (err) {
        yield put({
            type: ADD_TEST_ERROR,
            payload: {
                message: 'Oh, something went wrong'
            }
        })
    }
}

export const saga = function * () {
    yield all([
        addTestSaga()
    ])
}