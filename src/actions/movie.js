import throttle from 'lodash/throttle'
import { CALL_API } from '../middleware/api'

export const CHANGE_SEARCH_TITLE = 'CHANGE_SEARCH_TITLE'

export const CLEAR_SEARCHES = 'CLEAR_SEARCHES'

export const SEARCH_REQUEST = 'SEARCH_REQUEST'
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS'
export const SEARCH_FAILURE = 'SEARCH_FAILURE'

const fetchMovies = throttle((dispatch, title) => dispatch({
  [CALL_API]: {
    payload: {
      types: [SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE],
      endpoint: `http://www.omdbapi.com/?s=${title}`
    }
  }
}), 750)

export const search = title => dispatch => {
  if (title.length > 1) {
    fetchMovies(dispatch, title)
  } else {
    dispatch({
      type: CLEAR_SEARCHES
    })
  }

  dispatch({
    type: CHANGE_SEARCH_TITLE,
    payload: title,
  })
}

export const DETAILS_REQUEST = 'DETAILS_REQUEST'
export const DETAILS_SUCCESS = 'DETAILS_SUCCESS'
export const DETAILS_FAILURE = 'DETAILS_FAILURE'

export const viewDetails = id => ({
  [CALL_API]: {
    payload: {
      types: [DETAILS_REQUEST, DETAILS_SUCCESS, DETAILS_FAILURE],
      endpoint: `http://www.omdbapi.com/?i=${id}`
    }
  }
})

