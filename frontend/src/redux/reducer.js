import {combineReducers} from 'redux'
import loginReducer, {moduleName as loginModule} from '../ducks/login'
import { routerReducer } from 'react-router-redux';


export default combineReducers({
    routing: routerReducer,
    [loginModule]: loginReducer,
})
