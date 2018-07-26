import {all} from 'redux-saga/effects'
import { saga as loginSaga } from '../ducks/login'
import { saga as registerSaga } from '../ducks/register'
import { saga as testSaga } from '../ducks/test'
import { saga as editorDeleteSaga } from '../ducks/editorDelete'
import { saga as editorEditSaga } from '../ducks/editorEdit'

export default function * rootSaga() {
    yield all([
        loginSaga(),
        registerSaga(),
        testSaga(),
        editorDeleteSaga(),
        editorEditSaga()
    ])
}