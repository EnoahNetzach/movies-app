import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import api from '../middleware/api'

export default (rootReducer, initialState = {}) => createStore(
  rootReducer,
  initialState,
  applyMiddleware(
    routerMiddleware(),
    thunk,
    api,
  )
)
