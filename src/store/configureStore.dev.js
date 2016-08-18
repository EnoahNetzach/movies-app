import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import immutableStateInvariant from 'redux-immutable-state-invariant'
import { routerMiddleware } from 'react-router-redux'
import api from '../middleware/api'

export default (rootReducer, initialState = {}) => createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(
      routerMiddleware(),
      immutableStateInvariant(),
      thunk,
      api,
      createLogger({ collapsed: true }),
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  )
)
