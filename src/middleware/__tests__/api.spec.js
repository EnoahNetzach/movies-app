import configureStore from 'redux-mock-store'
import {
  METHOD_GET,
  API_REQUEST_ABORT,
  startRequest,
  finishRequest,
  abortRequest,
} from '../../actions/api'
import { apiRequestsSelector } from '../../reducers/api'
import api, { CALL_API } from '../api'

jest.mock('../../actions/api')
jest.mock('../../reducers/api', () => {
  const apiRequestsSelectorMock = () => ({
    some: () => apiRequestsSelectorMock.callback()
  })
  apiRequestsSelectorMock.callback = () => false

  return {
    apiRequestsSelector: apiRequestsSelectorMock
  }
})

const mockStore = configureStore()

describe('api middleware', () => {
  it('is a higher order function', () => {
    expect(typeof api).toEqual('function')
    expect(typeof api({})).toEqual('function')
    expect(typeof api({})(() => {})).toEqual('function')
  })

  it('passes on unrecognized actions', async done => {
    const func = { next: a => a }

    spyOn(func, 'next').and.callThrough()

    const mockAction = { type: 'MOCK_ACTION' }
    const action = await api({})(func.next)(mockAction)

    expect(func.next.calls.count()).toEqual(1)
    expect(action).toEqual(mockAction)
    done()
  })

  it('throws if no data is provided', async done => {
    let error
    try {
      await api({})(() => {})({
        [CALL_API]: {
          type: 'MOCK_ACTION'
        }
      })
    } catch (e) {
      error = e
    }

    expect(error).toEqual(new Error('Expected a payload.'))
    done()
  })

  it('throws if types is not an array of three strings', async done => {
    let error
    try {
      await api({})(() => {})({
        [CALL_API]: {
          type: 'MOCK_ACTION',
          payload: {
            types: null
          }
        }
      })
    } catch (e) {
      error = e
    }

    expect(error).toEqual(new Error('Expected an array of three action types.'))
    done()
  })

  it('throws if endpoint is not a strings', async done => {
    let error
    try {
      await api({})(() => {})({
        [CALL_API]: {
          type: 'MOCK_ACTION',
          payload: {
            types: ['A', 'B', 'C'],
            endpoint: 42
          },
          meta: {}
        }
      })
    } catch (e) {
      error = e
    }

    expect(error).toEqual(new Error('Specify a string endpoint URL.'))
    done()
  })

  it('retrieves the endpoint if a function is passed', async done => {
    const endpoint = 'test'
    const store = mockStore()

    spyOn(store, 'getState')

    const mockAction = {
      [CALL_API]: {
        type: 'MOCK_ACTION',
        payload: {
          types: ['A', 'B', 'C'],
          endpoint: () => endpoint
        },
        meta: {}
      }
    }
    spyOn(mockAction[CALL_API].payload, 'endpoint').and.callThrough()

    await api(store)(() => {})(mockAction)

    expect(mockAction[CALL_API].payload.endpoint.calls.count()).toEqual(1)
    done()
  })

  it('calls the first action', async done => {
    const func = { next: a => a }

    spyOn(func, 'next')

    await api(mockStore())(func.next)({
      [CALL_API]: {
        type: 'MOCK_ACTION',
        payload: {
          types: ['A', 'B', 'C'],
          endpoint: 'endpoint'
        }
      }
    })

    expect(func.next).toHaveBeenCalledWith({
      type: 'A'
    })
    done()
  })

  it('handles an OK request', async done => {
    const func = { next: a => a }

    spyOn(func, 'next')
    spyOn(startRequest, 'callback').and.callThrough()
    spyOn(finishRequest, 'callback').and.callThrough()

    await api(mockStore())(func.next)({
      [CALL_API]: {
        type: 'MOCK_ACTION',
        payload: {
          types: ['A', 'B', 'C'],
          endpoint: 'endpoint'
        }
      }
    })

    expect(startRequest.callback).toHaveBeenCalledWith(
      jasmine.any(String),
      'endpoint',
      METHOD_GET,
      undefined
    )
    expect(finishRequest.callback).toHaveBeenCalledWith(
      jasmine.any(String),
      'endpoint',
      METHOD_GET
    )
    expect(func.next).toHaveBeenCalledWith({
      type: 'B',
      payload: {
        response: ''
      }
    })
    done()
  })

  it('handles an abort action', async done => {
    apiRequestsSelector.callback = () => true

    const func = { next: a => a }

    spyOn(func, 'next')
    spyOn(abortRequest, 'callback').and.callThrough()

    const store = mockStore({
      apiRequests: {
        request: {
          endpoint: 'endpoint',
          type: API_REQUEST_ABORT
        }
      }
    })

    await api(store)(func.next)({
      [CALL_API]: {
        type: 'MOCK_ACTION',
        payload: {
          types: ['A', 'B', 'C'],
          endpoint: 'endpoint'
        }
      }
    })

    apiRequestsSelector.callback = () => false

    expect(abortRequest.callback).toHaveBeenCalledWith(
      jasmine.any(String),
      'endpoint',
      METHOD_GET
    )
    expect(func.next).toHaveBeenCalledWith({
      type: 'C',
      payload: {
        error: jasmine.any(Error)
      },
      error: true
    })
    done()
  })

  it('handles a faliure request action', async done => {
    const func = { next: a => a }

    spyOn(func, 'next')
    spyOn(finishRequest, 'callback').and.callThrough()

    window.fetch.ok = false

    await api(mockStore())(func.next)({
      [CALL_API]: {
        type: 'MOCK_ACTION',
        payload: {
          types: ['A', 'B', 'C'],
          endpoint: 'endpoint'
        }
      }
    })

    window.fetch.ok = true

    expect(finishRequest.callback).not.toHaveBeenCalled()
    expect(func.next).toHaveBeenCalledWith({
      type: 'C',
      payload: {
        error: jasmine.any(Error)
      },
      error: true
    })
    done()
  })
})
