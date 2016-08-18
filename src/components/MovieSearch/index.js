import React from 'react'
import { connect } from 'react-redux'
import { searchMoviesSelector } from '../../reducers/movie'
import Impl from './Impl'

const MovieSearch = props => <Impl {...props} />

MovieSearch.propTypes = {
}

const mapStateToProps = state => ({
  movies: searchMoviesSelector(state)
})

export default connect(
  mapStateToProps
)(MovieSearch)
