import {all} from 'redux-saga/effects'
import {saga as loginSaga} from '../ducks/login'
import {saga as registerSaga} from '../ducks/register'

export default function * rootSaga() {
    yield all([
        loginSaga(),
        registerSaga()
    ])
}