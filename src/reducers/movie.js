import { combineReducers } from 'redux'
import { createSelector } from 'reselect'
import reduce from 'lodash/reduce'
import {
  CHANGE_SEARCH_TITLE,
  CLEAR_SEARCHES,
  SEARCH_SUCCESS,
  DETAILS_SUCCESS
} from '../actions/movie'

let mountPoint = ''

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
    case CLEAR_SEARCHES:
      return {}
    default:
      return state
  }
}

const details = (state = {}, { type, payload }) => {
  switch (type) {
    case DETAILS_SUCCESS:
      if (!payload.response.Response) return state
      return {
        ...state,
        [payload.response.imdbID]: {
          ...state[payload.response.imdbID],
          id: payload.response.imdbID,
          title: payload.response.Title,
          year: payload.response.Year,
          director: payload.response.Director,
          genre: payload.response.Genre,
          actors: payload.response.Actors === 'N/A' ? [] : payload.response.Actors.split(', '),
          poster: payload.response.Poster === 'N/A' ? undefined : payload.response.Poster,
        }
      }
    default:
      return state
  }
}

export default point => {
  mountPoint = mountPoint === '' ? point : mountPoint
  return combineReducers({
    search: combineReducers({
      searchTitle,
      totalCount,
      movies,
    }),
    details
  })
}

const mountPointSelector = state => (mountPoint === '' ? state : state[mountPoint])

export const searchTitleSelector = createSelector(
  state => mountPointSelector(state).search.searchTitle,
  currentTitle => currentTitle
)

export const searchMoviesSelector = createSelector(
  state => mountPointSelector(state).search.movies,
  currentMovies => currentMovies
)

export const searchMovieSelector = createSelector(
  state => searchMoviesSelector(state),
  (state, { id } = {}) => id,
  (currentMovies, id) => currentMovies[id]
)

export const detailSelector = createSelector(
  state => mountPointSelector(state).details,
  (state, { id } = {}) => id,
  (currentMovies, id) => currentMovies[id]
)
