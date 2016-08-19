import {
  API_REQUEST_ABORT,
  METHOD_GET,
  startRequest,
  abortRequest,
  finishRequest
} from '../actions/api'

let requestId = 0

const callApi = async (
  endpoint, method, body,
  wasAborted, abortCurrentRequest, finishCurrentRequest
) => {
  const response = await fetch(endpoint, {
    method,
    body: typeof body === 'object' ? JSON.stringify(body) : body,
    credentials: 'same-origin',
  })
  const json = await response.json()

  if (wasAborted()) {
    abortCurrentRequest()
    throw new Error('The request was aborted')
  }

  if (!response.ok) {
    if (json) {
      throw json
    } else {
      throw new Error()
    }
  }

  finishCurrentRequest()

  return json
}

export const CALL_API = Symbol('Call API')

export default store => next => async action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  if (typeof callAPI.payload === 'undefined') {
    throw new Error('Expected a payload.')
  }

  const types = callAPI.payload.types
  let endpoint = callAPI.payload.endpoint
  const method = callAPI.payload.method || METHOD_GET
  const body = callAPI.payload.body || undefined
  const extraPayload = callAPI.meta && callAPI.meta.extraPayload
    ? callAPI.meta.extraPayload
    : undefined
  const extraMeta = callAPI.meta && callAPI.meta.extraMeta
    ? callAPI.meta.extraMeta
    : undefined

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }

  function actionWith(data) {
    const finalAction = { ...action, ...data }
    delete finalAction[CALL_API]
    return finalAction
  }

  const [requestType, successType, failureType] = types
  next(actionWith({
    type: requestType,
    payload: extraPayload,
    meta: extraMeta
  }))

  const currentRequestId = `request_${requestId++}`
  const wasAborted = () => store.getState().requests
    && store.getState().requests[currentRequestId]
    && store.getState().requests[currentRequestId].endpoint === endpoint
    && store.getState().requests[currentRequestId].type === API_REQUEST_ABORT

  store.dispatch(startRequest(currentRequestId, endpoint, method))
  const abortCurrentRequest = () => store.dispatch(
    abortRequest(currentRequestId, endpoint, method)
  )
  const finishCurrentRequest = () => store.dispatch(
    finishRequest(currentRequestId, endpoint, method)
  )

  try {
    const response = await callApi(endpoint, method, body,
      wasAborted, abortCurrentRequest, finishCurrentRequest
    )

    return next(actionWith({
      type: successType,
      payload: {
        ...extraPayload,
        response
      },
      meta: extraMeta
    }))
  } catch (error) {
    abortCurrentRequest()

    return next(actionWith({
      type: failureType,
      payload: {
        ...extraPayload,
        error
      },
      meta: extraMeta,
      error: true
    }))
  }
}
