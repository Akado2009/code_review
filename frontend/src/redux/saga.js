import {all} from 'redux-saga/effects'
import { saga as loginSaga } from '../ducks/login'
import { saga as registerSaga } from '../ducks/register'
import { saga as testSaga } from '../ducks/test'

export default function * rootSaga() {
    yield all([
        loginSaga(),
        registerSaga(),
        testSaga()
    ])
}