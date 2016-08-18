import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import apiRequests from './api'
import movie from './movie'

export default combineReducers({
  routing,
  apiRequests,
  movie: movie('movie')
})
