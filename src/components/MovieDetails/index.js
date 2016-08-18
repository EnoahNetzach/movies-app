import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { detailSelector } from '../../reducers/movie'
import Impl from './Impl'

const MovieDetails = props => <Impl {...props} />

MovieDetails.propTypes = {
  id: PropTypes.string.isRequired,
  movie: PropTypes.object,
}

const mapStateToProps = (state, ownProps) => ({
  movie: detailSelector(state, { id: ownProps.id })
})

export default connect(
  mapStateToProps
)(MovieDetails)
