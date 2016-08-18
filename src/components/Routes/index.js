import React, { PropTypes } from 'react'
import { Router, Route } from 'react-router'
import connectRoute from './connectRoute'
import { viewDetails } from '../../actions/movie'
import MovieSearch from '../MovieSearch'
import MovieDetails from '../MovieDetails'

export const searchRoute = () => '/'
export const movieRoute = id => `/${id}`

const onSearchEnter = () => { document.title = 'Search a Movie' }
const onDetailsEnter = dispatch => nextState => dispatch(viewDetails(nextState.params.id))

const mapParametersToProps = ({ params }) => ({
  id: params.id,
})

const Routes = ({ history, dispatch }) => (
  <Router history={history}>
    <Route
      path={searchRoute()}
      component={MovieSearch}
      onEnter={onSearchEnter}
    />

    <Route
      path={movieRoute(':id')}
      component={connectRoute(mapParametersToProps)(MovieDetails)}
      onEnter={onDetailsEnter(dispatch)}
    />
  </Router>
)

Routes.propTypes = {
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default Routes
