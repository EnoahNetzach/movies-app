import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import immutableStateInvariant from 'redux-immutable-state-invariant'
import { routerMiddleware } from 'react-router-redux'
import api from '../middleware/api'
import normalize from '../middleware/normalize'

export default (rootReducer, initialState = {}) => createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(
      routerMiddleware(),
      immutableStateInvariant(),
      thunk,
      api,
      normalize,
      createLogger({ collapsed: true }),
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  )
)
