import isLogged from './isLogged'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    userToken: isLogged,
})

export default rootReducer