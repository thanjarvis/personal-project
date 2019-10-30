import {createStore, applyMiddleware, combineReducers} from 'redux'
import raceReducer from './raceReducer'
import promiseMiddleware from 'redux-promise-middleware'
import logger from 'redux-logger'

const rootReducer = combineReducers({
    raceReducer
})


export default createStore(rootReducer, applyMiddleware(logger, promiseMiddleware))
