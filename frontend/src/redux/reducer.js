import {combineReducers} from 'redux'
import loginReducer, { moduleName as loginModule } from '../ducks/login'
import registerReducer, { moduleName as registerModule } from '../ducks/register'
import testReducer, { moduleName as testModule } from '../ducks/test'
import { routerReducer } from 'react-router-redux'


export default combineReducers({
    routing: routerReducer,
    [loginModule]: loginReducer,
    [registerModule]: registerReducer,
    [testModule]: testReducer
})
