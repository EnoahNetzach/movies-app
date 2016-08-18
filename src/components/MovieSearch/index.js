import React from 'react'
import { connect } from 'react-redux'
import { moviesSelector } from '../../reducers/movie'
import Impl from './Impl'

const MovieSelection = props => <Impl {...props} />

MovieSelection.propTypes = {
}

const mapStateToProps = state => ({
  movies: moviesSelector(state)
})

export default connect(
  mapStateToProps
)(MovieSelection)
