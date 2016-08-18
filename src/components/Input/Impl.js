import React, { PropTypes } from 'react'

const passEventValue = callback => event => callback(event.target.value)

const Impl = ({ titleSearch, onTitleChange }) => (
  <div>
    <label htmlFor="movie-search-title">Title</label>
    <div>
      <input
        id="movie-search-title"
        type="text"
        placeholder="Movie Title"
        value={titleSearch}
        onChange={passEventValue(onTitleChange)}
      />
    </div>
  </div>
)

Impl.propTypes = {
  titleSearch: PropTypes.string,
  onTitleChange: PropTypes.func.isRequired,
}

export default Impl
