import React, { PropTypes } from 'react'
import Input from '../Input'
import List from './List'

const Impl = ({ isSearching, movies }) => (
  <div>
    <Input />

    <List isSearching={isSearching} movies={movies} />
  </div>
)

Impl.propTypes = {
  isSearching: PropTypes.bool.isRequired,
  movies: PropTypes.object,
}

export default Impl
