import React, { PropTypes } from 'react'
import map from 'lodash/map'
import size from 'lodash/size'
import { List as MaterialList } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Item from './Item'

const List = ({ isSearching, movies }) => (
  <MaterialList style={{ maxWidth: '360px' }}>
    {isSearching && size(movies) === 0 ? 'No results found.' : null}
    {map(movies, movie => (
      <div key={movie.id}>
        <Item movie={movie} />
        <Divider />
      </div>
    ))}
  </MaterialList>
)

List.propTypes = {
  isSearching: PropTypes.bool.isRequired,
  movies: PropTypes.shape({
    [PropTypes.string.isRequired]: PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  }),
}

export default List
