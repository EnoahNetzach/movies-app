export const API_REQUEST_START = 'API_REQUEST_START'
export const API_REQUEST_ABORT = 'API_REQUEST_ABORT'
export const API_REQUEST_FINISH = 'API_REQUEST_FINISH'

export const METHOD_GET = 'GET'
export const METHOD_POST = 'POST'
export const METHOD_PATCH = 'PATCH'

export function startRequest(requestId, endpoint, method = METHOD_GET, body) {
  return {
    type: API_REQUEST_START,
    payload: {
      requestId,
      endpoint,
      method,
      body
    }
  }
}

export function abortRequest(requestId, endpoint, method = METHOD_GET) {
  return {
    type: API_REQUEST_ABORT,
    payload: {
      requestId,
      endpoint,
      method
    }
  }
}

export function finishRequest(requestId, endpoint, method = METHOD_GET) {
  return {
    type: API_REQUEST_FINISH,
    payload: {
      requestId,
      endpoint,
      method
    }
  }
}
