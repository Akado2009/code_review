import { Record } from 'immutable'

import { all, call, put, take } from 'redux-saga/effects'

import axios from 'axios'
axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.xsrfCookieName = "csrftoken"


export const ReducerRecord = Record({
    studentNames: [],
    studentIds: [],
    loading: false,
    filteredStudentNames: [],
    searchValue: undefined,
    openReviewDialog: false,
    questionAnswer: undefined,
    questionName: undefined,
    questionText: undefined,
    currentQuestionId: null,
    answerContent: undefined,
    answerMark: undefined,
    answerId: undefined,
    snackOpen: false,
    snackMessage: ''

})

export const moduleName = 'editorCheck'

export const FETCH_ALL_STUDENT_NAMES_REQUEST = `${moduleName}/FETCH_ALL_STUDENT_NAMES_REQUEST`
export const FETCH_ALL_STUDENT_NAMES_SUCCESS = `${moduleName}/FETCH_ALL_STUDENT_NAMES_SUCCESS`
export const FETCH_ALL_STUDENT_NAMES_ERROR = `${moduleName}/FETCH_ALL_STUDENT_NAMES_ERROR`

export const CHANGE_SEARCH_VALUE = `${moduleName}/CHANGE_SEARCH_VALUE`

export const CLOSE_REVIEW_DIALOG = `${moduleName}/CLOSE_REVIEW_DIALOG`

export const FETCH_ANSWER_REQUEST = `${moduleName}/FETCH_ANSWER_REQUEST`
export const FETCH_ANSWER_SUCCESS = `${moduleName}/FETCH_ANSWER_SUCCESS`
export const FETCH_ANSWER_ERROR = `${moduleName}/FETCH_ANSWER_ERROR`

export const CHANGE_ANSWER_MARK = `${moduleName}/CHANGE_ANSWER_MARK`

export const SUBMIT_MARK_REQUEST = `${moduleName}/SUBMIT_MARK_REQUEST`
export const SUBMIT_MARK_SUCCESS = `${moduleName}/SUBMIT_MARK_SUCCESS`
export const SUBMIT_MARK_ERROR = `${moduleName}/SUBMIT_MARK_ERROR`

export const CLOSE_SNACKBAR = `${moduleName}/CLOSE_SNACKBAR`

export default function reducer(state = new ReducerRecord(), action) {
    const { type, payload } = action

    switch (type) {
        case FETCH_ALL_STUDENT_NAMES_REQUEST:
            return state
                .set('loading', true)
        case FETCH_ALL_STUDENT_NAMES_SUCCESS:
            return state
                .set('loading', false)
                .set('studentNames', payload.studentNames)
                .set('studentIds', payload.studentIds)
                .set('filteredStudentNames', payload.studentNames)
        case FETCH_ALL_STUDENT_NAMES_ERROR:
            return state
                .set('loading', false)
        case CHANGE_SEARCH_VALUE:
            let userNames = state.get('studentNames').filter(name => name.includes(payload.value.toLowerCase()))
            return state
                .set('searchValue', payload.value)
                .set('filteredStudentNames', userNames)
        case CLOSE_REVIEW_DIALOG:
            return state
                .set('openReviewDialog', false)
        case FETCH_ANSWER_REQUEST:
            return state
                .set('loading', true)
                .set('questionName', payload.name)
                .set('questionText', payload.text)
        case FETCH_ANSWER_SUCCESS:
            return state
                .set('loading', true)
                .set('answerContent', payload.content)
                .set('answerMark', payload.mark)
                .set('answerId', payload.id)
                .set('openReviewDialog', true)
        case FETCH_ANSWER_ERROR:
            return state
                .set('loading', false)
        case CHANGE_ANSWER_MARK:
            return state
                .set('answerMark', payload.mark)
        case SUBMIT_MARK_REQUEST:
            return state
                .set('loading', true)
        case SUBMIT_MARK_ERROR:
        case SUBMIT_MARK_SUCCESS:
            return state
                .set('loading', false)
                .set('snackOpen', true)
                .set('snackMessage', payload.message)
        default:
            return state
    }
}

export function closeSnackBar () {
    return {
        type: CLOSE_SNACKBAR
    }
}

export function submitMark (id, mark) {
    return {
        type: SUBMIT_MARK_REQUEST,
        payload: {
            id, mark
        }
    }
}

export const submitMarkSaga = function * () {
    const action = yield take(SUBMIT_MARK_REQUEST)

    try {
        const result = yield call(
            submitMarkDjango,
            action.payload.id,
            action.payload.mark
        )
        if (result.data.response === 'error') {
            yield put({
                type: SUBMIT_MARK_ERROR,
                payload: {
                    message: 'Oh, something went wrong'
                }
            })
        } else {
            yield put({
                type: SUBMIT_MARK_SUCCESS,
                payload: {
                    message: result.data.message
                }
            })
        }
    } catch (err) {
        return Promise.reject(err.message);
    }
}

const submitMarkDjango = function * (id, mark) {
    try {
        const data = { id, mark }
        const result = yield call(
            axios.post,
            '/tests/submit_mark/',
            data
        )
        return result.data
    } catch (err) {
        yield put({
            type: SUBMIT_MARK_ERROR,
            payload: {
                message: 'Oh, something went wrong'
            }
        })
    }
}
export function changeMark (mark) {
    return {
        type: CHANGE_ANSWER_MARK,
        payload: {
            mark
        }
    }
}

export function closeReviewDialog () {
    return {
        type: CLOSE_REVIEW_DIALOG
    }
}

export function changeValue (value) {
    return {
        type: CHANGE_SEARCH_VALUE,
        payload: {
            value
        }
    }
}

export function fetchAllStudents() {
    return {
        type: FETCH_ALL_STUDENT_NAMES_REQUEST
    }
}

export const fetchAllStudentsSaga = function * () {
    const action = yield take(FETCH_ALL_STUDENT_NAMES_REQUEST)

    try {
        const result = yield call(
            fetchAllStudentsDjango
        )
        if (result.response === 'error') {
            yield put({
                type: FETCH_ALL_STUDENT_NAMES_ERROR
            })
        } else {
            yield put({
                type: FETCH_ALL_STUDENT_NAMES_SUCCESS,
                payload: {
                    studentNames: result.data.map(student => student.username),
                    studentIds: result.data.map(student => student.id)
                }
            })
        }
    } catch (err) {
        return Promise.reject(err.message);
    }
}

const fetchAllStudentsDjango = function *() {
    try {
        const result = yield call(
            axios.get,
            '/tests/get_students/'
        )
        return result.data
    } catch (err) {
        yield put({
            type: FETCH_ALL_STUDENT_NAMES_ERROR
        })
    }
}

export function fetchAnswer (questionId, userId, name, text) {
    return {
        type: FETCH_ANSWER_REQUEST,
        payload: {
            questionId, userId, name, text
        }
    }
}

export const fetchAnswerSaga = function * () {
    const action = yield take(FETCH_ANSWER_REQUEST)

    try {
        const result = yield call(
            fetchAnswerDjango,
            action.payload.questionId,
            action.payload.userId
        )
        if (result.data.response === 'error') {
            yield put({
                type: FETCH_ANSWER_ERROR
            })
        } else {
            yield put({
                type: FETCH_ANSWER_SUCCESS,
                payload: {
                    content: result.data.content,
                    mark: result.data.mark,
                    id: result.data.id
                }
            })
        }
    } catch (err) {
        return Promise.reject(err.message)
    }
}

const fetchAnswerDjango = function * (questionId, userId) {
    try {
        const result = yield call(
            axios.get,
            `/tests/get_answer/?questionId=${questionId}&userId=${userId}`
        )
        return result.data
    } catch (err) {
        yield put({
            type: FETCH_ANSWER_ERROR
        })
    }

}

export const saga = function * () {
    yield all([
        fetchAllStudentsSaga(),
        fetchAnswerSaga(),
        submitMarkSaga()
    ])
}