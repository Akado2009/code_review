import { Record } from 'immutable'

import { all, call, put, take } from 'redux-saga/effects'

import axios from 'axios'
axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.xsrfCookieName = "csrftoken"


export const ReducerRecord = Record({
    testNames: [],
    testIds: [],
    loading: false,
    snackOpen: false,
    snackMessage: '',
    openModal: false,
    currentTestToDelete: null
})

export const moduleName = 'editorDelete'

export const FETCH_ALL_TESTNAMES_REQUEST = 'FETCH_ALL_TESTNAMES_REQUEST'
export const FETCH_ALL_TESTNAMES_SUCCESS = 'FETCH_ALL_TESTNAMES_SUCCESS'
export const FETCH_ALL_TESTNAMES_ERROR = 'FETCH_ALL_TESTNAMES_ERROR'

export const DELETE_TEST_REQUEST = 'DELETE_TEST_REQUEST'
export const DELETE_TEST_SUCCESS = 'DELETE_TEST_SUCCESS'
export const DELETE_TEST_ERROR = 'DELETE_TEST_ERROR'

export const OPEN_DELETE_MODAL = 'OPEN_DELETE_MODAL'
export const CLOSE_DELETE_MODAL = 'CLOSE_DELETE_MODAL'

export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR'

export default function reducer(state = new ReducerRecord(), action) {
    const { type, payload } = action

    switch (type) {
        case FETCH_ALL_TESTNAMES_REQUEST:
            return state
                .set('loading', true)
        case FETCH_ALL_TESTNAMES_SUCCESS:
            return state
                .set('loading', false)
                .set('testNames', payload.testNames)
                .set('testIds', payload.testIds)
        case FETCH_ALL_TESTNAMES_ERROR:
            return state
                .set('loading', false)
        case DELETE_TEST_REQUEST:
            return state
                .set('loading', true)
        case DELETE_TEST_SUCCESS:
            return state
                .set('loading', false)
                .set('snackOpen', true)
                .set('openModal', false)
                .set('snackMessage', payload.message)
        case DELETE_TEST_ERROR:
            return state
                .set('loading', false)
                .set('snackOpen', true)
                .set('openModal', false)
                .set('snackMessage', payload.message)
        case OPEN_DELETE_MODAL:
            return state
                .set('openModal', true)
                .set('currentTestToDelete', payload.test)
        case CLOSE_DELETE_MODAL:
            return state
                .set('openModal', false)
        case CLOSE_SNACKBAR:
            return state
                .set('snackOpen', false)
        default:
            return state
    }
}

export function fetchAllTestnames() {
    return {
        type: FETCH_ALL_TESTNAMES_REQUEST
    }
}

export const fetchAllTestnamesSaga = function * () {
    const action = yield take(FETCH_ALL_TESTNAMES_REQUEST)

    try {
        const result = yield call(
            fetchAllTestnamesDjango
        )
        if (result.response === 'error') {
            yield put({
                type: FETCH_ALL_TESTNAMES_ERROR
            })
        } else {
            yield put({
                type: FETCH_ALL_TESTNAMES_SUCCESS,
                payload: {
                    testNames: result.data.map(test => test.name),
                    testIds: result.data.map(test => test.id)
                }
            })
        }
    } catch (err) {
        return Promise.reject(err.message);
    }
}

const fetchAllTestnamesDjango = function *() {
    try {
        const result = yield call(
            axios.get,
            '/tests/get_test_names/'
        )
        return result.data
    } catch (err) {
        yield put({
            type: FETCH_ALL_TESTNAMES_ERROR
        })
    }
}

export function deleteTest(name) {
    return {
        type: DELETE_TEST_REQUEST,
        payload: {
            name: name
        }
    }
}

export const deleteTestSaga = function * () {
    const action = yield take(DELETE_TEST_REQUEST)

    try {
        const result = yield call(
            deleteTestDjango,
            action.payload.name
        )
        if (result.response === 'error') {
            yield put({
                type: DELETE_TEST_ERROR
            })
        } else {
            yield put({
                type: DELETE_TEST_SUCCESS,
                payload: {
                    message: result.data
                }
            })
        }
    } catch (err) {
        return Promise.reject(err.message);
    }
}

const deleteTestDjango = function *(name) {
    try {
        const data = {
            name: name
        }
        const result = yield call(
            axios.post,
            '/tests/delete_test/',
            data
        )
        return result.data
    } catch (err) {
        yield put({
            type: DELETE_TEST_ERROR
        })
    }
}

export function openModal(test) {
    return {
        type: OPEN_DELETE_MODAL,
        payload: {
            test: test
        }
    }
}


export function closeModal() {
    return {
        type: CLOSE_DELETE_MODAL
    }
}

export function closeSnackbar() {
    return {
        type: CLOSE_SNACKBAR
    }
}

export const saga = function * () {
    yield all([
        fetchAllTestnamesSaga(),
        deleteTestSaga()
    ])
}