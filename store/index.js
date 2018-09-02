import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from '../reducers'

const middlewares = [ReduxThunk, logger]
const enhancer = [applyMiddleware(...middlewares)]
const initialState = {}

export default createStore(rootReducer, initialState, ...enhancer)
