import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import api, { CALL_API } from '../../middleware/api'
import {
  CHANGE_SEARCH_TITLE,
  CLEAR_SEARCHES,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  search,
  DETAILS_REQUEST,
  DETAILS_SUCCESS,
  DETAILS_FAILURE,
  viewDetails,
} from '../movie'

jest.mock('lodash/throttle', () => fn => {
  fn.cancel = () => {}
  return fn
})

const store = configureMockStore([thunk, api])({})

describe('search', () => {
  it('creates the actual action', () => {
    spyOn(store, 'dispatch')

    search('title')(store.dispatch, store.getState)

    expect(store.dispatch).toHaveBeenCalledWith({
      [CALL_API]: {
        payload: {
          types: [SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE],
          endpoint: 'https://www.omdbapi.com/?s=title'
        }
      }
    })
    expect(store.dispatch).toHaveBeenCalledWith({
      type: CHANGE_SEARCH_TITLE,
      payload: 'title'
    })
  })

  it('clears the search if the title is too short', () => {
    spyOn(store, 'dispatch')

    search('t')(store.dispatch, store.getState)

    expect(store.dispatch).toHaveBeenCalledWith({
      type: CLEAR_SEARCHES
    })
    expect(store.dispatch).toHaveBeenCalledWith({
      type: CHANGE_SEARCH_TITLE,
      payload: 't'
    })
  })
})

describe('viewDetails', () => {
  it('creates the actual action', () => {
    expect(viewDetails('id')).toEqual({
      [CALL_API]: {
        payload: {
          types: [DETAILS_REQUEST, DETAILS_SUCCESS, DETAILS_FAILURE],
          endpoint: 'https://www.omdbapi.com/?i=id'
        }
      }
    })
  })
})
