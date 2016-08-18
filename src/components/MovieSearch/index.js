import React from 'react'
import { connect } from 'react-redux'
import { searchTitleSelector, searchMoviesSelector } from '../../reducers/movie'
import Impl from './Impl'

const MovieSearch = props => <Impl {...props} />

MovieSearch.propTypes = {
}

const mapStateToProps = state => ({
  isSearching: searchTitleSelector(state).length > 0,
  movies: searchMoviesSelector(state),
})

export default connect(
  mapStateToProps
)(MovieSearch)
