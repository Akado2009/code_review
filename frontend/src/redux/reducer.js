import {combineReducers} from 'redux'
import loginReducer, { moduleName as loginModule } from '../ducks/login'
import registerReducer, { moduleName as registerModule } from '../ducks/register'
import testReducer, { moduleName as testModule } from '../ducks/test'
import { routerReducer } from 'react-router-redux'
import editorDeleteReducer, { moduleName as editorDeleteModule } from '../ducks/editorDelete'
import editorEditReducer, { moduleName as editorEditModule } from '../ducks/editorEdit'


export default combineReducers({
    routing: routerReducer,
    [loginModule]: loginReducer,
    [registerModule]: registerReducer,
    [testModule]: testReducer,
    [editorDeleteModule]: editorDeleteReducer,
    [editorEditModule]: editorEditReducer
})
