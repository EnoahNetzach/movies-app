import React, { PropTypes } from 'react'
import map from 'lodash/map'
import { List as MaterialList } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Item from './Item'

const List = ({ movies }) => (
  <MaterialList style={{ maxWidth: '360px' }}>
    {map(movies, movie => (
      <div key={movie.id}>
        <Item movie={movie} />
        <Divider />
      </div>
    ))}
  </MaterialList>
)

List.propTypes = {
  movies: PropTypes.shape({
    [PropTypes.string.isRequired]: PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  }),
}

export default List
