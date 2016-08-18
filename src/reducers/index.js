import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import apiRequests from './api'
import movie, { setMountPoint as movieMountPoint } from './movie'

movieMountPoint('movie')

export default combineReducers({
  routing,
  apiRequests,
  movie
})
