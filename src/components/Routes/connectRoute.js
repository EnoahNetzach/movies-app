import React from 'react'

/* eslint-disable react/prop-types */
export default paramsToProps => Wrapped =>
  ({ history, location, params, route, routeParams, ...props }) => (
    <Wrapped
      {...props}
      {...paramsToProps({ history, location, params, route, routeParams })}
    />
  )
