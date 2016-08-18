import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { movieRoute } from '../Routes'

const Item = ({ movie }) => (
  <Link to={movieRoute(movie.id)}>
    {movie.title}
  </Link>
)

Item.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
}

export default Item
