import { Record } from 'immutable'

import { all, call, put, take } from 'redux-saga/effects'

import axios from 'axios'
axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.xsrfCookieName = "csrftoken"

export const ReducerRecord = Record({
    loading: false,
    questionNames: [],
    questionTexts: [],
    questionIds: [],
    openAddDialog: false,
    openDeleteDialog: false,
    openEditDialog: false,
    newQuestionName: undefined,
    newQuestionText: undefined,
    editedQuestionName: undefined,
    editedQuestionText: undefined,
    currentTest: null,
    snackOpen: false,
    snackMessage: '',
    questionToDelete: '',
    questionToEdit: ''
})


export const moduleName = 'editorEdit'

export const FETCH_QUESTIONS_REQUEST = `${moduleName}/FETCH_QUESTIONS_REQUEST`
export const FETCH_QUESTIONS_SUCCESS = `${moduleName}/FETCH_QUESTIONS_SUCCESS`
export const FETCH_QUESTIONS_ERROR = `${moduleName}/FETCH_QUESTIONS_ERROR`

export const OPEN_ADD_DIALOG = `${moduleName}/OPEN_ADD_DIALOG`
export const CLOSE_ADD_DIALOG = `${moduleName}/CLOSE_ADD_DIALOG`

export const OPEN_DELETE_DIALOG = `${moduleName}/OPEN_DELETE_DIALOG`
export const CLOSE_DELETE_DIALOG = `${moduleName}/CLOSE_DELETE_DIALOG`

export const OPEN_EDIT_DIALOG = `${moduleName}/OPEN_EDIT_DIALOG`
export const CLOSE_EDIT_DIALOG = `${moduleName}/CLOSE_EDIT_DIALOG`

export const CHANGE_NEW_QUESTION_NAME = `${moduleName}/CHANGE_NEW_QUESTION_NAME`
export const CHANGE_NEW_QUESTION_TEXT = `${moduleName}/CHANGE_NEW_QUESTION_TEXT`

export const ADD_QUESTION_REQUEST = `${moduleName}/ADD_QUESTION_REQUEST`
export const ADD_QUESTION_SUCCESS = `${moduleName}/ADD_QUESTION_SUCCESS`
export const ADD_QUESTION_ERROR = `${moduleName}/ADD_QUESTION_ERROR`

export const DELETE_QUESTION_REQUEST = `${moduleName}/DELETE_QUESTION_REQUEST`
export const DELETE_QUESTION_SUCCESS = `${moduleName}/DELETE_QUESTION_SUCCESS`
export const DELETE_QUESTION_ERROR = `${moduleName}/DELETE_QUESTION_ERROR`

export const CLOSE_SNACKBAR = `${moduleName}/CLOSE_SNACKBAR`

export const CHANGE_EDITED_QUESTION_NAME = `${moduleName}/CHANGE_EDITED_QUESTION_NAME`
export const CHANGE_EDITED_QUESTION_TEXT = `${moduleName}/CHANGE_EDITED_QUESTION_TEXT`

export const EDIT_QUESTION_REQUEST = `${moduleName}/EDIT_QUESTION_REQUEST`
export const EDIT_QUESTION_SUCCESS = `${moduleName}/EDIT_QUESTION_SUCCESS`
export const EDIT_QUESTION_ERROR = `${moduleName}/EDIT_QUESTION_ERROR`


export default function reducer(state = new ReducerRecord(), action) {
    const { type, payload } = action

    switch(type) {
        case FETCH_QUESTIONS_REQUEST:
            return state
                .set('loading', true)
                .set('currentTest', payload.id)
        case FETCH_QUESTIONS_ERROR:
            return state
                .set('loading', false)
        case FETCH_QUESTIONS_SUCCESS:
            return state
                .set('loading', false)
                .set('questionNames', payload.questionNames)
                .set('questionTexts', payload.questionTexts)
                .set('questionIds', payload.questionIds)
        case OPEN_ADD_DIALOG:
            return state
                .set('openAddDialog', true)
        case CLOSE_ADD_DIALOG:
            return state
                .set('openAddDialog', false)
        case OPEN_DELETE_DIALOG:
            return state
                .set('openDeleteDialog', true)
                .set('questionToDelete', payload.question)
        case CLOSE_DELETE_DIALOG:
            return state
                .set('openDeleteDialog', false)
        case OPEN_EDIT_DIALOG:
            return state
                .set('openEditDialog', true)
                .set('questionToEdit', payload.question)
                .set('editedQuestionName', payload.name)
                .set('editedQuestionText', payload.text)
        case CLOSE_EDIT_DIALOG:
            return state
                .set('openEditDialog', false)
        case CHANGE_NEW_QUESTION_NAME:
            return state
                .set('newQuestionName', payload.name)
        case CHANGE_NEW_QUESTION_TEXT:
            return state
                .set('newQuestionText', payload.text)
        case CHANGE_EDITED_QUESTION_NAME:
            return state
                .set('editedQuestionName', payload.name)
        case CHANGE_EDITED_QUESTION_TEXT:
            return state
                .set('editedQuestionText', payload.text)
        case ADD_QUESTION_REQUEST:
            return state
                // .set('loading', true)
        case ADD_QUESTION_SUCCESS:
            return state
                .set('loading', false)
                .set('snackOpen', true)
                .set('snackMessage', payload.message)
        case ADD_QUESTION_ERROR:
            return state
                .set('loading', false)
                .set('snackOpen', true)
                .set('snackMessage', payload.message)
        case DELETE_QUESTION_REQUEST:
            return state
                // .set('loading', true)
        case DELETE_QUESTION_SUCCESS:
            return state
                .set('loading', false)
                .set('snackOpen', true)
                .set('snackMessage', payload.message)
                .set('openDeleteDialog', false)
        case DELETE_QUESTION_ERROR:
            return state
                .set('loading', false)
                .set('snackOpen', true)
                .set('snackMessage', payload.message)
                .set('openDeleteDialog', false)
        case EDIT_QUESTION_REQUEST:
            return state
                // .set('loading', true)
        case EDIT_QUESTION_SUCCESS:
            return state
                .set('loading', false)
                .set('snackOpen', true)
                .set('snackMessage', payload.message)
        case EDIT_QUESTION_ERROR:
            return state
                .set('loading', false)
                .set('snackOpen', true)
                .set('snackMessage', payload.message)
        case CLOSE_SNACKBAR:
            return state
                .set('snackOpen', false)
        default:
            return state
    }
}

export function closeSnack () {
    return {
        type: CLOSE_SNACKBAR
    }
}

export function addQuestion (id, name, text) {
    return {
        type: ADD_QUESTION_REQUEST,
        payload: { id, name, text}
    }
}

export const addQuestionSaga = function * () {

    const action = yield take(ADD_QUESTION_REQUEST)

    try {
        const result = yield call(
            addQuestionDjango,
            action.payload.id,
            action.payload.name,
            action.payload.text
        )
        if (result.data.response === 'error') {
            yield put({
                type: ADD_QUESTION_ERROR,
                payload: {
                    message: result.data.message
                }
            })
        } else {
            yield put({
                type: ADD_QUESTION_SUCCESS,
                payload: {
                    message: result.data.message
                }
            })
        }
    } catch (err) {
        return Promise.reject(err.message)
    }
}

const addQuestionDjango = function * (id, name, text) {
    try {
        const data = { id, name, text }
        const result = yield call(
            axios.post,
            `/tests/add_question/`,
            data
        )

        return result.data
    } catch (err) {
        yield put({
            type: FETCH_QUESTIONS_ERROR
        })
    }
}

export function deleteQuestion (id) {
    return {
        type: DELETE_QUESTION_REQUEST,
        payload: { id }
    }
}

export const deleteQuestionSaga = function * () {

    const action = yield take(DELETE_QUESTION_REQUEST)

    try {
        const result = yield call(
            deleteQuestionDjango,
            action.payload.id
        )
        if (result.data.response === 'error') {
            yield put({
                type: DELETE_QUESTION_ERROR,
                payload: {
                    message: result.data.message
                }
            })
        } else {
            yield put({
                type: DELETE_QUESTION_SUCCESS,
                payload: {
                    message: result.data.message
                }
            })
        }
    } catch (err) {
        return Promise.reject(err.message)
    }
}

const deleteQuestionDjango = function * (id) {
    try {
        const data = { id }
        const result = yield call(
            axios.post,
            `/tests/delete_question/`,
            data
        )

        return result.data
    } catch (err) {
        yield put({
            type: FETCH_QUESTIONS_ERROR
        })
    }
}

export function changeNewQuestionName (name) {
    return {
        type: CHANGE_NEW_QUESTION_NAME,
        payload: { name }
    }
}

export function changeNewQuestionText (text) {
    return {
        type: CHANGE_NEW_QUESTION_TEXT,
        payload: { text }
    }
}

export function changeEditedQuestionName (name) {
    return {
        type: CHANGE_EDITED_QUESTION_NAME,
        payload: { name }
    }
}

export function changeEditedQuestionText (text) {
    return {
        type: CHANGE_EDITED_QUESTION_TEXT,
        payload: { text }
    }
}

export function openAddDialog () {
    return {
        type: OPEN_ADD_DIALOG
    }
}

export function closeAddDialog () {
    return {
        type: CLOSE_ADD_DIALOG
    }
}

export function openDeleteDialog (question) {
    return {
        type: OPEN_DELETE_DIALOG,
        payload: { question }
    }
}

export function closeDeleteDialog () {
    return {
        type: CLOSE_DELETE_DIALOG
    }
}

export function openEditDialog (question, name, text) {
    return {
        type: OPEN_EDIT_DIALOG,
        payload: { question, name, text }
    }
}

export function closeEditDialog () {
    return {
        type: CLOSE_EDIT_DIALOG
    }
}

export function fetchQuestions (id) {
    return {
        type: FETCH_QUESTIONS_REQUEST,
        payload: { id }
    }
}

export function editQuestion (id, name, text) {
    return {
        type: EDIT_QUESTION_REQUEST,
        payload: { id, name, text}
    }
}

export const editQuestionSaga = function * () {

    const action = yield take(EDIT_QUESTION_REQUEST)

    try {
        const result = yield call(
            editQuestionDjango,
            action.payload.id,
            action.payload.name,
            action.payload.text
        )
        if (result.data.response === 'error') {
            yield put({
                type: EDIT_QUESTION_ERROR,
                payload: {
                    message: result.data.message
                }
            })
        } else {
            yield put({
                type: EDIT_QUESTION_SUCCESS,
                payload: {
                    message: result.data.message
                }
            })
        }
    } catch (err) {
        return Promise.reject(err.message)
    }
}

const editQuestionDjango = function * (id, name, text) {
    try {
        const data = { id, name, text }
        const result = yield call(
            axios.post,
            `/tests/edit_question/`,
            data
        )

        return result.data
    } catch (err) {
        yield put({
            type: FETCH_QUESTIONS_ERROR
        })
    }
}

export const fetchQuestionsSaga = function * () {
    const action = yield take(FETCH_QUESTIONS_REQUEST)

    try {
        const result = yield call(
            fetchQuestionsDjango,
            action.payload.id
        )
        if (result.response === 'error') {
            yield put({
                type: FETCH_QUESTIONS_ERROR
            })
        } else {
            yield put({
                type: FETCH_QUESTIONS_SUCCESS,
                payload: {
                    questionNames: result.data.map(question => question.name),
                    questionTexts: result.data.map(question => question.description),
                    questionIds: result.data.map(question => question.id)
                }
            })
        }
    } catch (err) {
        return Promise.reject(err.message)
    }
}

const fetchQuestionsDjango = function * (id) {
    try {
        const result = yield call(
            axios.get,
            `/tests/get_questions_only/?id=${id}`
        )

        return result.data
    } catch (err) {
        yield put({
            type: FETCH_QUESTIONS_ERROR
        })
    }
}

export const saga = function * () {
    yield all([
        fetchQuestionsSaga(),
        addQuestionSaga(),
        deleteQuestionSaga(),
        editQuestionSaga()
    ])
}