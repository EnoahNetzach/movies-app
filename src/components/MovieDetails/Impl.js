import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { searchRoute } from '../Routes'
import Details from './Details'

const Impl = ({ movie }) => (
  <div>
    <Link to={searchRoute()}>
      Back
    </Link>

    {movie ? <Details movie={movie} /> : null}
  </div>
)

Impl.propTypes = {
  movie: PropTypes.object,
}

export default Impl
