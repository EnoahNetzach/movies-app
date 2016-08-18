import React, { PropTypes } from 'react'
import map from 'lodash/map'
import Item from './Item'

const List = ({ movies }) => (
  <div>
    {map(movies, movie => (
      <div key={movie.id}>
        <Item movie={movie} />
      </div>
    ))}
  </div>
)

List.propTypes = {
  movies: PropTypes.shape({
    [PropTypes.string.isRequired]: PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  }),
}

export default List
