import {
  CHANGE_SEARCH_TITLE,
  CLEAR_SEARCHES,
  SEARCH_SUCCESS,
  DETAILS_SUCCESS
} from '../../actions/movie'
import movie from '../movie'

const movieReducer = movie()

const emptyState = {
  search: {
    searchTitle: '',
    totalCount: 0,
    movies: {},
  },
  details: {},
}

describe('movie combined reducer', () => {
  it('is empty by default', () => {
    expect(movieReducer(undefined, {})).toEqual(emptyState)
  })

  it('skips other actions', () => {
    expect(movieReducer(undefined, {
      type: 'OTHER_TYPE',
      payload: {},
    })).toEqual(emptyState)
  })
})

describe('movie search title reducer', () => {
  it('changes the title', () => {
    expect(movieReducer(undefined, {
      type: CHANGE_SEARCH_TITLE,
      payload: 'title',
    })).toEqual({
      ...emptyState,
      search: {
        ...emptyState.search,
        searchTitle: 'title'
      }
    })
  })
})

describe('movie total count reducer', () => {
  it('updates the total count', () => {
    expect(movieReducer(undefined, {
      type: SEARCH_SUCCESS,
      payload: {
        response: {
          totalResults: 42
        }
      },
    })).toEqual({
      ...emptyState,
      search: {
        ...emptyState.search,
        totalCount: 42
      }
    })
  })

  it('resets the total count if the response is malformed', () => {
    expect(movieReducer({ search: { totalCount: 42 } }, {
      type: SEARCH_SUCCESS,
      payload: {
        response: {}
      },
    })).toEqual(emptyState)
  })
})

describe('movie movies reducer', () => {
  it('updates the cache', () => {
    expect(movieReducer(undefined, {
      type: SEARCH_SUCCESS,
      payload: {
        response: {
          Search: [
            {
              imdbID: 'id1',
              Title: 'title',
              Year: 'year',
            },
            {
              imdbID: 'id2',
              Title: 'title',
              Year: 'year',
            },
          ]
        }
      },
    })).toEqual({
      ...emptyState,
      search: {
        ...emptyState.search,
        movies: {
          id1: {
            id: 'id1',
            title: 'title',
            year: 'year',
          },
          id2: {
            id: 'id2',
            title: 'title',
            year: 'year',
          }
        }
      }
    })
  })

  it('resets the cache if the response is malformed', () => {
    expect(movieReducer({ search: { movies: { id: { id: 'id' } } } }, {
      type: SEARCH_SUCCESS,
      payload: {
        response: {}
      },
    })).toEqual(emptyState)
  })

  it('clears the cache', () => {
    expect(movieReducer({ search: { movies: { id: { id: 'id' } } } }, {
      type: CLEAR_SEARCHES,
      payload: {
        response: {}
      },
    })).toEqual(emptyState)
  })
})

describe('movie details reducer', () => {
  it('updates the cache', () => {
    expect(movieReducer(undefined, {
      type: DETAILS_SUCCESS,
      payload: {
        response: {
          Response: true,
          imdbID: 'id1',
          Title: 'title',
          Year: 'year',
          Director: 'director',
          Genre: 'genre',
          Actors: 'Actor 1, Actor 2',
          Poster: 'N/A',
        }
      },
    })).toEqual({
      ...emptyState,
      details: {
        id1: {
          id: 'id1',
          title: 'title',
          year: 'year',
          director: 'director',
          genre: 'genre',
          actors: ['Actor 1', 'Actor 2'],
          poster: undefined
        },
      }
    })
  })

  it('returns the previous state if the response is malformed', () => {
    expect(movieReducer({ details: { id: { id: 'id' } } }, {
      type: DETAILS_SUCCESS,
      payload: {
        response: {}
      },
    })).toEqual({
      ...emptyState,
      details: {
        id: { id: 'id' }
      }
    })
  })
})
