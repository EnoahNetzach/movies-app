import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { apiRequests } from './api'

export default combineReducers({
  apiRequests,
  routing,
})
