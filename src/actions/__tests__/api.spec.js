import {
  API_REQUEST_START,
  API_REQUEST_ABORT,
  API_REQUEST_FINISH,
  METHOD_GET,
  METHOD_POST,
  startRequest,
  abortRequest,
  finishRequest
} from '../api'

describe('start request', () => {
  it('is FSA compliant', () => {
    expect(startRequest('reqid', 'endpoint')).toEqual({
      type: API_REQUEST_START,
      payload: {
        method: METHOD_GET,
        requestId: 'reqid',
        endpoint: 'endpoint'
      }
    })
  })

  it('is FSA compliant (GET method)', () => {
    expect(startRequest('reqid', 'endpoint', METHOD_GET)).toEqual({
      type: API_REQUEST_START,
      payload: {
        method: METHOD_GET,
        requestId: 'reqid',
        endpoint: 'endpoint'
      }
    })
  })

  it('is FSA compliant (POST method)', () => {
    expect(startRequest('reqid', 'endpoint', METHOD_POST, { test: 'test' })).toEqual({
      type: API_REQUEST_START,
      payload: {
        method: METHOD_POST,
        body: { test: 'test' },
        requestId: 'reqid',
        endpoint: 'endpoint'
      }
    })
  })
})

describe('abort request', () => {
  it('is FSA compliant', () => {
    expect(abortRequest('reqid', 'endpoint')).toEqual({
      type: API_REQUEST_ABORT,
      payload: {
        method: METHOD_GET,
        requestId: 'reqid',
        endpoint: 'endpoint'
      }
    })
  })
})

describe('finish request', () => {
  it('is FSA compliant', () => {
    expect(finishRequest('reqid', 'endpoint')).toEqual({
      type: API_REQUEST_FINISH,
      payload: {
        method: METHOD_GET,
        requestId: 'reqid',
        endpoint: 'endpoint'
      }
    })
  })
})
