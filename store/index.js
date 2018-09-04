import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'
import logger from 'redux-logger'
import devTools from 'remote-redux-devtools'
import rootReducer from '../reducers'

const middlewares = [ReduxThunk, logger]

export default createStore(
  rootReducer,
  compose(
    applyMiddleware(...middlewares),
    devTools() // "Cmd+Ctrl+Arrow up" to activate
  )
)
