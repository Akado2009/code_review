import { Record } from 'immutable'
import { all, call, put, take } from 'redux-saga/effects'

import history from '../history'

import axios from 'axios'
axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.xsrfCookieName = "csrftoken"

export const ReducerRecord = Record({
    available: [],
    disabled: [],
    loading: false,
    questions: [],
    currentQuestion: 0,
    language: 'python',
    languages: ['python', 'javascript', 'c', 'cpp', 'r', 'plaintext'],
    answers: []
})

export const moduleName = 'test'
export const FETCH_TESTS = `${moduleName}/FETCH_TESTS`
export const FETCH_TESTS_SUCCESS = `${moduleName}/FETCH_TESTS_SUCCESS`
export const FETCH_TESTS_ERROR = `${moduleName}/FETCH_TESTS_ERROR`

export const FETCH_TEST_INFO = `${moduleName}/FETCH_TEST_INFO`
export const FETCH_TEST_INFO_SUCCESS = `${moduleName}/FETCH_TEST_INFO_SUCCESS`
export const FETCH_TEST_INFO_ERROR = `${moduleName}/FETCH_TEST_INFO_ERROR`

export const NEXT_QUESTION = `${moduleName}/NEXT_QUESTION`
export const PREVIOUS_QUESTION = `${moduleName}/PREVIOUS_QUESTION`

export const CHANGE_LANGUAGE = `${moduleName}/CHANGE_LANGUAGE`
export const CHANGE_CODE = `${moduleName}/CHANGE_CODE`


export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case FETCH_TESTS:
            return state
                .set('loading', true)
        case FETCH_TESTS_SUCCESS:
            return state
                .set('available', payload.available)
                .set('disabled', payload.disabled)
                .set('loading', false)
        case FETCH_TESTS_ERROR:
            return state
                .set('loading', false)
        case FETCH_TEST_INFO:
            return state
                .set('loading', true)
        case FETCH_TEST_INFO_SUCCESS:
            return state
                .set('loading', false)
                .set('questions', payload.questions)
                .set('answers', payload.answers)
        case NEXT_QUESTION:
            return state
                .set('currentQuestion', payload.nextIndex >= state.questions.length ? state.questions.length : payload.nextIndex)
        case PREVIOUS_QUESTION:
            return state
                .set('currentQuestion', payload.previousIndex < 0 ? 0 : payload.previousIndex)
        case CHANGE_LANGUAGE:
            return state
                .set('language', payload.language)
        case CHANGE_CODE:
            let answers = state.answers
            answers[state.currentQuestion] = payload.code
            return state
                .set('answers', answers)
        default:
            return state
    }
}


export function changeCode(code) {
    return {
        type: CHANGE_CODE,
        payload: {
            code: code
        }
    }
}

export function changeLanguage(language) {
    return {
        type: CHANGE_LANGUAGE,
        payload: {
            language: language
        }
    }
}

export function nextQuestion(index) {
    return {
        type: NEXT_QUESTION,
        payload: {
            nextIndex: index + 1
        }
    }
}

export function previousQuestion(index) {
    return {
        type: PREVIOUS_QUESTION,
        payload: {
            previousIndex: index - 1
        }
    }
}
export function fetchTests() {
    return {
        type: FETCH_TESTS
    }
}

export const fetchTestsSaga = function * () {
    while (true) {
        const action = yield take(FETCH_TESTS)
        try {
            const result = yield call(
                djangoFetchTests
            )
            if (result.response === 'error') {
                yield put({
                    type: FETCH_TESTS_ERROR
                })
            } else {
                yield put({
                    type: FETCH_TESTS_SUCCESS,
                    payload: {
                        available: result.data.filter(test => test.available === true),
                        disabled: result.data.filter(test => test.available !== true)
                    }
                })
            }
        } catch (error) {
            yield put({
                type: FETCH_TESTS_ERROR,
                error
            })
        }
    }
}

const djangoFetchTests = function * () {

    try {
        const result = yield call(
            axios.get,
            '/tests/get_tests/'
        )
        return result.data
    } catch (err) {
        return Promise.reject(err.message)
    }
}

export function fetchTestInfo(id) {
    return {
        type: FETCH_TEST_INFO,
        payload: {
            id: id
        }
    }
}

export const fetchTestInfoSaga = function * (id) {
    while (true) {
        const action = yield take(FETCH_TEST_INFO)
        try {
            const result = yield call(
                djangoFetchTestInfo,
                action.payload.id
            )
            if (result.response === 'error') {
                yield put({
                    type: FETCH_TEST_INFO_ERROR
                })
            } else {
                yield put({
                    type: FETCH_TEST_INFO_SUCCESS,
                    payload: {
                        questions: result.data,
                        answers: Array(result.data.length).join(".").split(".")
                    }
                })
            }
        } catch (error) {
            yield put({
                type: FETCH_TEST_INFO_ERROR,
                error
            })
        }
    }
}

export const djangoFetchTestInfo = function * (id) {
    try {
        const result = yield call(
            axios.get,
            `/tests/get_questions/?id=${id}`
        )
        return result.data
    } catch (err) {
        return Promise.reject(err.message)
    }
}

export const saga = function * () {
    yield all([
        fetchTestsSaga(),
        fetchTestInfoSaga()
    ])
}