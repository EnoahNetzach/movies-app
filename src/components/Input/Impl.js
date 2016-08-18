import React, { PropTypes } from 'react'

const passEventValue = callback => event => callback(event.target.value)

const Impl = ({ onTitleChange }) => (
  <div>
    <label htmlFor="title">Title</label>
    <div>
      <input
        type="text"
        placeholder="First Name"
        name="title"
        onChange={passEventValue(onTitleChange)}
      />
    </div>
  </div>
)

Impl.propTypes = {
  onTitleChange: PropTypes.func.isRequired,
}

export default Impl
