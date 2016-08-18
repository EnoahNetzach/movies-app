import React, { PropTypes } from 'react'
import { Router, Route } from 'react-router'
import MovieSearch from '../MovieSearch'

export const searchRoute = () => '/'
export const movieRoute = id => `/${id}`

const Routes = ({ history }) => (
  <Router history={history}>
    <Route
      path={searchRoute()}
      component={MovieSearch}
    />
  </Router>
)

Routes.propTypes = {
  history: PropTypes.object.isRequired,
}

export default Routes
