import { createSelector } from 'reselect'
import filter from 'lodash/filter'
import {
  API_REQUEST_START,
  API_REQUEST_ABORT,
  API_REQUEST_FINISH,
  METHOD_GET
} from '../actions/api'

export default (state = {}, { type, payload }) => {
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

export const apiRequestsSelector = createSelector(
  state => state.apiRequests,
  (state, { id, endpoint, method } = {}) => ({ id, endpoint, method }),
  (requests, { id, endpoint, method }) => filter(requests, request =>
    typeof request !== 'undefined'
    && (
      (!id && !endpoint && !method)
      || request.id === id
      || (request.endpoint === endpoint && request.method === method)
    )
  )
)
