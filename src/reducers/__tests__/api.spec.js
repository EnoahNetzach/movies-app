import {
  API_REQUEST_START,
  API_REQUEST_ABORT,
  API_REQUEST_FINISH,
  METHOD_GET
} from '../../actions/api'
import apiRequests from '../api'

describe('api reducer', () => {
  it('is empty by default', () => {
    expect(apiRequests(undefined, {})).toEqual({})
  })

  it('skips other actions', () => {
    expect(apiRequests(undefined, {
      type: 'OTHER_TYPE',
      payload: {}
    })).toEqual({})
  })

  it('rejects malformed actions', () => {
    expect(apiRequests(undefined, {
      type: API_REQUEST_START,
      payload: {}
    })).toEqual({})
  })

  it('adds a request', () => {
    expect(apiRequests(undefined, {
      type: API_REQUEST_START,
      payload: {
        requestId: 'reqid',
        endpoint: 'endpoint'
      }
    })).toEqual({
      reqid: {
        requestId: 'reqid',
        endpoint: 'endpoint',
        method: METHOD_GET,
        body: {},
        type: API_REQUEST_START
      }
    })
  })

  it('aborts a request', () => {
    expect(apiRequests({
      reqid: {
        requestId: 'reqid',
        endpoint: 'endpoint',
        type: API_REQUEST_START
      }
    }, {
      type: API_REQUEST_ABORT,
      payload: {
        requestId: 'reqid',
        endpoint: 'endpoint'
      }
    })).toEqual({
      reqid: {
        requestId: 'reqid',
        endpoint: 'endpoint',
        method: METHOD_GET,
        body: {},
        type: API_REQUEST_ABORT
      }
    })
  })

  it('finishes a request', () => {
    expect(apiRequests({
      reqid: {
        endpoint: 'endpoint',
        type: API_REQUEST_START
      }
    }, {
      type: API_REQUEST_FINISH,
      payload: {
        requestId: 'reqid',
        endpoint: 'endpoint'
      }
    })).toEqual({})
  })
})
