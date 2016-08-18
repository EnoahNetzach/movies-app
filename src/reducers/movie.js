import { combineReducers } from 'redux'
import { createSelector } from 'reselect'
import reduce from 'lodash/reduce'
import { CHANGE_SEARCH_TITLE, SEARCH_SUCCESS } from '../actions/movie'

let mountPoint = ''
export const setMountPoint = point => {
  mountPoint = mountPoint === '' ? point : mountPoint
}

const searchTitle = (state = '', { type, payload }) => {
  switch (type) {
    case CHANGE_SEARCH_TITLE:
      return payload
    default:
      return state
  }
}

const totalCount = (state = 0, { type, payload }) => {
  switch (type) {
    case SEARCH_SUCCESS:
      if (!payload.response.totalResults) return 0
      return payload.response.totalResults
    default:
      return state
  }
}

const movies = (state = {}, { type, payload }) => {
  switch (type) {
    case SEARCH_SUCCESS:
      if (!payload.response.Search) return {}
      return reduce(payload.response.Search, (acc, value) => ({
        ...acc,
        [value.imdbID]: {
          id: value.imdbID,
          title: value.Title,
          year: value.Year,
        },
      }), {})
    default:
      return state
  }
}

export default combineReducers({
  searchTitle,
  totalCount,
  movies,
})

const mountPointSelector = state => (mountPoint === '' ? state : state[mountPoint])

export const moviesSelector = createSelector(
  state => mountPointSelector(state).movies,
  (state, { id } = {}) => id,
  (currentMovies, id) => (id ? currentMovies[id] : currentMovies)
)
