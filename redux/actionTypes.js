import {createStore, applyMiddleware, combineReducers} from 'redux'
import raceReducer from './raceReducer'
import promiseMiddleware from 'redux-promise-middleware'
import logger from 'redux-logger'

const rootReducer = combineReducers({
    raceReducer
})


export default createStore(rootReducer, applyMiddleware(logger, promiseMiddleware))

// you are heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeere you just finished the redux store and need to do the reducers and plan exactly what you will need redux for