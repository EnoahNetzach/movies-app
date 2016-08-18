import throttle from 'lodash/throttle'
import { CALL_API } from '../middleware/api'

export const CHANGE_SEARCH_TITLE = 'CHANGE_SEARCH_TITLE'

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

export const search = title => async dispatch => {
  dispatch({
    type: CHANGE_SEARCH_TITLE,
    payload: title,
  })

  if (title.length <= 1) return

  fetchMovies(dispatch, title)
}

