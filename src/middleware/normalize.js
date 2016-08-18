import { normalize } from 'normalizr'
import values from 'lodash/values'
import Schema from '../schema'

export const NORMALIZE_ENTITIES = Symbol('Normalize Entities')

export default store => next => action => {
  const normalizeEntities = action[NORMALIZE_ENTITIES]
  if (typeof normalizeEntities === 'undefined') {
    return next(action)
  }

  const { type, payload, meta } = normalizeEntities

  if (typeof type !== 'string' && typeof type !== 'symbol') {
    throw new Error('Next type sould be a string or a Symbol.')
  }

  if (typeof payload === 'undefined') {
    throw new Error('No data to normalize.')
  }

  if (typeof meta === 'undefined') {
    throw new Error('No meta data attached to the action.')
  }

  const preNormalize = meta.preNormalize
  const extraPayload = meta.extraPayload || {}
  const extraMeta = meta.extraMeta || {}

  const schema = typeof meta.schema === 'function'
    ? meta.schema(store.getState())
    : meta.schema

  if (values(Schema).indexOf(schema) === -1) {
    throw new Error('Specify a valid SCHEMA.')
  }

  const data = typeof preNormalize === 'function'
    ? preNormalize(payload)
    : payload

  return next({
    type,
    payload: {
      ...extraPayload,
      ...normalize(data, schema)
    },
    meta: extraMeta
  })
}
