import React, { PropTypes } from 'react'
import Input from '../Input'
import List from './List'

const Impl = ({ movies }) => (
  <div>
    <Input />

    <List movies={movies} />
  </div>
)

Impl.propTypes = {
  movies: PropTypes.object,
}

export default Impl
