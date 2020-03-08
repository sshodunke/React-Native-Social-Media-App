import isLogged from './isLogged'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    userToken: isLogged,
})

export default allReducers