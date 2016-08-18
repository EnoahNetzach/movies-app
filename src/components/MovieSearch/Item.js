import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { ListItem } from 'material-ui/List'
import { movieRoute } from '../Routes'

const Item = ({ movie }) => (
  <Link to={movieRoute(movie.id)}>
    <ListItem
      primaryText={movie.title}
      secondaryText={movie.year}
    />
  </Link>
)

Item.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
  }),
}

export default Item
