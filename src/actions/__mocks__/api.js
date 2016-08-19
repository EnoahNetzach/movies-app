export const API_REQUEST_START = 'API_REQUEST_START'
export const API_REQUEST_ABORT = 'API_REQUEST_ABORT'
export const API_REQUEST_FINISH = 'API_REQUEST_FINISH'

export const METHOD_GET = 'GET'
export const METHOD_POST = 'POST'
export const METHOD_PATCH = 'PATCH'

export const startRequest = (requestId, endpoint, method, body) =>
  startRequest.callback(requestId, endpoint, method, body)
startRequest.callback = (...args) => ({
  type: API_REQUEST_START,
  payload: args
})

export const abortRequest = (requestId, endpoint, method) =>
  abortRequest.callback(requestId, endpoint, method)
abortRequest.callback = (...args) => ({
  type: API_REQUEST_ABORT,
  payload: args
})

export const finishRequest = (requestId, endpoint, method) =>
  finishRequest.callback(requestId, endpoint, method)
finishRequest.callback = (...args) => ({
  type: API_REQUEST_FINISH,
  payload: args
})
