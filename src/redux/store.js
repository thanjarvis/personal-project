import {createStore, applyMiddleware, combineReducers} from 'redux'
import raceReducer from './raceReducer'
import userReducer from './userReducer'
import promiseMiddleware from 'redux-promise-middleware'
import logger from 'redux-logger'

const rootReducer = combineReducers({
    raceReducer,
    userReducer
})


export default createStore(rootReducer, applyMiddleware(logger, promiseMiddleware))
