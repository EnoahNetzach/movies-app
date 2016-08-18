import {
  API_REQUEST_START,
  API_REQUEST_ABORT,
  API_REQUEST_FINISH,
  METHOD_GET
} from '../actions/api'

/* eslint-disable import/prefer-default-export */
export const apiRequests = (state = {}, { type, payload }) => {
  if (!payload) {
    return state
  }

  const { requestId, endpoint, method = METHOD_GET, body = {} } = payload

  if (!requestId || !endpoint) {
    return state
  }

  switch (type) {
    case API_REQUEST_START:
    case API_REQUEST_ABORT:
      return {
        ...state,
        [requestId]: {
          method,
          body,
          requestId,
          endpoint,
          type
        }
      }
    case API_REQUEST_FINISH:
      return {
        ...state,
        [requestId]: undefined
      }
    default:
      return state
  }
}
